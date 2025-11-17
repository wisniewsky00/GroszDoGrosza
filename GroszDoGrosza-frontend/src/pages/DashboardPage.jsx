import { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {

  const {user} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate])

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
        </div>
      ) : (
        <p>Ładowanie danych użytkownika</p>
      )}
    </>
  );
}