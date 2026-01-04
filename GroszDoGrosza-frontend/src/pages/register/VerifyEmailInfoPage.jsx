import { useNavigate } from "react-router-dom";
import "./VerifyEmailInfoPage.css";

export function VerifyEmailInfoPage() {
  const navigate = useNavigate();

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h1>📧 Potwierdź adres e-mail</h1>

        <p>
          Wysłaliśmy do Ciebie wiadomość e-mail z linkiem aktywacyjnym.
        </p>

        <p>
          Kliknij w link, aby aktywować konto i móc się zalogować.
        </p>

        <button
          className="verify-btn"
          onClick={() => navigate("/login")}
        >
          Przejdź do logowania
        </button>
      </div>
    </div>
  );
}
