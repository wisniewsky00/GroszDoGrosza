import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendApi } from "../../../services/backendApi";
import EyeIcon from "../../../assets/images/icons/eye.svg";
import EyeOffIcon from "../../../assets/images/icons/eye-off.svg";

export function DeleteAccountSection({ token }) {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const openModal = () => {
    resetState();
    setShowModal(true);
  };

  const closeModal = () => {
    resetState();
    setShowModal(false);
  };

  const resetState = () => {
    setPassword("");
    setPasswordError("");
    setMessage("");
    setMessageType("");
    setShowPassword(false);
  };

  const handleDelete = async () => {
    setPasswordError("");
    setMessage("");

    if (!password.trim()) {
      setPasswordError("Pole jest wymagane");
      return;
    }

    setLoading(true);
    try {
      await backendApi.delete("/users", {
        data: { password },
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
      });

      // wylogowanie + cleanup
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.clear();

      navigate("/");
    } catch (err) {
      if (err?.response?.data?.error === "INVALID_PASSWORD") {
        setPasswordError("Nieprawidłowe hasło");
      } else {
        setMessage("Nie udało się usunąć konta");
        setMessageType("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-section">
      <h2>Usunięcie konta</h2>
      <div className="muted">
        Ta operacja jest nieodwracalna. Wszystkie dane zostaną trwale usunięte.
      </div>

      <button className="danger-btn" onClick={openModal}>
        Usuń konto
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Potwierdź usunięcie konta</h3>
            <div className="email-note">
              Wpisz swoje hasło, aby potwierdzić usunięcie konta.
            </div>

            <label className="input-label">Hasło</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className={passwordError ? "input error" : "input"}
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.includes(" ")) return;

                  setPassword(value);
                  if (passwordError) setPasswordError("");
                }}
                onBlur={() => {
                  if (!password.trim()) {
                    setPasswordError("Pole jest wymagane");
                  }
                }}
              />

              <span
                className="toogle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={showPassword ? EyeOffIcon : EyeIcon} />
              </span>
            </div>

            {passwordError && (
              <div className="input-error">{passwordError}</div>
            )}

            {message && (
              <div className={`verify-message ${messageType}`}>
                {message}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button
                className="danger-btn"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Usuwanie..." : "Usuń konto"}
              </button>

              <button
                className="button-ghost"
                onClick={closeModal}
                disabled={loading}
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
