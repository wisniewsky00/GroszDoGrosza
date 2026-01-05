import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.js'
import { LoginForm } from './LoginForm.jsx'
import './LoginPage.css';
import { useEffect, useState } from 'react';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(email, password, setError) {
    if (loading) return;

    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const server = err.response?.data;
      if (server === 'EMAIL_NOT_VERIFIED' || err.response?.status === 403) {
        navigate("/verify-email", { state: { email } });
        return;
      }
      setError("Niepoprawne dane logowania!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">

      <button className="back-button" onClick={() => navigate("/")}>
        &#8592; Wstecz
      </button>

      <div className="login-card">
        <h1>Logowanie</h1>
        <LoginForm onSubmit={handleSubmit} loading={loading}></LoginForm>
        <p className="register-message">Nie masz konta? <span className="register-link" onClick={() => navigate("/register")}>Zarejestruj się</span></p>
      </div>

    </div>
  );
} 