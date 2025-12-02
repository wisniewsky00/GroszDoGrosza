import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.js'
import { LoginForm } from './LoginForm.jsx'
import './LoginPage.css';
import { useEffect } from 'react';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    }
  }, []);

  async function handleSubmit(email, password, setError) {
    try {
      await login(email, password);
      navigate("/dashboard")
    } catch (err) {
      console.error(err);
      setError("Niepoprawne dane logowania!")
    }
  }

  return (
    <div className="login-wrapper">

      <button className="back-button" onClick={() => navigate("/")}>
        &#8592; Wstecz
      </button>

      <div className="login-card">
        <h1>Logowanie</h1>
        <LoginForm onSubmit={handleSubmit}></LoginForm>
      </div>

    </div>
  );
} 