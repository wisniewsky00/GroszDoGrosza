import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendApi } from "../../../services/backendApi";

function validateEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function EmailChangeSection({ user, token }) {
  const navigate = useNavigate();

  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [emailRequested, setEmailRequested] = useState(false);
  const [code, setCode] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const [redirectCountdown, setRedirectCountdown] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!message || redirectCountdown !== null) return;

    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [message, redirectCountdown]);
  useEffect(() => {
    if (redirectCountdown === null) return;

    if (redirectCountdown === 0) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.clear();

      navigate("/login");
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [redirectCountdown, navigate]);

  const handleEditEmail = () => {
    setIsEditing(true);
    setMessage("");
    setMessageType("");
  };

  const handleCancelEmail = () => {
    setIsEditing(false);
    setNewEmail("");
    setCode("");
    setEmailError("");
    setEmailRequested(false);
    setMessage("");
    setMessageType("");
  };

  const handleRequestCode = async () => {
    setEmailTouched(true);
    setMessage("");
    setMessageType("");

    if (!newEmail.trim()) {
      setEmailError("Pole jest wymagane");
      return;
    }

    if (!validateEmail(newEmail)) {
      setEmailError("Nieprawidłowy format e-mail");
      return;
    }

    setLoading(true);
    try {
      await backendApi.post(
        "/users/email/request",
        { newEmail },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );

      setEmailRequested(true);
      setMessage("Kod weryfikacyjny został wysłany");
      setMessageType("success");
    } catch (err) {
      setMessage(
        err?.response?.data?.error === "EMAIL_TAKEN"
          ? "Ten adres e-mail jest już zajęty"
          : "Nie udało się wysłać kodu"
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setMessage("");
    setMessageType("");

    if (!code) {
      setMessage("Wpisz kod weryfikacyjny");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      await backendApi.post(
        "/users/email/verify",
        { newEmail, code },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Adres e-mail został zmieniony. Zostaniesz wylogowany za");
      setMessageType("success");
      setRedirectCountdown(3);
    } catch {
      setMessage("Nieprawidłowy kod weryfikacyjny");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setMessage("");
    setMessageType("");

    try {
      await backendApi.post(
        "/users/email/resend",
        { newEmail },
        {
          headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Kod został wysłany ponownie");
      setMessageType("success");
    } catch {
      setMessage("Nie udało się wysłać kodu");
      setMessageType("error");
    }
  };

  return (
    <div className="edit-section">
      <h2>E-mail</h2>
      <div className="muted">
        Na aktualny adres e-mail wyślemy kod weryfikacyjny.
      </div>

      <label className="input-label">Aktualny e-mail</label>
      <input className="input" value={user?.email || ""} disabled />

      {!isEditing && (
        <>
          <div className="email-note">
            Zmiana adresu e-mail wymaga ponownego zalogowania.
          </div>

          <button className="save-btn" onClick={handleEditEmail}>
            Zmień e-mail
          </button>
        </>
      )}

      {isEditing && (
        <>
          <label className="input-label">Nowy e-mail</label>
          <input
            type="text"
            placeholder="Nowy adres e-mail"
            value={newEmail}
            onChange={(e) => {
              const value = e.target.value;
              if (value.includes(" ")) return;

              setNewEmail(value);
              if (emailError) setEmailError("");

              if (emailTouched && !validateEmail(value)) {
                setEmailError("Nieprawidłowy format e-mail");
              }
            }}
            onBlur={() => {
              setEmailTouched(true);

              if (!newEmail.trim()) {
                setEmailError("Pole jest wymagane");
              } else if (!validateEmail(newEmail)) {
                setEmailError("Nieprawidłowy format e-mail");
              }
            }}
            className={emailError ? "input error" : "input"}
            disabled={emailRequested || redirectCountdown !== null}
          />

          {emailError && <div className="input-error">{emailError}</div>}

          {!emailRequested ? (
            <div style={{ display: "flex", gap: 12 }}>
              <button
                className="save-btn"
                onClick={handleRequestCode}
                disabled={!newEmail.trim() || loading}
              >
                {loading ? "Wysyłanie..." : "Wyślij kod"}
              </button>

              <button
                className="button-ghost"
                onClick={handleCancelEmail}
                disabled={loading}
              >
                Anuluj
              </button>
            </div>
          ) : (
            <>
              <label className="input-label">Kod weryfikacyjny</label>
              <input
                className="input"
                placeholder="Wpisz kod"
                value={code}
                onChange={(e) => {
                  const value = e.target.value;

                  if (!/^\d*$/.test(value)) return;

                  if (value.length > 6) return;

                  setCode(value)
                }}
                disabled={redirectCountdown !== null}
              />

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  className="save-btn"
                  onClick={handleVerifyCode}
                  disabled={loading || redirectCountdown !== null}
                >
                  Potwierdź e-mail
                </button>

                <button
                  className="button-ghost"
                  onClick={handleResendCode}
                  disabled={loading || redirectCountdown !== null}
                >
                  Wyślij ponownie
                </button>
              </div>
            </>
          )}
        </>
      )}

      {message && (
        <div className={`verify-message ${messageType}`}>
          {message}
          {redirectCountdown !== null && <> {redirectCountdown}s</>}
        </div>
      )}
    </div>
  );
}
