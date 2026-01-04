export function ContactPopup({ status, onClose }) {
  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className={`popup ${status}`} onClick={(e) => e.stopPropagation()}>
        {status === "success" ? (
          <>
            <h3>Wiadomość wysłana!</h3>
            <p>Dziękujemy za kontakt! Odpowiemy najszybciej jak to możliwe.</p>
          </>
        ) : (
          <>
            <h3>Ups! Coś poszło nie tak!</h3>
            <p>Spróbuj ponownie za chwilę.</p>
          </>
        )}
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
