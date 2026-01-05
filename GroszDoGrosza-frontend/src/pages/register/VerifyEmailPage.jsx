import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VerifyEmailPage.css";

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (!email) navigate("/register");
  }, [email, navigate]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  useEffect(() => {
    setResendDisabled(timer > 0);
  }, [timer]);

  async function handleVerify(e) {
    e.preventDefault();
    if (loading) return;

    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code })
      });

      if (!res.ok) {
        setMsg("Kod nieprawidłowy lub wygasł.");
        setLoading(false);
        return;
      }

      setMsg("E-mail potwierdzony! Przekierowanie do logowania...");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setMsg("Błąd sieci.");
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resending || resendDisabled) return;

    setMsg("");
    setResending(true);
    try {
      await fetch("http://localhost:8080/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      setMsg("Wysłano nowy kod.");
      setTimer(60);
    } catch {
      setMsg("Błąd wysyłki.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h1>Potwierdź e-mail</h1>
        <p>Wpisz 6-cyfrowy kod wysłany na adres:</p>
        <strong>{email}</strong>

        <form className="verify-form" onSubmit={handleVerify}>
          <label>Kod</label>
          <input
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="••••••"
          />

          <button className="verify-btn" type="submit" disabled={loading}>
            {loading ? (
              <>
                <i className="fa fa-spinner fa-spin" style={{ marginRight: 8 }} />
                Weryfikuję...
              </>
            ) : (
              "Weryfikuj"
            )}
          </button>
        </form>

        <button
          className="verify-resend"
          onClick={handleResend}
          disabled={resendDisabled || resending}
        >
          {resending ? (
            <>
              <i className="fa fa-spinner fa-spin" style={{ marginRight: 6 }} />
              Wysyłam...
            </>
          ) : resendDisabled ? (
            `Wyślij ponownie (${timer}s)`
          ) : (
            "Wyślij ponownie"
          )}
        </button>

        {msg && (
          <p
            className={`verify-message ${msg.includes("potwierdzony") ? "success" : "error"
              }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}
