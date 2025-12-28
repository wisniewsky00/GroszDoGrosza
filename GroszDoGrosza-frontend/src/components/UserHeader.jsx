import './UserHeader.css';
import Logo from '../assets/images/GroszDoGrosza-Logo.png';
import UserAvatar from '../assets/images/User-avatar.svg.png';
import DownArrow from '../assets/images/icons/down-arrow.png';
import UpArrow from '../assets/images/icons/up-arrow.png';
import { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { Link } from 'react-router';

export function UserHeader() {

  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard-header">
      <div className="left-section">
        <Link to="/dashboard">
          <img className="logo" src={Logo} />
        </Link>
      </div>
      <div className="right-section" onClick={() => setOpen(!open)}>
        <img className="user-avatar" src={UserAvatar} />

        <div className="username-container">
          <p className="username">{user.username}</p>
          {open ? <img className="up-arrow" src={UpArrow} /> : <img className="down-arrow" src={DownArrow} />}
        </div>

        <div className={`dropdown-menu ${open ? "open" : ""}`}>
          <p>Edytuj profil</p>
          <button className="logout-btn" onClick={logout}>Wyloguj</button>
        </div>
      </div>
    </div>
  );
}
