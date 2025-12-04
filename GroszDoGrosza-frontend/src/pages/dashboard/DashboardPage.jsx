import { useEffect, useState } from "react";
import { useAuth} from "../../auth/useAuth";
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from "../../utils/jwtUtils";
import { backendApi } from "../../services/backendApi";
import { DashboardHeader } from "./DashboarHeader";

export function DashboardPage() {
  
  const {user, token, logout} = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        logout();
      }
    }, 1000 * 60 * 5);

    return () => clearInterval(interval);
  }, [token, logout, navigate]);

  const handleTestApi = async () => {
    try {
      const response = await backendApi.get("/users/test");
      setMessage(response.data);
    } catch (error) {
      console.log(error);
      setMessage("Błąd dostępu lub token wygasł"); 
    }
  }

  function handleLogout() {
    logout();
  }

  return (
    <>
      <DashboardHeader />

      <h1>Dashboard</h1>
      <h2> Dane użytownika</h2>

      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Token: {token}</p>
          <button onClick={handleTestApi}>Sprawdź API USER</button>
        </div>
      )}
      {message && <p>Odpowiedź API: {message}</p>}

      <button onClick={handleLogout}>Wyloguj</button>
    </>
  );
}