import { ActualWeightsChart } from "./ActualWeightsChart";

export function ActualWeightsCard({
  modelWeights,
  transactions,
  onOpenTransactions,
  currentValues
}) {
  const hasModelWeights =
    Array.isArray(modelWeights) && modelWeights.length > 0;

  const hasTransactions =
    Array.isArray(transactions) && transactions.length > 0;

  return (
    <div className="composition-card">
      <div className="composition-card-header">
        <h3>Wagi rzeczywiste</h3>

        {hasTransactions && (
          <button
            className="button-ghost"
            onClick={onOpenTransactions}
          >
            Przejdź do transakcji
          </button>
        )}
      </div>

      {!hasModelWeights && (
        <div className="composition-locked">
          <p>
            Najpierw dodaj wagi modelowe, aby móc
            rejestrować rzeczywisty skład portfela.
          </p>
        </div>
      )}

      {hasModelWeights && !hasTransactions && (
        <div className="composition-empty">
          <p>Nie masz jeszcze żadnych transakcji.</p>
          <button
            className="save-btn"
            onClick={onOpenTransactions}
          >
            Dodaj pierwszą transakcję
          </button>
        </div>
      )}

      {hasModelWeights && hasTransactions && (
        <ActualWeightsChart
          modelWeights={modelWeights}
          transactions={transactions}
          currentValues={currentValues}
        />
      )}
    </div>
  );
}
