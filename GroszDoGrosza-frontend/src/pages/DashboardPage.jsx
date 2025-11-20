import { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from "../utils/jwtUtils";

export function DashboardPage() {

  const {user, token, logout} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate])

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("sprawdzanie tokena");
      if (token && isTokenExpired(token)) {
        logout();
      } else {
        console.log(token);
        console.log(isTokenExpired(token));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token, logout, navigate]);

  return (
    <>
      <h1>Dashboard</h1>
      <h2> Dane użytownika</h2>

      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>Token: {token}</p>
        </div>
      ) : (
        <p>Ładowanie danych użytkownika</p>
      )}
    </>
  );
}