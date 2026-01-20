import { useMemo, useState, useCallback } from "react";
import { assetLabelMap } from "../model/assetTypes";
import './assets/gold/GoldFields.css'
import { AssetSpecificFields } from "./assets/AssetSpecficFields";
import './AddTransactionModal.css';

export function AddTransactionModal({
  mode,
  initialData,
  allowedAssets = [],
  onClose,
  onSave,
}) {
  const [touched, setTouched] = useState(false);

  const [tx, setTx] = useState(() => {
    if (mode === "edit") {
      return {
        asset: initialData.asset,
        value: initialData.value,
        metadata: initialData.metadata,
        date: initialData.transactionDate?.slice(0, 10)
          ?? initialData.createdAt?.slice(0, 10)
          ?? "",
      };
    }

    return {
      asset: allowedAssets[0] ?? "",
      value: "",
      metadata: {},
      date: new Date().toISOString().slice(0, 10),
    };
  });


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


  const hasCalculatedValue = useMemo(() => {
    const n = Number(tx.value);
    return Number.isFinite(n) && n > 0;
  }, [tx.value]);

  const isFormValid = isMetadataValid && hasCalculatedValue;

  const handleSave = () => {
    setTouched(true);

    if (!isFormValid) {
      return;
    }

    const payload = {
      asset: tx.asset,
      value: Number(tx.value),
      transactionDate: tx.date
        ? new Date(tx.date).toISOString()
        : null,
      metadata: {
        ...tx.metadata,
        coinId:
          tx.metadata.coinId?.trim() ||
          tx.metadata.name?.toLowerCase().trim() ||
          null,
      },
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

          <AssetSpecificFields
            asset={tx.asset}
            metadata={tx.metadata}
            onChange={handleMetadataChange}
            onValueCalculated={handleValueCalculated}
            showErrors={touched}
          />
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