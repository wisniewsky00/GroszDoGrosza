import "./PortfolioHeader.css";

export function PortfolioHeader({ name, description, onEdit, diffPercent }) {

  const hasDiff = typeof diffPercent === "number";
  const normalizedDiff = Number(diffPercent.toFixed(2)) || 0;

  const diffState = !hasDiff
    ? null
    : normalizedDiff > 0
      ? "value-positive"
      : normalizedDiff < 0
        ? "value-negative"
        : "value-neutral";

  return (
    <div className="portfolio-header">
      <div className="portfolio-header-text">

        <div className="portfolio-title-row">
          <h1>{name}</h1>

          {hasDiff && (
            <span
              className={
                `portfolio-diff ${diffState}`
              }
            >
              {normalizedDiff > 0 ? "+" : ""}
              {normalizedDiff.toFixed(2)}%
            </span>
          )}

        </div>

        {description && (
          <p className="portfolio-description">
            {description}
          </p>
        )}
      </div>

      <button className="edit-btn" onClick={onEdit}>
        Edytuj
      </button>
    </div>
  );
}
