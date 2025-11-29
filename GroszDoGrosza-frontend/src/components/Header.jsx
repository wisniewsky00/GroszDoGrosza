import { NavLink, useNavigate } from 'react-router';
import Logo from '../assets/images/GroszDoGrosza-Logo.svg';
import './Header.css';
import { useEffect, useState } from 'react';

export function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <header className="header">
      <div className="left-section">
        <NavLink to="/">
          <img className="logo" src={Logo} alt="GroszDoGrosza logo" />
        </NavLink>
      </div>

      <nav className="middle-section">
        <NavLink to="/#mission">Nasza misja</NavLink>
        <NavLink to="/#features">Funkcje</NavLink>
        <NavLink to="/#contact">Kontakt</NavLink>
      </nav>

      <div className="right-section">
        <button 
          className="btn btn-green"
          onClick={() => navigate("/login")}
        >Logowanie</button>

        <button 
          className="btn btn-blue"
          onClick={() => navigate("/register")}
        >Rejestracja</button>
      </div>

      <div
        className={`burger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        className={`mobile-menu ${menuOpen ? "show" : ""}`}
      >
        <NavLink onClick={() => setMenuOpen(false)} to="/#mission">Nasza misja</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/#features">Funkcje</NavLink>
        <NavLink onClick={() => setMenuOpen(false)} to="/#contact">Kontakt</NavLink>

        <button onClick={() => {navigate("/login"); setMenuOpen(false)}} className="btn btn-green">
          Logowanie
        </button>

        <button onClick={() => {navigate("/register"); setMenuOpen(false)}} className="btn btn-blue">
          Rejestracja
        </button>

      </div>
    </header>
  );
}
