import "./PortfolioHeader.css";

export function PortfolioHeader({ name, description, onEdit, diffPercent }) {

  const hasDiff = typeof diffPercent === "number";
  const positive = hasDiff && diffPercent >= 0;

  return (
    <div className="portfolio-header">
      <div className="portfolio-header-text">

        <div className="portfolio-title-row">
          <h1>{name}</h1>

          {hasDiff && (
            <span
              className={
                positive
                  ? "portfolio-diff value-positive"
                  : "portfolio-diff value-negative"
              }
            >
              {positive ? "+" : ""}
              {diffPercent.toFixed(2)}%
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
