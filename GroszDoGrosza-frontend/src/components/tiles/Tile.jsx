import './Tile.css';
import { Link } from 'react-router-dom';

export function Tile( {title, path, icon} ) {
  return (
    <Link to={path} className="tile">
      <img className="tile-icon" src={icon} />
      <h3>{title}</h3>
    </Link>
  )
}