import { useState } from "react";
import { backendApi } from "../../../services/backendApi";
import { useAuth } from "../../../auth/useAuth";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import "./EditPortfolioModal.css";

export function EditPortfolioModal({
  portfolio,
  onClose,
  onUpdated,
  onDeleted,
}) {
  const { token } = useAuth();

  const [name, setName] = useState(portfolio.name);
  const [description, setDescription] = useState(portfolio.description || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = async () => {
    const trimmed = name.trim();

    if (!trimmed) {
      setNameError("Pole jest wymagane")
      return
    }

    try {
      setLoading(true);
      setError("");
      setNameError("");

      const res = await backendApi.put(
        `/portfolios/${portfolio.id}`,
        {
          name: trimmed,
          description: description.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );

      onUpdated(res.data);
      onClose();
    } catch (e) {
      e
      setError("Nie udało się zapisać zmian");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setConfirmDelete(true);
  };

  const confirmDeletePortfolio = async () => {
    try {
      setLoading(true);
      await backendApi.delete(`/portfolios/${portfolio.id}`, {
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
      });
      onDeleted();
    } catch (e) {
      console.log(e.message);
      setError("Nie udało się usunąć portfela. Spróbuj ponownie później.");
      setLoading(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="portfolio-modal edit-portfolio-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Edytuj portfel</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <label className="input-label">Nazwa</label>
        <input
          className={`input ${nameError ? "error" : ""}`}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            if (nameError) setNameError("");
          }}
          onBlur={() => {
            if (!name.trim()) {
              setNameError("Pole jest wymagane");
            }
          }}
        />
        {nameError && <p className="input-error">{nameError}</p>}

        <label className="input-label">Opis</label>
        <textarea
          className="input"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <div className="input-error">{error}</div>}

        <div className="modal-actions split">
          <button
            className="danger-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            Usuń portfel
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            Zapisz zmiany
          </button>
        </div>

        {confirmDelete && (
          <ConfirmDeleteModal
            title="Usunąć portfel?"
            message="Ta operacja jest nieodwracalna. Wszystkie dane portfela zostaną trwale usunięte."
            onCancel={() => setConfirmDelete(false)}
            onConfirm={confirmDeletePortfolio}
          />
        )}
      </div>
    </div>
  );
}
