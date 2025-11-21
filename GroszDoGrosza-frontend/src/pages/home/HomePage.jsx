import { useNavigate } from "react-router-dom";

export function HomePage() {

  const navigate = useNavigate();

  function handleLoginClick() {
    navigate("/login");
  }

  function handleRegisterClick() {
    navigate("/register");
  }

  return (
    <>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
    </>
  );
}