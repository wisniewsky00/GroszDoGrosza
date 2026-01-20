import { useState, useMemo, useEffect } from "react";
import { backendApi } from "../../../../../../../services/backendApi";
import './GoldFields.css';

const OZ_TO_GRAMS = 31.1034768;

export function GoldFields({ value = {}, onChange, onValueCalculated, showErrors = false }) {
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [error, setError] = useState(null);

  const OZ_OPTIONS = [
    { label: "2 uncje", value: "2" },
    { label: "1 uncja", value: "1" },
    { label: "1/2 uncji", value: "0.5" },
    { label: "1/4 uncji", value: "0.25" },
    { label: "1/10 uncji", value: "0.1" },
  ];

  const unit = value.unit ?? "g";
  const amount = value.amount ?? "";
  const pricePerGram = value.pricePerGram ?? "";
  const form = value.form ?? "";

  const grams = useMemo(() => {
    const parsed = Number(amount);
    if (!amount || Number.isNaN(parsed)) return 0;
    return unit === "oz" ? parsed * OZ_TO_GRAMS : parsed;
  }, [amount, unit]);

  const calculatedValue = useMemo(() => {
    const p = Number(pricePerGram);
    if (!grams || Number.isNaN(p) || p <= 0) return "";
    const v = grams * p;
    return Number.isFinite(v) ? v.toFixed(2) : "";
  }, [grams, pricePerGram]);

  useEffect(() => {
    if (calculatedValue !== "") {
      onValueCalculated?.(calculatedValue);
    } else {
      onValueCalculated?.("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculatedValue]);

  const fetchGoldPrice = async () => {
    try {
      setLoadingPrice(true);
      setError(null);

      const res = await backendApi.get("/assets/gold/price");
      const price = res?.data?.pricePerGram;

      if (price !== undefined && price !== null) {
        onChange({ ...value, pricePerGram: String(price) });
      } else {
        setError("Nieprawidłowa odpowiedź z serwera");
      }
    } catch (err) {
      console.log(err);
      setError("Nie udało się pobrać ceny. Wpisz ręcznie.");
    } finally {
      setLoadingPrice(false);
    }
  };

  const handleAmountChange = (nextAmount) => {
    onChange({ ...value, amount: nextAmount });
  };

  const handlePriceChange = (nextPrice) => {
    onChange({ ...value, pricePerGram: nextPrice });
  };

  const handleUnitChange = (nextUnit) => {
    onChange({ ...value, unit: nextUnit });
  };


  const isFormValid = Boolean(form);
  const isAmountValid = (() => {
    if (amount === "" || amount === null || amount === undefined) return false;
    const n = Number(amount);
    return Number.isFinite(n) && n > 0;
  })();
  const isPriceValid = (() => {
    if (pricePerGram === "" || pricePerGram === null || pricePerGram === undefined) return false;
    const n = Number(pricePerGram);
    return Number.isFinite(n) && n > 0;
  })();

  return (
    <>
      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Rodzaj</label>
          <select
            className={`input ${showErrors && !isFormValid ? "invalid" : ""}`}
            value={form}
            onChange={(e) => onChange({ ...value, form: e.target.value })}
          >
            <option value="">Wybierz</option>
            <option value="COIN">Moneta bulionowa</option>
            <option value="BAR">Sztabka</option>
          </select>
        </div>
      </div>

      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Ilość</label>

          {unit === "oz" ? (
            <select
              className={`input ${showErrors && !isAmountValid ? "invalid" : ""}`}
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
            >
              <option value="">Wybierz</option>
              {OZ_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              className={`input ${showErrors && !isAmountValid ? "invalid" : ""}`}
              inputMode="decimal"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
            />
          )}
        </div>

        <div className="weights-field">
          <label className="input-label">Jednostka</label>
          <select className="input" value={unit} onChange={(e) => handleUnitChange(e.target.value)}>
            <option value="g">gram (g)</option>
            <option value="oz">uncja (oz)</option>
          </select>
        </div>
      </div>

      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Cena za gram (zł)</label>
          <input
            className={`input ${showErrors && !isPriceValid ? "invalid" : ""}`}
            inputMode="decimal"
            value={pricePerGram}
            onChange={(e) => handlePriceChange(e.target.value)}
          />
          {error && <p className="input-error visible">{error}</p>}
        </div>

        <div className="weights-field weights-field--button">
          <button className="button-ghost" type="button" onClick={fetchGoldPrice} disabled={loadingPrice}>
            {loadingPrice ? "Pobieranie..." : "Pobierz aktualną cenę"}
          </button>
        </div>
      </div>

      {calculatedValue && (
        <div className="weights-summary">
          Wyliczona kwota zakupu: <strong>{calculatedValue} zł</strong>
        </div>
      )}
    </>
  );
}