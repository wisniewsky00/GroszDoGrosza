import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { RegisterForm } from "./RegisterForm";

export function RegisterPage() {

  const {register} = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(username, email, password) {
    try {
      await register(username, email, password);
      navigate("/dashboard");
    } catch(error) {
      console.error(error);
    }
  }

  return (
      <div>
        <h1>Rejestracja</h1>
        <RegisterForm onSubmit={handleSubmit}></RegisterForm>
      </div>
    );
}