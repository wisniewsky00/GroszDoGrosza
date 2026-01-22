import { useEffect, useMemo, useRef } from "react";
import "../gold/GoldFields.css";

const BOND_PRICE = 100;

const BOND_TYPES = {
  FIXED: {
    label: "Stałoprocentowe",
    names: ["OTS", "TOS"],
  },
  VARIABLE: {
    label: "Zmiennoprocentowe",
    names: ["ROR", "DOR"],
  },
  INFLATION: {
    label: "Indeksowane inflacją",
    names: ["COI", "EDO", "ROS", "ROD"],
  },
};

export function BondFields({
  value = {},
  onChange,
  onValueCalculated,
  showErrors = false,
}) {
  const {
    bondType = "",
    bondName = "",
    bondSymbolSuffix = "",
    interestRate = "",
    firstYearRate = "",
    margin = "",
    nbpRate = "",
    capitalization = "",
    payout = "",
    amount = "",
    currentValue = "",
  } = value;

  const prevAmountRef = useRef(null);

  useEffect(() => {
    if (!isPositive(amount)) return;

    if (prevAmountRef.current === null) {
      prevAmountRef.current = amount;
      return;
    }

    if (prevAmountRef.current === amount) return;

    const autoValue = (Number(amount) * BOND_PRICE).toFixed(2);

    onValueCalculated?.(autoValue);

    onChange({
      ...value,
      currentValue: autoValue,
    });

    prevAmountRef.current = amount;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);


  const isPositive = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0;
  };

  const fullBondSymbol = bondName
    ? `${bondName}${bondSymbolSuffix}`
    : "";

  const calculatedValue = useMemo(() => {
    if (!isPositive(amount)) return "";
    return (Number(amount) * BOND_PRICE).toFixed(2);
  }, [amount]);

  useEffect(() => {
    onValueCalculated?.(calculatedValue || "");
  }, [calculatedValue, onValueCalculated]);

  return (
    <>
      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Typ obligacji</label>
          <select
            className={`input ${showErrors && !bondType ? "invalid" : ""}`}
            value={bondType}
            onChange={(e) =>
              onChange({
                ...value,
                bondType: e.target.value,
                bondName: "",
              })
            }
          >
            <option value="">Wybierz</option>
            {Object.entries(BOND_TYPES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>

        <div className="weights-field">
          <label className="input-label">Nazwa obligacji</label>
          <select
            className={`input ${showErrors && !bondName ? "invalid" : ""}`}
            value={bondName}
            disabled={!bondType}
            onChange={(e) =>
              onChange({ ...value, bondName: e.target.value })
            }
          >
            <option value="">Wybierz</option>
            {bondType &&
              BOND_TYPES[bondType].names.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* === SYMBOL === */}
      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Symbol obligacji</label>
          <input
            className={`input ${showErrors && bondName && bondSymbolSuffix.length !== 4 ? "invalid" : ""}`}
            placeholder={bondName ? `MMRR` : "—"}
            value={bondSymbolSuffix}
            disabled={!bondName}
            inputMode="numeric"
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
              onChange({ ...value, bondSymbolSuffix: v });
            }}
          />
          {bondName && (
            <div className="weights-muted">
              Pełny symbol: <strong>{fullBondSymbol || "—"}</strong>
            </div>
          )}

        </div>

        {(bondType === "FIXED" || bondType === "VARIABLE") && (
          <div className="weights-field">
            <label className="input-label">Oprocentowanie (%)</label>
            <input
              className={`input ${showErrors && !isPositive(interestRate) ? "invalid" : ""
                }`}
              inputMode="decimal"
              value={interestRate}
              onChange={(e) =>
                onChange({ ...value, interestRate: e.target.value })
              }
            />
          </div>
        )}
      </div>

      <div className="weights-row">

        {bondType === "INFLATION" && (
          <div className="weights-field">
            <label className="input-label">Oprocentowanie 1. roku (%)</label>
            <input
              className={`input ${showErrors && !isPositive(firstYearRate) ? "invalid" : ""
                }`}
              inputMode="decimal"
              value={firstYearRate}
              onChange={(e) =>
                onChange({ ...value, firstYearRate: e.target.value })
              }
            />
          </div>
        )}

        {(bondType === "VARIABLE" || bondType === "INFLATION") && (
          <div className="weights-field">
            <label className="input-label">Marża (%)</label>
            <input
              className={`input ${showErrors && !isPositive(margin) ? "invalid" : ""
                }`}
              inputMode="decimal"
              value={margin}
              onChange={(e) =>
                onChange({ ...value, margin: e.target.value })
              }
            />
          </div>
        )}

        {bondType === "VARIABLE" && (
          <div className="weights-field">
            <label className="input-label">Stopa referencyjna NBP (%)</label>
            <input
              className={`input ${showErrors && !isPositive(nbpRate) ? "invalid" : ""
                }`}
              inputMode="decimal"
              value={nbpRate}
              onChange={(e) =>
                onChange({ ...value, nbpRate: e.target.value })
              }
            />
          </div>
        )}
      </div>

      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Kapitalizacja odsetek</label>
          <select
            className={`input ${showErrors && !capitalization ? "invalid" : ""
              }`}
            value={capitalization}
            onChange={(e) =>
              onChange({ ...value, capitalization: e.target.value })
            }
          >
            <option value="">Wybierz</option>
            <option value="Brak">Brak</option>
            <option value="Roczna">Roczna</option>
          </select>
        </div>

        <div className="weights-field">
          <label className="input-label">Wypłata odsetek</label>
          <select
            className={`input ${showErrors && !payout ? "invalid" : ""
              }`}
            value={payout}
            onChange={(e) =>
              onChange({ ...value, payout: e.target.value })
            }
          >
            <option value="">Wybierz</option>
            <option value="Co miesiąc">Co miesiąc</option>
            <option value="Co roku">Co roku</option>
            <option value="Przy wykupie">Przy wykupie</option>
          </select>
        </div>
      </div>

      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Ilość obligacji</label>
          <input
            className={`input ${showErrors && !isPositive(amount) ? "invalid" : ""}`}
            inputMode="numeric"
            value={amount}
            onChange={(e) =>
              onChange({ ...value, amount: e.target.value })
            }
          />
        </div>

        <div className="weights-field">
          <label className="input-label">Wartość aktualna (zł)</label>
          <input
            className={`input ${showErrors && !isPositive(currentValue) ? "invalid" : ""}`}
            inputMode="decimal"
            value={currentValue}
            onChange={(e) =>
              onChange({ ...value, currentValue: e.target.value })
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