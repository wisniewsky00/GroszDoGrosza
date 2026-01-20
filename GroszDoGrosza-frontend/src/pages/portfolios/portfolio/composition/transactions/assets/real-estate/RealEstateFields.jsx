import { useEffect, useMemo } from "react";
import '../gold/GoldFields.css';

export function RealEstateFields({
  value = {},
  onChange,
  onValueCalculated,
  showErrors = false
}) {
  const {
    street = "",
    city = "",
    areaM2 = "",
    purchasePricePerM2 = "",
    currentPricePerM2 = "",
  } = value;

  const isPositive = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0;
  };

  const calculatedValue = useMemo(() => {
    if (!isPositive(areaM2) || !isPositive(purchasePricePerM2)) return "";
    return (Number(areaM2) * Number(purchasePricePerM2)).toFixed(2);
  }, [areaM2, purchasePricePerM2]);

  useEffect(() => {
    onValueCalculated?.(calculatedValue || "");
  }, [calculatedValue, onValueCalculated]);

  return (
    <>
      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Ulica</label>
          <input
            className={`input ${showErrors && !street ? "invalid" : ""}`}
            value={street}
            onChange={(e) =>
              onChange({ ...value, street: e.target.value })
            }
          />
        </div>

        <div className="weights-field">
          <label className="input-label">Miasto</label>
          <input
            className={`input ${showErrors && !city ? "invalid" : ""}`}
            value={city}
            onChange={(e) =>
              onChange({ ...value, city: e.target.value })
            }
          />
        </div>
      </div>

      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Metraż (m²)</label>
          <input
            className={`input ${
              showErrors && !isPositive(areaM2) ? "invalid" : ""
            }`}
            inputMode="decimal"
            value={areaM2}
            onChange={(e) =>
              onChange({ ...value, areaM2: e.target.value })
            }
          />
        </div>

        <div className="weights-field">
          <label className="input-label">Cena zakupu za m² (zł)</label>
          <input
            className={`input ${
              showErrors && !isPositive(purchasePricePerM2)
                ? "invalid"
                : ""
            }`}
            inputMode="decimal"
            value={purchasePricePerM2}
            onChange={(e) =>
              onChange({ ...value, purchasePricePerM2: e.target.value })
            }
          />
        </div>
      </div>

      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Aktualna cena za m² (zł)</label>
          <input
            className={`input ${
              showErrors && !isPositive(currentPricePerM2)
                ? "invalid"
                : ""
            }`}
            inputMode="decimal"
            value={currentPricePerM2}
            onChange={(e) =>
              onChange({ ...value, currentPricePerM2: e.target.value })
            }
          />
        </div>
      </div>

      {calculatedValue && (
        <div className="weights-summary">
          Kwota zakupu: <strong>{calculatedValue} zł</strong>
        </div>
      )}
    </>
  );
}

