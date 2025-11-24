import { NavLink, useNavigate } from 'react-router'
import Logo from '../assets/images/GroszDoGrosza-Logo.png';
import './Header.css';

export function Header() {

  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/">
          <img className="logo" src={Logo} />
        </NavLink>  
      </div>

      <div className="middle-section">
        <p>O nas</p>
        <p>Funkcje</p>
        <p>Kontakt</p>
      </div>

      <div className="right-section">
        <button 
          className="btn btn-green"
          onClick={() => navigate("/login")}
        >
          Logowanie
        </button>
        <button 
          className="btn btn-blue"
          onClick={() => navigate("/register")}
        >
          Rejestracja
        </button>  
      </div>
    </div>
  );
}