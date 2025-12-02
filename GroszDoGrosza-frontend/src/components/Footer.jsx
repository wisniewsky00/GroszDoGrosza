import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bottom">
        &#169; {new Date().getFullYear()} GroszDoGrosza. Wszelkie prawa zastrzeżone.
      </div>
    </footer>
  );
}