import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { RegisterForm } from "./RegisterForm";
import { useEffect } from "react";
import './RegisterPage.css';

export function RegisterPage() {

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(username, email, password, setError) {
    try {
      await register(username, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.error || "Wystapił błąd");
    }
  }

  return (
    <div className="register-wrapper">

      <button className="back-button" onClick={() => navigate("/")}>
        &#8592; Wstecz
      </button>

      <div className="register-card">
        <h1>Rejestracja</h1>
        <RegisterForm onSubmit={handleSubmit}></RegisterForm>
      </div>
    </div>
  );
}