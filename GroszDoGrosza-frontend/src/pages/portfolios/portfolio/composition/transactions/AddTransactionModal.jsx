import { useMemo, useState, useCallback } from "react";
import { assetLabelMap } from "../model/assetTypes";
import './assets/gold/GoldFields.css'
import { AssetSpecificFields } from "./assets/AssetSpecficFields";
import { AssetDetails } from "./assets/AssetDetails";
import { useGoldCurrentValue } from "./assets/gold/useGoldCurrentValue";
import { useCryptoCurrentValue } from "./assets/crypto/useCryptoCurrentValue";
import './AddTransactionModal.css';

export function AddTransactionModal({
  mode,
  initialData,
  allowedAssets = [],
  transactions = [],
  hasBuyForAsset,
  onClose,
  onSave,
}) {
  const [touched, setTouched] = useState(false);

  const [tx, setTx] = useState(() => {
    if (mode === "edit" && initialData.type === "SELL") {
      return {
        asset: initialData.asset,
        type: "SELL",
        sourceTransactionId: initialData.sourceTransactionId,
        sellAmount: initialData.metadata?.sellAmount ?? "",
        date: initialData.transactionDate?.slice(0, 10),
      };
    }

    if (mode === "edit") {
      return {
        asset: initialData.asset,
        type: initialData.type ?? "BUY",
        value: initialData.value,
        metadata: initialData.metadata,
        date:
          initialData.transactionDate?.slice(0, 10) ??
          initialData.createdAt?.slice(0, 10) ??
          "",
      };
    }

    return {
      asset: allowedAssets[0] ?? "",
      type: "BUY",
      sourceTransactionId: null,
      sellAmount: "",
      value: "",
      metadata: {},
      date: new Date().toISOString().slice(0, 10),
    };
  });

  const buyTransactions = useMemo(() => {
    return transactions.filter(
      t => t.asset === tx.asset && t.type === "BUY"
    );
  }, [tx.asset, transactions]);

  const sourceBuy = useMemo(() => {
    return buyTransactions.find(b => b.id === tx.sourceTransactionId);
  }, [buyTransactions, tx.sourceTransactionId]);

  const goldLive = useGoldCurrentValue(sourceBuy);
  const cryptoLive = useCryptoCurrentValue(sourceBuy);

  const isPartialSellAllowed = useMemo(() => {
    if (!sourceBuy) return false;

    return ["AKCJE", "KRYPTOWALUTY", "OBLIGACJE_SKARBOWE"]
      .includes(sourceBuy.asset);
  }, [sourceBuy]);

  const calculateSellValue = useCallback(() => {
    if (!sourceBuy) return 0;

    switch (sourceBuy.asset) {
      case "AKCJE": {
        const { currentPrice } = sourceBuy.metadata ?? {};
        return Number(tx.sellAmount) * Number(currentPrice);
      }

      case "KRYPTOWALUTY": {
        if (!cryptoLive) return 0;

        const ratio =
          Number(tx.sellAmount) / Number(sourceBuy.metadata.amount);

        return cryptoLive.currentValue * ratio;
      }

      case "OBLIGACJE_SKARBOWE": {
        const { currentValue, amount } = sourceBuy.metadata ?? {};
        return Number(tx.sellAmount) * (currentValue / amount);
      }

      case "ZLOTO": {
        if (!goldLive) return 0;
        return goldLive.currentValue;
      }

      case "NIERUCHOMOSCI": {
        const { areaM2, currentPricePerM2 } = sourceBuy.metadata ?? {};
        return Number(areaM2) * Number(currentPricePerM2);
      }

      default:
        return 0;
    }
  }, [sourceBuy, tx.sellAmount, goldLive, cryptoLive]);


  const canSell =
    typeof hasBuyForAsset === "function"
      ? hasBuyForAsset(tx.asset)
      : false;

  const isPositiveNumber = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0;
  };

  const isMetadataValid = useMemo(() => {
    const m = tx.metadata || {};

    if (tx.asset === "ZLOTO") {
      return (
        Boolean(m.form) &&
        isPositiveNumber(m.amount) &&
        isPositiveNumber(m.pricePerGram)
      );
    }

    if (tx.asset === "NIERUCHOMOSCI") {
      return (
        Boolean(m.street) &&
        Boolean(m.city) &&
        isPositiveNumber(m.areaM2) &&
        isPositiveNumber(m.purchasePricePerM2) &&
        isPositiveNumber(m.currentPricePerM2)
      );
    }

    if (tx.asset === "KRYPTOWALUTY") {
      return (
        Boolean(m.name) &&
        isPositiveNumber(m.pricePln) &&
        isPositiveNumber(m.amount)
      );
    }

    if (tx.asset === "AKCJE") {
      return (
        Boolean(m.symbol) &&
        Boolean(m.name) &&
        isPositiveNumber(m.purchasePrice) &&
        isPositiveNumber(m.currentPrice) &&
        isPositiveNumber(m.amount)
      );
    }

    if (tx.asset === "OBLIGACJE_SKARBOWE") {
      const m = tx.metadata || {};

      const baseValid =
        m.bondType &&
        m.bondName &&
        m.bondSymbolSuffix?.length === 4 &&
        isPositiveNumber(m.amount) &&
        isPositiveNumber(m.currentValue) &&
        m.capitalization &&
        m.payout;

      if (!baseValid) return false;

      if (m.bondType === "FIXED") {
        return isPositiveNumber(m.interestRate);
      }

      if (m.bondType === "VARIABLE") {
        return (
          isPositiveNumber(m.interestRate) &&
          isPositiveNumber(m.margin) &&
          isPositiveNumber(m.nbpRate)
        );
      }

      if (m.bondType === "INFLATION") {
        return (
          isPositiveNumber(m.firstYearRate) &&
          isPositiveNumber(m.margin)
        );
      }

      return false;
    }


    return true;
  }, [tx.metadata, tx.asset]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRemainingAmount = (buy) => {
    if (!buy) return null;

    if (!["AKCJE", "KRYPTOWALUTY", "OBLIGACJE_SKARBOWE"].includes(buy.asset)) {
      return null;
    }

    const buyAmount = Number(buy.metadata?.amount);
    if (!Number.isFinite(buyAmount) || buyAmount <= 0) return 0;

    const editingSellId = initialData?.id ?? null;

    const sold = transactions
      .filter(t => t.type === "SELL" && t.sourceTransactionId === buy.id)
      .filter(t => t.id !== editingSellId)
      .reduce((acc, s) => {
        const sa = s.metadata?.sellAmount;
        if (sa == null) return buyAmount;
        return acc + Number(sa || 0);
      }, 0);

    return Math.max(0, buyAmount - sold);
  };


  const maxSellAmount = useMemo(() => {
    if (!sourceBuy) return null;

    switch (sourceBuy.asset) {
      case "AKCJE":
      case "KRYPTOWALUTY":
      case "OBLIGACJE_SKARBOWE": {
        const remaining = getRemainingAmount(sourceBuy);
        return remaining;
      }

      default:
        return null;
    }
  }, [sourceBuy, getRemainingAmount]);

  const liveSellValue = useMemo(() => {
    if (tx.type !== "SELL") return null;
    if (!sourceBuy) return null;

    return calculateSellValue();
  }, [tx.type, sourceBuy, calculateSellValue]);


  const hasCalculatedValue = useMemo(() => {
    const n = Number(tx.value);
    return Number.isFinite(n) && n > 0;
  }, [tx.value]);

  const isSellAmountValid = useMemo(() => {
    if (tx.type !== "SELL") return true;
    if (!sourceBuy) return false;

    if (!isPartialSellAllowed) return true;

    const n = Number(tx.sellAmount);
    return Number.isFinite(n) && n > 0 && n <= maxSellAmount;
  }, [tx.type, tx.sellAmount, sourceBuy, isPartialSellAllowed, maxSellAmount]);

  const showSellAmountError =
    tx.type === "SELL" &&
    isPartialSellAllowed &&
    (touched || tx.sellAmount !== "") &&
    !isSellAmountValid;

  const isFormValid = useMemo(() => {
    if (tx.type === "BUY") {
      return isMetadataValid && hasCalculatedValue;
    }

    if (tx.type === "SELL") {
      return (
        Boolean(tx.sourceTransactionId) &&
        isSellAmountValid
      );
    }

    return false;
  }, [
    tx.type,
    isMetadataValid,
    hasCalculatedValue,
    tx.sourceTransactionId,
    isSellAmountValid,
  ]);


  const handleSave = () => {
    setTouched(true);

    if (!isFormValid) {
      return;
    }

    const value =
      tx.type === "SELL"
        ? calculateSellValue()
        : Number(tx.value);


    const payload = {
      asset: tx.asset,
      type: tx.type,
      transactionDate: tx.date
        ? new Date(tx.date).toISOString()
        : null,

      sourceTransactionId:
        tx.type === "SELL" ? tx.sourceTransactionId : null,

      metadata:
        tx.type === "SELL"
          ? {
            sellAmount: isPartialSellAllowed
              ? Number(tx.sellAmount)
              : null,
          }
          : {
            ...tx.metadata,
            coinId:
              tx.metadata.coinId?.trim() ||
              tx.metadata.name?.toLowerCase().trim() ||
              null,
          },

      value: value,
    };

    onSave(payload);
    onClose();
  };

  const handleAssetChange = (nextAsset) => {
    setTx(prev => ({
      ...prev,
      asset: nextAsset,
      value: "",
      metadata: {},
    }));
    setTouched(false);
  };


  const handleValueCalculated = useCallback((v) => {
    setTx((prev) => {
      const newVal = v === "" ? "" : String(v);
      if (prev.value === newVal) return prev;
      return { ...prev, value: newVal };
    });
  }, []);

  const handleMetadataChange = useCallback((metadata) => {
    setTx(prev => {
      if (prev.metadata === metadata) return prev;
      return { ...prev, metadata: { ...metadata } };
    });
  }, []);

  const GOLD_UNIT_LABEL = {
    GRAM: "g",
    OUNCE: "oz",
    PIECE: "szt.",
  };


  const formatBuyOptionLabel = (buy) => {
    const date = new Date(buy.transactionDate)
      .toLocaleDateString("pl-PL");

    const invested = buy.value;

    const formatPLN = (v) =>
      new Intl.NumberFormat("pl-PL", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(v);

    switch (buy.asset) {
      case "AKCJE": {
        const { symbol, name, amount, currentPrice } = buy.metadata ?? {};
        const currentValue =
          Number(amount) && Number(currentPrice)
            ? Number(amount) * Number(currentPrice)
            : null;

        return `${symbol} (${name}) • ${amount} szt. • kupno: ${formatPLN(
          invested
        )} zł • aktualnie: ${currentValue ? formatPLN(currentValue) + " zł" : "—"
          } • ${date}`;
      }

      case "KRYPTOWALUTY": {
        const { name, amount, pricePln } = buy.metadata ?? {};
        const currentValue =
          Number(amount) && Number(pricePln)
            ? Number(amount) * Number(pricePln)
            : null;

        return `${name} • ${amount} • kupno: ${formatPLN(
          invested
        )} zł • aktualnie: ${currentValue ? formatPLN(currentValue) + " zł" : "—"
          } • ${date}`;
      }

      case "OBLIGACJE_SKARBOWE": {
        const { bondName, bondSymbolSuffix, amount, currentValue } =
          buy.metadata ?? {};

        return `${bondName}${bondSymbolSuffix} • ${amount} szt. • kupno: ${formatPLN(
          invested
        )} zł • aktualnie: ${currentValue ? formatPLN(currentValue) + " zł" : "—"
          } • ${date}`;
      }

      case "ZLOTO": {
        const { form, amount, unit, pricePerGram } = buy.metadata ?? {};

        const currentValue =
          Number(amount) && Number(pricePerGram)
            ? Number(amount) * Number(pricePerGram)
            : null;

        const unitLabel = GOLD_UNIT_LABEL[unit] ?? unit;

        return `${form === "COIN" ? "Moneta" : "Sztabka"} • ${amount} ${unitLabel} • kupno: ${formatPLN(
          invested
        )} zł • aktualnie: ${currentValue ? formatPLN(currentValue) + " zł" : "—"
          } • ${date}`;
      }


      case "NIERUCHOMOSCI": {
        const { street, city, areaM2, currentPricePerM2 } =
          buy.metadata ?? {};

        const currentValue =
          Number(areaM2) && Number(currentPricePerM2)
            ? Number(areaM2) * Number(currentPricePerM2)
            : null;

        return `${street}, ${city} • ${areaM2} m² • kupno: ${formatPLN(
          invested
        )} zł • aktualnie: ${currentValue ? formatPLN(currentValue) + " zł" : "—"
          } • ${date}`;
      }

      default:
        return `${formatPLN(invested)} zł • ${date}`;
    }
  };



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="portfolio-modal portfolio-modal--scrollable" onClick={(e) => e.stopPropagation()}>


        <div className="modal-header">
          <h3>Dodaj transakcję</h3>
          <button className="modal-close" onClick={onClose} aria-label="Zamknij modal">
            ✕
          </button>
        </div>

        <div className="modal-content--scrollable">

          <div className="weights-field">
            <label className="input-label">Typ transakcji</label>
            <select
              className="input"
              value={tx.type}
              onChange={(e) =>
                setTx(prev => ({ ...prev, type: e.target.value }))
              }
            >
              <option value="BUY">Kupno</option>
              <option value="SELL" disabled={!canSell}>Sprzedaż</option>
            </select>
          </div>

          <div className="weights-row">
            <div className="weights-field">
              <label className="input-label">Typ aktywa</label>
              <select
                className="input"
                value={tx.asset}
                onChange={(e) => handleAssetChange(e.target.value)}
              >
                {allowedAssets.map((a) => (
                  <option key={a} value={a}>
                    {assetLabelMap[a] ?? a}
                  </option>
                ))}
              </select>
            </div>


            {tx.type === "SELL" && tx.asset && (
              <div className="weights-field">
                <label className="input-label">Wybierz zakup</label>
                <select
                  className="input"
                  value={tx.sourceTransactionId ?? ""}
                  onChange={(e) =>
                    setTx(prev => ({
                      ...prev,
                      sourceTransactionId: Number(e.target.value),
                    }))
                  }
                >
                  <option value="">— wybierz —</option>
                  {buyTransactions
                    .filter(buy => {
                      if (!["AKCJE", "KRYPTOWALUTY", "OBLIGACJE_SKARBOWE"].includes(buy.asset)) {
                        return true;
                      }

                      return getRemainingAmount(buy) > 0;
                    })
                    .map(buy => (
                      <option key={buy.id} value={buy.id}>
                        {formatBuyOptionLabel(buy)}
                      </option>
                    ))}

                </select>
              </div>
            )}

            {tx.type === "SELL" && tx.sourceTransactionId && (
              <AssetDetails
                asset={tx.asset}
                metadata={
                  buyTransactions.find(b => b.id === tx.sourceTransactionId)?.metadata
                }
              />
            )}

            {tx.type === "SELL" && sourceBuy && isPartialSellAllowed && (
              <div className="weights-field">
                <label className="input-label">
                  Ilość do sprzedaży (max {maxSellAmount})
                </label>

                <input
                  className={`input ${showSellAmountError ? "invalid" : ""}`}
                  inputMode="decimal"
                  value={tx.sellAmount}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (!/^\d*\.?\d*$/.test(v)) return;
                    setTx(prev => ({ ...prev, sellAmount: v }));
                  }}
                />

                {Number.isFinite(liveSellValue) && (
                  <div className="weights-summary">
                    Kwota sprzedaży:
                    <strong> {liveSellValue.toFixed(2)} zł</strong>
                  </div>
                )}
              </div>
            )}

            {tx.type === "SELL" && sourceBuy && !isPartialSellAllowed && (
              <div className="weights-summary">
                Sprzedaż całości:
                <strong> {calculateSellValue().toFixed(2)} zł</strong>
              </div>
            )}

            {tx.type === "BUY" && (
              <div className="weights-field">
                <label className="input-label">
                  Kwota zakupu (zł)
                  <span className="weights-muted"> (wyliczana automatycznie)</span>
                </label>
                <input
                  className="input"
                  value={tx.value}
                  inputMode="decimal"
                  readOnly
                />

              </div>
            )}
          </div>

          <div className="weights-row">
            <div className="weights-field">
              <label className="input-label">Data transakcji</label>
              <input
                type="date"
                className="input"
                value={tx.date}
                onChange={(e) =>
                  setTx((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </div>
          </div>

          {tx.type === "BUY" && (
            <AssetSpecificFields
              asset={tx.asset}
              metadata={tx.metadata}
              onChange={handleMetadataChange}
              onValueCalculated={handleValueCalculated}
              showErrors={touched}
            />
          )}


        </div>

        <div className="modal-actions modal-actions--sticky">
          <button className="button-ghost" onClick={onClose}>
            Anuluj
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            {!isFormValid ? "Uzupełnij wymagane pola" : "Zapisz transakcję"}
          </button>
        </div>
      </div>
    </div>
  );
}