import "../CompositionCard.css";
import { useState } from "react";
import { ModelWeightsModal } from "./ModelWeightsModal";
import { ModelWeightsChart } from "./ModalWeightsChart";
import './ModelWeightsCard.css'

export function ModelWeightsCard({ weights, onSave }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="composition-card">
      <div className="composition-card-header">
        <h3>Wagi modelowe</h3>

        {weights && (
          <button
            className="button-ghost edit-btn"
            onClick={() => setOpen(true)}
          >
            Edytuj
          </button>
        )}
      </div>

      {!weights ? (
        <div className="composition-empty">
          <p>Dodaj wagi modelowe portfela.</p>
          <button className="save-btn" onClick={() => setOpen(true)}>
            Dodaj wagi modelowe
          </button>
        </div>
      ) : (
        <div className="chart-wrapper">
          <ModelWeightsChart data={weights} />
        </div>
      )}

      {open && (
        <ModelWeightsModal
          initialWeights={weights}
          onClose={() => setOpen(false)}
          onSave={(newWeights) => {
            onSave(newWeights);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
