import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth.js'
import { LoginForm } from './LoginForm.jsx'

export function LoginPage() {
  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(email, password) {
    try {
      await login(email, password);
      navigate("/dashboard")
    } catch (err) {
      console.error(err);
      alert("Niepoprawne dane logowania");
    }
  }

  return (
    <div>
      <h1>Logowanie</h1>
      <LoginForm onSubmit={handleSubmit}></LoginForm>
    </div>
  );
} 