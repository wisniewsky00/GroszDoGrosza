import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendApi } from "../../../services/backendApi";
import { useAuth } from "../../../auth/useAuth";
import { PortfolioHeader } from './components/PortfolioHeader'
import { EditPortfolioModal } from "./components/EditPortfolioModal";
import { ModelWeightsCard } from "./composition/model/ModelWeightsCard";
import { ActualWeightsCard } from "./composition/actual/ActualWeightsCard";
import { PortfolioValueChart } from "./composition/chart/PortfolioValueChart";
import { TransactionsTable } from "./composition/transactions/TransactionTable";
import { useCurrentValues } from "./useCurrentValues";
import { usePortfolioStats } from "./composition/chart/usePortfolioStats";
import "./PortfolioDetailPage.css";

export function PortfolioDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [modelWeights, setModelWeights] = useState(null);
  const [actualTransactions, setActualTransactions] = useState([]);

  const transactionsRef = useRef(null);
  const currentValues = useCurrentValues(actualTransactions);
  const stats = usePortfolioStats(actualTransactions, currentValues);

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

    async function loadModelWeights() {
      try {
        const res = await backendApi.get(
          `/portfolios/${id}/model-weights`,
          {
            headers: {
              Authorization: `Bearer ${token || localStorage.getItem("token")}`,
            },
          }
        );

        setModelWeights(res.data.length ? res.data : null);
      } catch (e) {
        console.error("Failed to load model weights", e);
      }
    }

    async function loadActualTransactions() {
      try {
        const res = await backendApi.get(`/portfolios/${id}/transactions`, {
          headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` },
        });
        if (mounted) setActualTransactions(res.data || []);
      } catch (e) {
        console.error("Failed to load transactions", e);
      }
    }

    loadModelWeights();
    loadPortfolio();
    loadActualTransactions();

    return () => (mounted = false);
  }, [id, token]);

  if (loading) {
    return <div className="muted">Ładowanie...</div>;
  }

  if (!portfolio) {
    return <div className="muted">Nie znaleziono portfela</div>;
  }

  const saveModelWeights = async (weights) => {
    await backendApi.put(
      `/portfolios/${id}/model-weights`,
      weights,
      {
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
      }
    );

    setModelWeights(weights);
  };

  const openTransactionsSection = () => {
    if (!transactionsRef.current) return;

    transactionsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="portfolio-detail-page">
      <PortfolioHeader
        name={portfolio.name}
        description={portfolio.description}
        onEdit={() => { setEditing(true) }} 
        diffPercent={stats.diffPercent}
      />

      {editing && (
        <EditPortfolioModal
          portfolio={portfolio}
          onClose={() => setEditing(false)}
          onUpdated={(updated) => setPortfolio(updated)}
          onDeleted={() => navigate("/portfolios")}
        />
      )}

      <section className="portfolio-section">
        <h2 className="section-title">Skład portfela</h2>

        <div className="composition-grid">
          <ModelWeightsCard
            weights={modelWeights}
            onSave={saveModelWeights}
          />

          <ActualWeightsCard
            modelWeights={modelWeights}
            transactions={actualTransactions}
            onOpenTransactions={openTransactionsSection}
            currentValues={currentValues}
          />
        </div>
      </section>

      <section className="portfolio-section">
        <h2 className="section-title">
          Wartość portfela w czasie
        </h2>

        <PortfolioValueChart
          transactions={actualTransactions}
          modelWeights={modelWeights}
          currentValues={currentValues}
        />
      </section>

      <section
        ref={transactionsRef}
        className="portfolio-section"
        id="transactions-section"
      >
        <h2 className="section-title">Transakcje</h2>

        <TransactionsTable
          portfolioId={id}
          transactions={actualTransactions}
          modelWeights={modelWeights}
          disabled={!modelWeights}
          onCreate={(t) =>
            setActualTransactions((prev) => [t, ...prev])
          }
          onUpdate={(t) =>
            setActualTransactions((prev) =>
              prev.map((p) => (p.id === t.id ? t : p))
            )
          }
          onDelete={(id) =>
            setActualTransactions((prev) =>
              prev.filter((p) => p.id !== id)
            )
          }
        />
      </section>

    </div>
  );
}
