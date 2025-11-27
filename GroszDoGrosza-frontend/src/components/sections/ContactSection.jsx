import "./ContactSection.css";

export function ContactSection() {
  return (
    <section className="contact-section">
      <div className="contact-badge">Kontakt</div>

      <h2 className="contact-heading">Masz pytania? Napisz do nas!</h2>

      <p className="contact-subtext">
        Brakuje Ci jakiejś funkcji? Masz propozycję zmian? Daj nam znać — 
        tworzymy GroszDoGrosza razem z Tobą.
      </p>

      <form className="contact-form">
        <div className="form-row">
          <div className="form-group">
            <label>Imię</label>
            <input type="text" placeholder="Podaj swoje imię" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Twój adres email" />
          </div>
        </div>

        <div className="form-group">
          <label>Wiadomość</label>
          <textarea placeholder="Napisz swoją wiadomość..." rows="5"></textarea>
        </div>

        <button type="submit" className="contact-button">
          Wyślij wiadomość
        </button>
      </form>
    </section>
  );
}
