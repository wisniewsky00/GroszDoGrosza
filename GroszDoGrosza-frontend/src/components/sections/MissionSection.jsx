import './MissionSection.css';
import GrowthChart from '../../assets/images/Growth-chart.png';

export function MissionSection() {
  return (
    <section className="mission-section">

      <div className="mission-badge">Nasza misja</div>

      <div className="mission-container">

        <div className="mission-left">
          <h2 className="mission-title">
            Twoje pierwsze kroki w świecie finansów!
          </h2>

          <p className="mission-description">
            Wierzymy, że każdy może zrozumieć finanse — wystarczy zacząć od
            małych kroków, <span className="bold-text">grosz po groszu</span>.
            Naszą misją jest pomagać Ci łączyć wiedzę z praktyką, abyś mógł
            świadomie budować swoją przyszłość finansową.
          </p>
        </div>
        
        <div className="mission-right">
          <img className="mission-image" src={GrowthChart} alt="Wykres wzrostu" />
        </div>
      </div>
    </section>
  );
}
