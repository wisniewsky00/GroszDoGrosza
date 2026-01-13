import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TileGrid } from "../../components/tiles/TileGrid";
import walletIcon from '../../assets/images/icons/wallet.png';
import { backendApi } from "../../services/backendApi";
import { useAuth } from "../../auth/useAuth";
import "./PortfoliosPage.css";

export function PortfoliosPage() {
  const { token } = useAuth();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await backendApi.get("/portfolios", {
          headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` },
        });
        if (!mounted) return;
        setPortfolios(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [token]);

  const openCreate = () => {
    setError("");
    setNewName("");
    setNewDesc("");
    setCreating(true);
  };

  const closeCreate = () => {
    setCreating(false);
    setError("");
  };

  const handleCreate = async () => {
    const trimmed = newName.trim();

    if (!trimmed) {
      setNameError("Pole jest wymagane");
      return;
    }

    try {
      setNameError("");
      const res = await backendApi.post(
        "/portfolios",
        { name: trimmed, description: newDesc.trim() },
        { headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` } }
      );

      const created = res.data;
      setCreating(false);
      navigate(`/portfolios/${created.id}`);
    } catch (e) {
      setNameError(
        e.response?.data?.error || "Nie udało się utworzyć portfela"
      );
    }
  };

  const tiles = portfolios.map(p => ({
    title: p.name,
    path: `/portfolios/${p.id}`,
    icon: walletIcon
  }));

  return (

    <div className="portfolios-page">
      <div className="page-header">
        <h1>Portfele inwestycyjne</h1>
        <div className="sticky-action">
          <div>
            {portfolios.length ? <button className="save-btn" onClick={openCreate}>Nowy portfel</button> : ""}
          </div>
        </div>
      </div>

      <div className="page-content">
        {loading ? (
          <div className="muted">Ładowanie...</div>
        ) : portfolios.length ? (
          <TileGrid tiles={tiles} />
        ) : (
          <div className="empty-state">
            <div className="empty-title">Nie masz jeszcze żadnych portfeli</div>
            <div className="empty-subtitle">
              Utwórz swój pierwszy portfel inwestycyjny
            </div>
            <button className="primary-add-btn" onClick={openCreate}>
              Nowy portfel
            </button>
          </div>
        )}
      </div>

      {creating && (
        <div className="modal-overlay" onClick={closeCreate}>
          <div
            className="modal-card portfolio-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Utwórz nowy portfel</h3>
              <button className="modal-close" onClick={closeCreate}>✕</button>
            </div>

            <label className="input-label">Nazwa</label>
            <input
              className={nameError ? "input error" : "input"}
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                if (nameError) setNameError("");
              }}
              onBlur={() => {
                if (!newName.trim()) {
                  setNameError("Pole jest wymagane");
                }
              }}
              placeholder="Np. Długoterminowy"
            />
            {nameError && <p className="input-error">{nameError}</p>}

            <label className="input-label">Opis (opcjonalnie)</label>
            <textarea
              className="input"
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Krótki opis portfela"
            />

            {error && <div className="input-error">{error}</div>}

            <div className="modal-actions">
              <button className="save-btn" onClick={handleCreate}>
                Utwórz portfel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
