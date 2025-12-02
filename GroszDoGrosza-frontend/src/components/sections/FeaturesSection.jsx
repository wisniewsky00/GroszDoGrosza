import './FeaturesSection.css';

export function FeaturesSection() {
  return (
    <section className="features-section" id="features">
      <div className="features-title-badge">Funkcje</div>

      <h2 className="features-heading">
        Narzędzia, które pomogą Ci lepiej zarządzać finansami
      </h2>

      <p className="features-subtext">
        GroszDoGrosza wspiera Cię na każdym etapie — od nauki podstaw po budowanie własnego portfela.
      </p>

      <div className="features-grid">

        <div className="feature-box">
          <div className="feature-icon green">📘</div>
          <div>
            <h3 className="feature-title">Materiały edukacyjne</h3>
            <p className="feature-desc">
              Czytelne artykuły, które wyjaśniają inwestowanie krok po kroku.
            </p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon blue">💼</div>
          <div>
            <h3 className="feature-title">Tworzenie portfeli</h3>
            <p className="feature-desc">
              Zbuduj własny portfel inwestycyjny i śledź wybrane aktywa.
            </p>
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-icon yellow">📊</div>
          <div>
            <h3 className="feature-title">Analiza i wizualizacje</h3>
            <p className="feature-desc">
              Twórz wykresy i statystyki, które pomogą zrozumieć wyniki Twoich inwestycji.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
