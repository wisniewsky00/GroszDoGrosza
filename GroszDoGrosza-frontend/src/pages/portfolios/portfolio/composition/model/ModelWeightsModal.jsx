import { useEffect, useMemo, useState } from "react";
import { ASSET_TYPES } from "./assetTypes";
import "./ModelWeightsModal.css";

const EMPTY_ROW = {
  asset: "AKCJE",
  value: "",
  touched: false,
};

export function ModelWeightsModal({ initialWeights, onClose, onSave }) {


  const [weights, setWeights] = useState(() => {
    if (!initialWeights || initialWeights.length === 0) {
      return [EMPTY_ROW];
    }

    return initialWeights.map(w => ({
      asset: w.asset,
      value: String(w.value),
      touched: false,
    }));
  });
  const [error, setError] = useState("");

  const isWeightValid = (value) => {
    if (value === "") return false;
    const num = Number(value);
    return !Number.isNaN(num) && num > 0;
  };

  const hasInvalidWeights = useMemo(
    () => weights.some((w) => w.touched && !isWeightValid(w.value)),
    [weights]
  );

  const total = useMemo(
    () =>
      weights.reduce(
        (sum, w) => sum + (isWeightValid(w.value) ? Number(w.value) : 0),
        0
      ),
    [weights]
  );

  const canAddRow = weights.every((w) => isWeightValid(w.value)) && total < 100;

  useEffect(() => {
    if (!hasInvalidWeights && total === 100) {
      setError("");
    }
  }, [hasInvalidWeights, total]);


  const updateRow = (index, field, value) => {
    setWeights((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    );
  };

  const addRow = () => {
    setWeights((prev) => [...prev, { ...EMPTY_ROW }]);
  };

  const removeRow = (index) => {
    setWeights((prev) => prev.filter((_, i) => i !== index));
  };

  const handleBlur = (index) => {
    setWeights((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, touched: true } : row
      )
    );
  };

  const aggregateWeights = (rows) => {
    const map = new Map();

    rows.forEach(({ asset, value }) => {
      const current = map.get(asset) || 0;
      map.set(asset, current + Number(value));
    });

    return Array.from(map.entries()).map(
      ([asset, value]) => ({ asset, value })
    );
  };

  const handleSave = () => {
    const anyInvalid = weights.some(
      (w) => !isWeightValid(w.value)
    );

    if (anyInvalid || total !== 100) {
      setError("Suma wag musi wynosić dokładnie 100%");
      return;
    }

    onSave(
      aggregateWeights(weights)
    );
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="portfolio-modal model-weights-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Wagi modelowe</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="weights-list">
          {weights.map((row, index) => {
            const invalid =
              row.touched && !isWeightValid(row.value);

            return (
              <div className="weights-row" key={index}>
                <div className="weights-field">
                  <label className="input-label">
                    Typ aktywa
                  </label>
                  <select
                    className="input"
                    value={row.asset}
                    onChange={(e) =>
                      updateRow(index, "asset", e.target.value)
                    }
                  >
                    {ASSET_TYPES.map((a) => (
                      <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                  </select>
                </div>

                <div className="weights-field">
                  <label className="input-label">
                    Waga modelowa (%)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    className={`input ${invalid ? "error" : ""}`}
                    value={row.value}
                    placeholder="%"
                    onChange={(e) => {
                      const val = e.target.value;

                      if (!/^\d*\.?\d*$/.test(val)) return;
                      if (
                        val.includes(".") &&
                        val.split(".")[1].length > 2
                      )
                        return;

                      updateRow(index, "value", val);
                    }}
                    onBlur={() => handleBlur(index)}
                  />

                  <p
                    className={`input-error ${invalid ? "visible" : ""
                      }`}
                  >
                    Waga modelowa musi być większa niż 0 i mniejsza równa niż 100
                  </p>
                </div>

                {weights.length > 1 && (
                  <button
                    className="button-ghost remove-row-btn"
                    onClick={() => removeRow(index)}
                    aria-label="Usuń aktywo"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="button-ghost"
          onClick={addRow}
          disabled={!canAddRow}
        >
          Dodaj aktywo
        </button>

        <div className="weights-summary">
          Suma:{" "}
          <strong
            style={{
              color:
                total === 100 ? "#16a34a" : "#dc2626",
            }}
          >
            {total}%
          </strong>
        </div>

        {error && <div className="input-error visible">{error}</div>}

        <div className="modal-actions">
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={hasInvalidWeights || total !== 100}
          >
            Zapisz wagi
          </button>
        </div>
      </div>
    </div>
  );
}
