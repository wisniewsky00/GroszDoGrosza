import { useAuth } from '../context/useAuth.js'
import { LoginForm } from '../components/LoginForm.jsx'

export function LoginPage() {
  const { login } = useAuth();

  async function handleSubmit(email, password) {
    try {
      await login(email, password);
      window.location.href = "/dashboard";
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