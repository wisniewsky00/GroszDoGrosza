import { useEffect} from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from "../../utils/jwtUtils";
import { DashboardHeader } from "./DashboarHeader";
import './DashboardPage.css';
import { TileGrid } from "../../components/dashboard/TileGrid";

export function DashboardPage() {

  const { user, token, logout } = useAuth();
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

  return (
    <div className="dashboard-page">
      <DashboardHeader user={user} logout={logout}/>
      <div className="dashboard-content">
        <TileGrid />
      </div>
    </div>
  );
}