import { PortfolioHistoryChart } from "./PortfolioHistoryChart";
import { usePortfolioStats } from "./usePortfolioStats";
import './PortfolioValueChart.css';

export function PortfolioValueChart({ transactions, modelWeights, currentValues }) {
  const hasModelWeights =
    Array.isArray(modelWeights) && modelWeights.length > 0;

  const hasTransactions =
    Array.isArray(transactions) && transactions.length > 0;

  const stats = usePortfolioStats(transactions, currentValues);

  const formatPLN2 = (value) =>
  new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);


  return (
    <div
      className="portfolio-value-card"
      style={{ minHeight: 600 }}
    >
      <h3>Wartość portfela w czasie</h3>

      {!hasModelWeights && (
        <div className="composition-locked">
          <p>
            Aby śledzić wartość portfela w czasie,
            najpierw zdefiniuj wagi modelowe.
          </p>
        </div>
      )}

      {hasModelWeights && !hasTransactions && (
        <div className="composition-empty">
          <p>
            Dodaj pierwsze transakcje, aby zobaczyć
            zmiany wartości portfela w czasie.
          </p>
        </div>
      )}

      {hasModelWeights && hasTransactions && (
        <div
        >
          <PortfolioStatsSummary
            invested={stats.investedTotal}
            current={stats.currentTotal}
            diffPercent={stats.diffPercent}
          />

          <PortfolioHistoryChart history={stats.history} />
        </div>
      )}
    </div>
  );

  function PortfolioStatsSummary({ invested, current, diffPercent }) {
    const positive = diffPercent >= 0;

    return (
      <div className="portfolio-stats">
        <div>
          <span className="label">Zainwestowano</span>
          <strong>{formatPLN2(invested.toFixed(2))} zł</strong>
        </div>

        <div>
          <span className="label">Wartość aktualna</span>
          <strong>{formatPLN2(current.toFixed(2))} zł</strong>
        </div>

        <div className={positive ? "value-positive" : "value-negative"}>
          <span className="label">Zmiana wartości</span>
          {positive ? "+" : ""}
          {diffPercent.toFixed(2)}%
        </div>
      </div>
    );
  }
}
