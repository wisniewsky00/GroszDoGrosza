import './TileGrid.css';
import { Tile } from './Tile';

export function TileGrid({ tiles }) {
  return(
    <section className="tile-grid">
      {tiles.map(tile => (
        <Tile key={tile.path} {...tile} />
      ))}
    </section>
  )
}