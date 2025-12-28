import { useEffect} from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from "../../utils/jwtUtils";
import { UserHeader } from "../../components/UserHeader";
import './DashboardPage.css';
import { TileGrid } from "../../components/tiles/TileGrid";
import articlesIcon from '../../assets/images/icons/articles.png';
import walletIcon from '../../assets/images/icons/wallet.png';

export function DashboardPage() {

  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

    const tiles = [
    {
      title: "Artykuły",
      path: "/articles",
      icon: articlesIcon,
    },
    {
      title: "Portfele inwestycyjne",
      path: "/portfolios",
      icon: walletIcon,
    }
  ];

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
      <UserHeader user={user} logout={logout}/>
      <div className="dashboard-content">
        <TileGrid tiles={tiles}/>
      </div>
    </div>
  );
}