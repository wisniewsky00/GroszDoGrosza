import "./ConfirmDeleteModal.css";

export function ConfirmDeleteModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="portfolio-modal confirm-delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <p className="confirm-message">{message}</p>

        <div className="modal-actions split">
          <button className="button-ghost" onClick={onCancel}>
            Anuluj
          </button>

          <button className="danger-btn" onClick={onConfirm}>
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
}
