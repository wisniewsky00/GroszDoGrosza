import './DashboardPage.css';
import { TileGrid } from "../../components/tiles/TileGrid";
import articlesIcon from '../../assets/images/icons/articles.png';
import walletIcon from '../../assets/images/icons/wallet.png';

export function DashboardPage() {

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

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        <TileGrid tiles={tiles}/>
      </div>
    </div>
  );
}