import { useEffect, useMemo, useState } from "react";
import { backendApi } from "../../../../../../../services/backendApi";
import "../gold/GoldFields.css";
import AlphaVantageLogo from '../../../../../../../assets/images/AlphaVantageLogo.png';

export function StockFields({
  value = {},
  onChange,
  onValueCalculated,
  showErrors = false,
}) {
  const {
    symbol = "",
    name = "",
    purchasePrice = "",
    currentPrice = "",
    amount = "",
  } = value;

  const [query, setQuery] = useState(symbol);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const isPositive = (v) => Number(v) > 0;

  const searchStocks = async () => {
    if (!query || query.length < 1) return;

    setLoading(true);
    setSuggestions([]);

    try {
      const res = await backendApi.get("/assets/stocks/search", {
        params: { q: query },
      });
      setSuggestions(res.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const selectStock = async (s) => {
    setLoading(true);
    setSuggestions([]);

    try {
      const res = await backendApi.get(`/assets/stocks/${s.symbol}/price`);

      onChange({
        ...value,
        symbol: s.symbol,
        name: s.name,
        purchasePrice: String(res.data.pricePln),
        currentPrice: String(res.data.pricePln),
      });

      setQuery(s.symbol);
    } finally {
      setLoading(false);
    }
  };

  const calculatedValue = useMemo(() => {
    if (!isPositive(purchasePrice) || !isPositive(amount)) return "";
    return (Number(purchasePrice) * Number(amount)).toFixed(2);
  }, [purchasePrice, amount]);

  useEffect(() => {
    onValueCalculated?.(calculatedValue || "");
  }, [calculatedValue, onValueCalculated]);

  return (
    <>
      <div className="weights-row">
        <div className="weights-field autocomplete">
          <label className="input-label">Symbol</label>
          <input
            className={`input ${showErrors && !symbol ? "invalid" : ""}`}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onChange({ ...value, symbol: e.target.value });
            }}
          />

          {suggestions.length > 0 && (
            <div className="autocomplete-list">
              {suggestions.map((s) => (
                <div
                  key={s.symbol}
                  className="autocomplete-item"
                  onClick={() => selectStock(s)}
                >
                  <div className="autocomplete-symbol">{s.symbol}</div>
                  <div className="autocomplete-name">{s.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="weights-field weights-field--button">

          <label className="input-label input-label--powered">
            Data powered by
            <img
              src={AlphaVantageLogo}
              alt="AlphaVantage Logo"
            />
          </label>

          <button
            type="button"
            className="button-ghost"
            onClick={searchStocks}
            disabled={loading}
          >
            {loading ? "Szukam..." : "Szukaj danych dla symbolu"}
          </button>
        </div>
      </div>


      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Nazwa</label>
          <input
            className={`input ${showErrors && !name ? "invalid" : ""}`}
            value={name}
            onChange={(e) =>
              onChange({ ...value, name: e.target.value })
            }
          />
        </div>

        <div className="weights-field">
          <label className="input-label">Cena zakupu</label>
          <input
            className={`input ${showErrors && !isPositive(purchasePrice) ? "invalid" : ""}`}
            value={purchasePrice}
            onChange={(e) =>
              onChange({ ...value, purchasePrice: e.target.value })
            }
          />
        </div>
      </div>

      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Cena aktualna</label>
          <input
            className={`input ${showErrors && !isPositive(currentPrice) ? "invalid" : ""}`}
            value={currentPrice}
            onChange={(e) =>
              onChange({ ...value, currentPrice: e.target.value })
            }
          />
        </div>

        <div className="weights-field">
          <label className="input-label">Ilość</label>
          <input
            className={`input ${showErrors && !isPositive(amount) ? "invalid" : ""}`}
            value={amount}
            onChange={(e) =>
              onChange({ ...value, amount: e.target.value })
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
