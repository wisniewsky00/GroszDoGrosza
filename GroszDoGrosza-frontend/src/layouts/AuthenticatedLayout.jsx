import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { isTokenExpired } from "../utils/jwtUtils";
import { UserHeader } from "../components/UserHeader";
import { useEffect } from "react";

export function AuthenticatedLayout() {

  const { user, token, logout } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        logout();
      }
    }, 10_000);

    return () => clearInterval(interval);
  }, [token, logout]);

  if (!user) {
    return <Navigate to="/" replace/>;
  }

  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
}