import { useEffect, useState } from "react";
import { backendApi } from "../../../services/backendApi";
import EyeIcon from "../../../assets/images/icons/eye.svg";
import EyeOffIcon from "../../../assets/images/icons/eye-off.svg";

export function PasswordChangeSection({ token }) {
  const [isEditing, setIsEditing] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [success, setSuccess] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [success]);

  const handleEdit = () => {
    setIsEditing(true);
    resetErrors();
    setMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setOldPassword("");
    setNewPassword("");
    resetErrors();
    setMessage("");
  };

  const resetErrors = () => {
    setOldPasswordError("");
    setNewPasswordError("");
  };

  const handleSave = async () => {
    setOldPasswordError("");
    setNewPasswordError("");
    setSuccess("");
    setMessage("");

    if (!oldPassword.trim()) {
      setOldPasswordError("Pole jest wymagane");
      return;
    }

    if (!newPassword.trim()) {
      setNewPasswordError("Pole jest wymagane");
      return;
    }

    if (!validatePassword(newPassword, setNewPasswordError)) {
      return;
    }

    setLoading(true);
    try {
      await backendApi.patch(
        "/users/password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );

      setSuccess("Hasło zostało pomyślnie zmienione");
      setIsEditing(false);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      if (err?.response?.data?.error === "INVALID_PASSWORD") {
        setOldPasswordError("Nieprawidłowe aktualne hasło");
      } else {
        setMessage("Nie udało się zmienić hasła");
        setMessageType("error");
      }
    } finally {
      setLoading(false);
    }
  };

  function validatePassword(password, setError) {
    if (!/[A-Z]/.test(password)) {
      setError("Hasło musi zawierać co najmniej jedną wielką literę");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setError("Hasło musi zawierać co najmniej jedną małą literę");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setError("Hasło musi zawierać co najmniej jedną cyfrę");
      return false;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Hasło musi zawierać co najmniej jeden znak specjalny");
      return false;
    }
    if (password.length < 16) {
      setError("Hasło musi mieć minimum 16 znaków");
      return false;
    }

    setError("");
    return true;
  }

  return (
    <div className="edit-section">
      <h2>Zmiana hasła</h2>
      <div className="muted">Zadbaj o bezpieczeństwo swojego konta.</div>

      {!isEditing && (
        <button className="save-btn" onClick={handleEdit}>
          Zmień hasło
        </button>
      )}

      {isEditing && (
        <>
          <label className="input-label">Aktualne hasło</label>
          <div className="password-wrapper">
            <input
              type={showOldPassword ? "text" : "password"}
              className={oldPasswordError ? "input error" : "input"}
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                if (oldPasswordError) setOldPasswordError("");
              }}
              onBlur={() => {
                if (!oldPassword.trim()) {
                  setOldPasswordError("Pole jest wymagane");
                }
              }}
            />

            <span
              className="toogle-password"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              <img src={showOldPassword ? EyeOffIcon : EyeIcon} />
            </span>
          </div>
          {oldPasswordError && (
            <div className="input-error">{oldPasswordError}</div>
          )}
          
          <label className="input-label">Nowe hasło</label>
          <div className="password-wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              className={newPasswordError ? "input error" : "input"}
              value={newPassword}
              onChange={(e) => {
                const value = e.target.value;
                if (value.includes(" ")) return;

                setNewPassword(value);
                if (newPasswordError) setNewPasswordError("");

                validatePassword(value, setNewPasswordError);
              }}
              onBlur={() => {
                if (!newPassword.trim()) {
                  setNewPasswordError("Pole jest wymagane");
                  return;
                }
                validatePassword(newPassword, setNewPasswordError);
              }}
            />

            <span
              className="toogle-password"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <img src={showNewPassword ? EyeOffIcon : EyeIcon} />
            </span>
          </div>
          {newPasswordError && <div className="input-error">{newPasswordError}</div>}

          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Zapisywanie..." : "Zapisz"}
            </button>

            <button
              className="button-ghost"
              onClick={handleCancel}
              disabled={loading}
            >
              Anuluj
            </button>
          </div>
        </>
      )}

      {message && (
        <div className={`verify-message ${messageType}`}>{message}</div>
      )}

      {success && (
        <div className="verify-message success">
          {success}
        </div>
      )}
    </div>
  );
}
