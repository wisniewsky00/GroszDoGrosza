import { useEffect, useState } from "react";
import { backendApi } from "../../../services/backendApi";

export function UsernameSection({ user, token, refreshUser }) {
  const [username, setUsername] = useState("");
  const [formUsername, setFormUsername] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.username) {
      setUsername(user.username);
      setFormUsername(user.username);
    }
  }, [user]);

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [success]);

  const handleEdit = () => {
    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormUsername(username);
    setError("");
    setSuccess("");
    setIsEditing(false);
  };

  const validateUsername = (value) => {
    if (!value.trim()) return "Pole jest wymagane";
    return "";
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    const validationError = validateUsername(formUsername);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (formUsername.trim() === username) {
      setError("Nic się nie zmieniło");
      return;
    }

    setLoading(true);
    try {
      await backendApi.patch(
        "/users/username",
        { username: formUsername.trim() },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );

      await refreshUser();

      setUsername(formUsername.trim());
      setIsEditing(false);
      setSuccess("Nazwa użytkownika została zaktualizowana");
    } catch (err) {
      if (err?.response?.data?.error === "USERNAME_TAKEN") {
        setError("Ta nazwa użytkownika jest już zajęta");
      } else if (err?.response?.status === 401) {
        setError("Brak autoryzacji. Zaloguj się ponownie.");
      } else {
        setError("Nie udało się zapisać zmian. Spróbuj ponownie później");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-section">
      <h2>Nazwa użytkownika</h2>
      <div className="muted">To, jak inni widzą Cię w aplikacji.</div>

      <label className="input-label">Nazwa użytkownika</label>
      <input
        className={error ? "input error" : "input"}
        value={isEditing ? formUsername : username}
        disabled={!isEditing}
        onChange={(e) => {
          setFormUsername(e.target.value);
          if (error) setError("");
        }}
        onBlur={() => {
          if (!isEditing) return;
          const validationError = validateUsername(formUsername);
          if (validationError) setError(validationError);
        }}
      />

      {error && <div className="input-error">{error}</div>}
      {success && <div className="verify-message success">{success}</div>}

      {!isEditing ? (
        <button className="save-btn" onClick={handleEdit}>
          Zmień
        </button>
      ) : (
        <div style={{ display: "flex", gap: 12 }}>
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Zapis..." : "Zapisz"}
          </button>

          <button
            className="button-ghost"
            onClick={handleCancel}
            disabled={loading}
          >
            Anuluj
          </button>
        </div>
      )}
    </div>
  );
}
