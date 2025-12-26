import './TileGrid.css';
import { Tile } from './Tile';
import articlesIcon from '../../assets/images/icons/articles.png';
import walletIcon from '../../assets/images/icons/wallet.png';

export function TileGrid() {

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
    },
    {
      title: "Portfele inwestycyjne",
      path: "/portfolios",
      icon: walletIcon,
    },
    {
      title: "Portfele inwestycyjne",
      path: "/portfolios",
      icon: walletIcon,
    }
  ];

  return(
    <section className="tile-grid">
      {tiles.map(tile => (
        <Tile key={tile.path} {...tile} />
      ))}
    </section>
  )
}