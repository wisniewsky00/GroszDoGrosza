import "./PortfolioHeader.css";

export function PortfolioHeader({ name, description, onEdit }) {
  return (
    <div className="portfolio-header">
      <div className="portfolio-header-text">
        <h1>{name}</h1>

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
