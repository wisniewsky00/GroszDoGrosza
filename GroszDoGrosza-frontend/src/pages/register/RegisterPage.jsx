import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { RegisterForm } from "./RegisterForm";
import { useEffect, useState } from "react";
import './RegisterPage.css';

export function RegisterPage() {

  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(username, email, password, setError) {
    
    if (loading) return;

    try {
      setLoading(true);
      await register(username, email, password);
      navigate("/verify-email", { state: { email } });
    } catch (error) {
      setError(error.response?.data?.error || "Wystapił błąd");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-wrapper">

      <button className="back-button" onClick={() => navigate("/")}>
        &#8592; Wstecz
      </button>

      <div className="register-card">
        <h1>Rejestracja</h1>
        <RegisterForm onSubmit={handleSubmit} loading={loading}></RegisterForm>
      </div>
    </div>
  );
}