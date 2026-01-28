import { useMemo, useState, useEffect } from "react";
import { backendApi } from "../../../../../services/backendApi";
import { useAuth } from "../../../../../auth/useAuth";
import { assetLabelMap } from "../model/assetTypes";
import { AddTransactionModal } from "./AddTransactionModal";
import { AssetDetails } from "./assets/AssetDetails";
import { ConfirmDeleteModal } from "../../components/ConfirmDeleteModal";
import { useGoldCurrentValue } from "./assets/gold/useGoldCurrentValue";
import { useCryptoCurrentValue } from "./assets/crypto/useCryptoCurrentValue";
import CalendarIcon from "../../../../../assets/images/icons/calendar.png";
import './TransactionTable.css';

const formatPLN2 = (value) =>
  new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const SortIcon = ({ active, order }) => {
  if (!active) return <span className="sort-icon muted">⇅</span>;
  return (
    <span className="sort-icon active">
      {order === "asc" ? "↑" : "↓"}
    </span>
  );
};


export function TransactionsTable({ transactions = [], modelWeights, disabled, onCreate, onUpdate, onDelete, portfolioId }) {
  const { token } = useAuth();
  const [filterAsset, setFilterAsset] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [localRows, setLocalRows] = useState(transactions);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editingTx, setEditingTx] = useState(null);


  const [sortKey, setSortKey] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    setLocalRows(transactions);
  }, [transactions]);

  const getCurrentValueForSort = (tx) => {
    if (!tx) return null;
    const m = tx.metadata || {};

    try {
      switch (tx.asset) {
        case "AKCJE": {
          const a = Number(m.amount);
          const p = Number(m.currentPrice);
          if (!a || !p) return null;
          return a * p;
        }
        case "KRYPTOWALUTY": {
          const a = Number(m.amount);
          const p = Number(m.pricePln);
          if (!a || !p) return null;
          return a * p;
        }
        case "OBLIGACJE_SKARBOWE": {
          const cv = Number(m.currentValue);
          if (!cv) return null;
          return cv;
        }
        case "ZLOTO": {
          const amount = Number(m.amount);
          const pricePerGram = Number(m.pricePerGram);
          if (!amount || !pricePerGram) return null;
          const OZ_TO_GRAMS = 31.1034768;
          const grams = m.unit === "oz" ? amount * OZ_TO_GRAMS : amount;
          return grams * pricePerGram;
        }
        case "NIERUCHOMOSCI": {
          const area = Number(m.areaM2);
          const currentP = Number(m.currentPricePerM2);
          if (!area || !currentP) return null;
          return area * currentP;
        }
        default:
          return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const sorted = useMemo(() => {
    const arr = [...localRows];

    const cmp = (a, b) => {
      let av, bv;

      switch (sortKey) {
        case "date":
          av = new Date(a.transactionDate ?? a.createdAt).getTime();
          bv = new Date(b.transactionDate ?? b.createdAt).getTime();
          break;

        case "type":
          av = a.type ?? "";
          bv = b.type ?? "";
          break;

        case "asset":
          av = a.asset ?? "";
          bv = b.asset ?? "";
          break;

        case "value":
          av = Number(a.value) || 0;
          bv = Number(b.value) || 0;
          break;

        case "current":
          av = getCurrentValueForSort(a);
          bv = getCurrentValueForSort(b);
          if (av == null && bv == null) return 0;
          if (av == null) return 1;
          if (bv == null) return -1;
          break;

        default:
          av = 0; bv = 0;
      }
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();

      if (av < bv) return -1;
      if (av > bv) return 1;
      return 0;
    };

    arr.sort((a, b) => {
      const r = cmp(a, b);
      return sortOrder === "asc" ? r : -r;
    });

    return arr;
  }, [localRows, sortKey, sortOrder]);

  const filtered = useMemo(() => {
    return sorted.filter((t) => {
      if (filterAsset && t.asset !== filterAsset) return false;

      const txDate = new Date(
        t.transactionDate ?? t.createdAt
      ).toISOString().slice(0, 10);

      if (dateFrom && txDate < dateFrom) return false;
      if (dateTo && txDate > dateTo) return false;

      return true;
    });
  }, [sorted, filterAsset, dateFrom, dateTo]);

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

  const onHeaderClick = (key) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder(key === "date" || key === "value" || key === "current" ? "desc" : "asc");
    }
  };

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
                <th className="th-date">
                  <span onClick={() => onHeaderClick("date")}>
                    Data{" "}
                    <SortIcon
                      active={sortKey === "date"}
                      order={sortOrder}
                    />
                  </span>

                  <button
                    className="date-filter-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDatePickerOpen(v => !v);
                    }}
                    aria-label="Filtruj po dacie"
                  >
                    <img
                      src={CalendarIcon}
                      alt=""
                      className={`calendar-icon ${(dateFrom || dateTo) ? "active" : ""}`}
                    />
                  </button>


                  {datePickerOpen && (
                    <div className="date-filter-popover">
                      <label>
                        Od:
                        <input
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                        />
                      </label>

                      <label>
                        Do:
                        <input
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                        />
                      </label>

                      <button
                        className="clear-btn"
                        onClick={() => {
                          setDateFrom("");
                          setDateTo("");
                        }}
                      >
                        Wyczyść
                      </button>
                    </div>
                  )}
                </th>
                <th onClick={() => onHeaderClick("type")}>
                  Typ{" "}
                  <SortIcon
                    active={sortKey === "type"}
                    order={sortOrder}
                  />
                </th>
                <th onClick={() => onHeaderClick("asset")}>
                  Typ aktywa{" "}
                  <SortIcon
                    active={sortKey === "asset"}
                    order={sortOrder}
                  />
                </th>
                <th onClick={() => onHeaderClick("value")}>
                  Kwota transakcji{" "}
                  <SortIcon
                    active={sortKey === "value"}
                    order={sortOrder}
                  />
                </th>
                <th onClick={() => onHeaderClick("current")}>
                  Wartość atkualna{" "}
                  <SortIcon
                    active={sortKey === "current"}
                    order={sortOrder}
                  />
                </th>
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
