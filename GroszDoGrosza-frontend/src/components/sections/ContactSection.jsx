import { useState } from "react";
import "./ContactSection.css";
import { ContactPopup } from "./ContactPopup";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Błąd wysyłki");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      error
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-badge">Kontakt</div>

      <h2 className="contact-heading">Masz pytania? Napisz do nas!</h2>

      <p className="contact-subtext">
        Brakuje Ci jakiejś funkcji? Masz propozycję zmian? Daj nam znać —
        tworzymy GroszDoGrosza razem z Tobą.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Imię</label>
            <input
              type="text"
              name="name"
              placeholder="Podaj swoje imię"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Twój adres email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Wiadomość</label>
          <textarea
            name="message"
            placeholder="Napisz swoją wiadomość..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="contact-button" disabled={loading}>
          {loading ? "Wysyłanie..." : "Wyślij wiadomość"}
        </button>
      </form>

      {status && <ContactPopup status={status} onClose={() => setStatus(null)} />}
    </section>
  );
}
