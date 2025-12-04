import './DashboardHeader.css';
import Logo from '../../assets/images/GroszDoGrosza-Logo.svg';

export function DashboardHeader() {
  return (
    <div className="dashboard-header">
      <div className="left-section"> 
        <img src={Logo} />
      </div>
    </div>
  );
}
