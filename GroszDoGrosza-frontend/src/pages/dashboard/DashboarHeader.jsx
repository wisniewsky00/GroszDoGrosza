import './DashboardHeader.css';
import Logo from '../../assets/images/GroszDoGrosza-Logo.png';
import UserAvatar from '../../assets/images/User-avatar.svg.png';
import DownArrow from '../../assets/images/icons/down-arrow.png';
import UpArrow from '../../assets/images/icons/up-arrow.png';
import { useState } from 'react';

export function DashboardHeader({ user, logout }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="dashboard-header">
      <div className="left-section">
        <img className="logo" src={Logo} />
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
