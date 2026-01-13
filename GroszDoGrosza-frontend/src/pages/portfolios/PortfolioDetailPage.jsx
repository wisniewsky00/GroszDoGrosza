import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendApi } from "../../services/backendApi";
import { useAuth } from "../../auth/useAuth";
import { PortfolioHeader } from "./components/PortfolioHeader";
import { EditPortfolioModal } from "./components/EditPortfolioModal";
import "./PortfolioDetailPage.css";

export function PortfolioDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadPortfolio() {
      try {
        const res = await backendApi.get(`/portfolios/${id}`, {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        });
        if (mounted) setPortfolio(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPortfolio();
    return () => (mounted = false);
  }, [id, token]);

  if (loading) {
    return <div className="muted">Ładowanie...</div>;
  }

  if (!portfolio) {
    return <div className="muted">Nie znaleziono portfela</div>;
  }

  return (
    <div className="portfolio-detail-page">
      <PortfolioHeader
        name={portfolio.name}
        description={portfolio.description}
        onEdit={() => { setEditing(true) }}
      />

      {editing && (
        <EditPortfolioModal
          portfolio={portfolio}
          onClose={() => setEditing(false)}
          onUpdated={(updated) => setPortfolio(updated)}
          onDeleted={() => navigate("/portfolios")}
        />
      )}
    </div>
  );
}
