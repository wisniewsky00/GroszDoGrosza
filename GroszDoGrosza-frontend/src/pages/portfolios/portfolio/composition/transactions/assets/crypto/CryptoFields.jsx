import { useEffect, useMemo, useState } from "react";
import { backendApi } from "../../../../../../../services/backendApi";
import "../gold/GoldFields.css";
import CoinGeckoApiLogo from '../../../../../../../assets/images/CoinGEckoAPILogo.png';

export function CryptoFields({
  value = {},
  onChange,
  onValueCalculated,
  showErrors = false,
}) {
  const {
    coinId = "",
    name = "",
    pricePln = "",
    amount = "",
  } = value;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isPositive = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0;
  };

  const calculatedValue = useMemo(() => {
    if (!isPositive(pricePln) || !isPositive(amount)) return "";
    return (Number(pricePln) * Number(amount)).toFixed(2);
  }, [pricePln, amount]);

  useEffect(() => {
    onValueCalculated?.(calculatedValue || "");
  }, [calculatedValue, onValueCalculated]);

  const fetchCryptoPrice = async () => {
    if (!coinId) {
      setError("Podaj id coina (np. bitcoin)");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await backendApi.get(
        `/assets/crypto/${coinId}/price`
      );

      if (!res.data?.fromApi) {
        setError(res.data?.error ?? `Nie znaleziono coina: ${coinId}`);
        return;
      }

      onChange({
        ...value,
        coinId,
        name: res.data.name,
        pricePln: String(res.data.pricePln),
      });
    } catch (e) {
      console.log(e)
      setError("Nie udało się pobrać danych z CoinGecko");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">ID coina</label>
          <input
            className="input"
            placeholder="np. bitcoin"
            value={coinId}
            onChange={(e) =>
              onChange({
                ...value,
                coinId: e.target.value.toLowerCase().trim(),
              })
            }
          />
        </div>

        <div className="weights-field weights-field--button">

          <label className="input-label input-label--powered">
            Data powered by
            <img
              src={CoinGeckoApiLogo}
              alt="CoinGecko Logo"
            />
          </label>

          <button
            className="button-ghost"
            type="button"
            onClick={fetchCryptoPrice}
            disabled={loading}
          >
            {loading ? "Pobieranie..." : "Pobierz aktualną cenę"}
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
          <label className="input-label">Cena (PLN)</label>
          <input
            className={`input ${showErrors && !isPositive(pricePln) ? "invalid" : ""}`}
            value={pricePln}
            onChange={(e) =>
              onChange({ ...value, pricePln: e.target.value })
            }
          />
        </div>
      </div>

      <div className="weights-row">
        <div className="weights-field">
          <label className="input-label">Ilość</label>
          <input
            className={`input ${showErrors && !isPositive(amount) ? "invalid" : ""}`}
            inputMode="decimal"
            value={amount}
            onChange={(e) =>
              onChange({ ...value, amount: e.target.value })
            }
          />
        </div>
      </div>

      {error && <p className="input-error visible">{error}</p>}

      {calculatedValue && (
        <div className="weights-summary">
          Kwota zakupu: <strong>{calculatedValue} zł</strong>
        </div>
      )}
    </>
  );
}
