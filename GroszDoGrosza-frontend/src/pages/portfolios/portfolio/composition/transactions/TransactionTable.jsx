import { useMemo, useState, useEffect } from "react";
import { backendApi } from "../../../../../services/backendApi";
import { useAuth } from "../../../../../auth/useAuth";
import { assetLabelMap } from "../model/assetTypes";
import { AddTransactionModal } from "./AddTransactionModal";
import { AssetDetails } from "./assets/AssetDetails";
import { ConfirmDeleteModal } from "../../components/ConfirmDeleteModal";
import { useGoldCurrentValue } from "./assets/gold/useGoldCurrentValue";
import { useCryptoCurrentValue } from "./assets/crypto/useCryptoCurrentValue";
import './TransactionTable.css';

const formatPLN2 = (value) =>
  new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export function TransactionsTable({ transactions = [], modelWeights, disabled, onCreate, onUpdate, onDelete, portfolioId }) {
  const { token } = useAuth();
  const [filterAsset, setFilterAsset] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [localRows, setLocalRows] = useState(transactions);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingTx, setEditingTx] = useState(null);

  const filtered = useMemo(() => {
    return localRows.filter((t) => {
      if (filterAsset && t.asset !== filterAsset) return false;
      return true;
    });
  }, [localRows, filterAsset]);

  useEffect(() => {
    setLocalRows(transactions);
  }, [transactions]);

  const isValueValid = (v) => {
    if (v === "" || v === null || v === undefined) return false;
    const n = Number(v);
    return !Number.isNaN(n) && n > 0;
  };

  const createTransaction = async (payload) => {

    try {
      const res = await backendApi.post(`/portfolios/${portfolioId}/transactions`, payload, {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` },
      });
      onCreate(res.data);
    } catch (e) {
      console.error("create tx failed", e);
      alert("Błąd przy dodawaniu transakcji");
    }
  };

  const updateTransaction = async (id, payload) => {
    if (!isValueValid(payload.value)) return alert("Wartość musi być większa niż 0");
    try {
      const res = await backendApi.put(`/portfolios/${portfolioId}/transactions/${id}`, payload, {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` },
      });
      onUpdate(res.data);
      setEditingId(null);
    } catch (e) {
      console.error("update tx failed", e);
      alert("Błąd przy zapisywaniu zmian");
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await backendApi.delete(`/portfolios/${portfolioId}/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token || localStorage.getItem("token")}` },
      });
      onDelete(id);
    } catch (e) {
      console.error("delete tx failed", e);
      alert("Błąd przy usuwaniu");
    }
  };

  const hasBuyForAsset = (asset) => {
    return transactions.some(t => t.asset === asset && t.type === "BUY");
  }

  const allowedAssets = modelWeights?.map(w => w.asset) ?? [];

  if (disabled) {
    return (
      <div className="transactions-disabled">
        <p>
          Najpierw dodaj wagi modelowe, aby móc
          rejestrować transakcje.
        </p>
      </div>
    );
  }

  return (
    <div className="transaction-container">
      <div className="transactions-section">
        <div className="transactions-controls">
          <select value={filterAsset} onChange={(e) => setFilterAsset(e.target.value)}>
            <option value="">Wszystkie typy</option>
            {allowedAssets.map((a) => (
              <option key={a} value={a}>
                {assetLabelMap[a] ?? a}
              </option>
            ))}
          </select>

          <button
            className="button-ghost add-transaction-btn"
            onClick={() => setAddOpen(true)}
          >
            Dodaj
          </button>
        </div>

        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Typ</th>
                <th>Typ aktywa</th>
                <th>Kwota transakcji</th>
                <th>Wartość aktualna</th>
                <th>Szczegóły</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <TransactionRow
                  key={t.id}
                  assetLabelMap={assetLabelMap}
                  allowedAssets={allowedAssets}
                  tx={t}
                  editing={editingId === t.id}
                  onEdit={() => setEditingId(t.id)}
                  onCancel={() => setEditingId(null)}
                  onSave={(payload) => updateTransaction(t.id, payload)}
                  setDeleteId={setDeleteId}
                  setEditingTx={setEditingTx}
                  transactions={transactions}
                />
              ))}
            </tbody>
          </table>
        </div>

        {addOpen && (
          <AddTransactionModal
            allowedAssets={allowedAssets}
            hasBuyForAsset={hasBuyForAsset}
            transactions={transactions}
            onClose={() => setAddOpen(false)}
            onSave={(tx) => {
              createTransaction(tx);
              setAddOpen(false);
            }}
          />
        )}

        {deleteId && (
          <ConfirmDeleteModal
            title="Usuń transakcję"
            message="Czy na pewno chcesz usunąć tę transakcję? Tej operacji nie można cofnąć."
            onCancel={() => setDeleteId(null)}
            onConfirm={() => {
              deleteTransaction(deleteId);
              setDeleteId(null);
            }}
          />
        )}

        {editingTx && (
          <AddTransactionModal
            mode="edit"
            initialData={editingTx}
            allowedAssets={allowedAssets}
            transactions={transactions}
            hasBuyForAsset={hasBuyForAsset}
            onClose={() => setEditingTx(null)}
            onSave={(payload) => {
              updateTransaction(editingTx.id, payload);
              setEditingTx(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

function TransactionRow({ tx, assetLabelMap, editing, onCancel, onSave, setDeleteId, setEditingTx, transactions }) {

  const [local, setLocal] = useState({ ...tx });

  return (
    <tr>
      <td>
        {new Date(tx.transactionDate).toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </td>
      <td>
        {tx.type === "BUY" ? "Kupno" : "Sprzedaż"}
      </td>
      <td>
        {assetLabelMap[tx.asset] ?? tx.asset}
      </td>
      <td>
        {editing ? (
          <input value={local.value} onChange={(e) => {
            const v = e.target.value;
            if (!/^\d*\.?\d*$/.test(v)) return;
            setLocal({ ...local, value: v });
          }} />
        ) : (
          <>
            {formatPLN2(tx.value)} zł
          </>
        )}
      </td>
      <td className="tx-current-value">
        {tx.type === "SELL" ? (
          <span className="muted">—</span>
        ) : (
          <CurrentValueCell tx={tx} />
        )}
      </td>
      <td>
        {tx.type === "SELL" ? (
          <SellDetails tx={tx} allTransactions={transactions} />
        ) : (
          <AssetDetails asset={tx.asset} metadata={tx.metadata} />
        )}
      </td>


      <td className="tx-actions">
        {editing ? (
          <>
            <button className="tx-btn tx-btn-save" onClick={() => onSave({ ...local, value: Number(local.value) })}>Zapisz</button>
            <button className="tx-btn tx-btn-cancel" onClick={onCancel}>Anuluj</button>
          </>
        ) : (
          <>
            <button className="tx-btn tx-btn-edit" onClick={() => setEditingTx(tx)}>Edytuj</button>
            <button className="tx-btn tx-btn-delete" onClick={() => setDeleteId(tx.id)}>Usuń</button>
          </>
        )}
      </td>
    </tr>
  );
}

function CurrentValueCell({ tx }) {

  switch (tx.asset) {
    case "ZLOTO":
      return <GoldCurrentValue tx={tx} />;

    case "NIERUCHOMOSCI":
      return <RealEstateCurrentValue tx={tx} />;

    case "KRYPTOWALUTY":
      return <CryptoCurrentValue tx={tx} />;

    case "AKCJE":
      return <StockCurrentValue tx={tx} />;

    case "OBLIGACJE_SKARBOWE":
      return <BondCurrentValue tx={tx} />

    default:
      return <span className="muted">—</span>;
  }
}

function GoldCurrentValue({ tx }) {
  const data = useGoldCurrentValue(tx);

  if (!data) {
    return <span className="muted">brak danych</span>;
  }

  const { currentValue, diffPercent } = data;
  const positive = diffPercent >= 0;

  return (
    <div className="tx-current-value-inner">
      <span className="tx-current-amount">
        {formatPLN2(currentValue)} zł
      </span>

      <span
        className={`tx-current-diff ${positive ? "value-positive" : "value-negative"
          }`}
      >
        {positive ? "+" : ""}
        {diffPercent.toFixed(2)}%
      </span>
    </div>
  );
}

function RealEstateCurrentValue({ tx }) {
  const {
    areaM2,
    purchasePricePerM2,
    currentPricePerM2,
  } = tx.metadata ?? {};

  const area = Number(areaM2);
  const purchase = Number(purchasePricePerM2);
  const currentP = Number(currentPricePerM2);

  if (!Number.isFinite(area) || !Number.isFinite(purchase) || !Number.isFinite(currentP) || area <= 0) {
    return <span className="muted">—</span>;
  }

  const invested = area * purchase;
  const current = area * currentP;
  const diffPercent = invested === 0 ? 0 : ((current - invested) / invested) * 100;
  const positive = diffPercent >= 0;

  return (
    <div className="tx-current-value-inner">
      <span className="tx-current-amount">
        {formatPLN2(current)} zł
      </span>

      <span className={`tx-current-diff ${positive ? "value-positive" : "value-negative"}`}>
        {positive ? "+" : ""}{diffPercent.toFixed(2)}%
      </span>
    </div>
  );
}

function CryptoCurrentValue({ tx }) {
  const data = useCryptoCurrentValue(tx);

  if (!data) {
    return <span className="muted">brak danych</span>;
  }

  const { currentValue, diffPercent } = data;
  const positive = diffPercent >= 0;

  return (
    <div className="tx-current-value-inner">
      <span className="tx-current-amount">
        {formatPLN2(currentValue)} zł
      </span>

      <span
        className={`tx-current-diff ${positive ? "value-positive" : "value-negative"
          }`}
      >
        {positive ? "+" : ""}
        {diffPercent.toFixed(2)}%
      </span>
    </div>
  );
}

function StockCurrentValue({ tx }) {
  const { amount, currentPrice } = tx.metadata ?? {};

  const a = Number(amount);
  const p = Number(currentPrice);
  const invested = Number(tx.value);

  if (!a || !p || !invested) {
    return <span className="muted">brak danych</span>;
  }

  const current = a * p;
  const diffPercent = ((current - invested) / invested) * 100;
  const positive = diffPercent >= 0;

  return (
    <div className="tx-current-value-inner">
      <span className="tx-current-amount">
        {formatPLN2(current)} zł
      </span>
      <span className={`tx-current-diff ${positive ? "value-positive" : "value-negative"}`}>
        {positive ? "+" : ""}
        {diffPercent.toFixed(2)}%
      </span>
    </div>
  );
}

function BondCurrentValue({ tx }) {
  const { amount, currentValue } = tx.metadata ?? {};
  const invested = Number(tx.value);

  const a = Number(amount);
  const cv = Number(currentValue);

  if (!a || !cv || !invested) {
    return <span className="muted">brak danych</span>;
  }

  const diffPercent = ((cv - invested) / invested) * 100;
  const positive = diffPercent >= 0;

  return (
    <div className="tx-current-value-inner">
      <span className="tx-current-amount">
        {formatPLN2(cv)} zł
      </span>
      <span
        className={`tx-current-diff ${positive ? "value-positive" : "value-negative"
          }`}
      >
        {positive ? "+" : ""}
        {diffPercent.toFixed(2)}%
      </span>
    </div>
  );
}

function SellDetails({ tx, allTransactions }) {
  const source = allTransactions.find(
    t => t.id === tx.sourceTransactionId
  );

  if (!source) {
    return <span className="muted">Brak źródła sprzedaży</span>;
  }

  const soldAmount =
    tx.metadata?.sellAmount ?? source.metadata?.amount;

  const metadataForDisplay = {
    ...source.metadata,
    amount: soldAmount,
  };

  return (
    <div className="tx-details">
      <div>
        <strong>Sprzedaż:</strong>{" "}
        {tx.metadata?.sellAmount
          ? `${tx.metadata.sellAmount} szt.`
          : "całość"}
      </div>

      <div>
        <strong>Z aktywa:</strong>{" "}
        {assetLabelMap[source.asset] ?? source.asset}
      </div>

      <AssetDetails
        asset={source.asset}
        metadata={metadataForDisplay}
      />
    </div>
  );
}
