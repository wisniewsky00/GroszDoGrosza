import InvestmentDirectImage from '../../../assets/images/articles/direct-investing.jpg'

export function DirectInvesting() {
  return (
    <>
      <h1>Inwestowanie bezpośrednie – na czym polega?</h1>

      <p>
        Inwestowanie bezpośrednie polega na samodzielnym kupowaniu i sprzedawaniu
        konkretnych instrumentów finansowych. To Ty podejmujesz wszystkie decyzje
        – wybierasz, co kupić, kiedy sprzedać i ile pieniędzy zainwestować.
      </p>


      <img
        className="article-image"
        src={InvestmentDirectImage}
        alt="Inwestowanie bezpośrednie"
      />


      <h2>Co oznacza „bezpośrednio”?</h2>
      <p>
        Oznacza to, że jesteś właścicielem danego instrumentu lub masz na niego
        bezpośrednią ekspozycję. Przykładowo:
      </p>


      <ul>
        <li>kupując akcje – stajesz się współwłaścicielem spółki,</li>
        <li>kupując obligacje – pożyczasz pieniądze emitentowi,</li>
        <li>kupując kryptowaluty – posiadasz je w swoim portfelu.</li>
      </ul>


      <h2>Przykłady inwestowania bezpośredniego</h2>
      <ul>
        <li>akcje spółek giełdowych (np. PKO BP, Apple)</li>
        <li>obligacje skarbowe i korporacyjne</li>
        <li>kryptowaluty (np. Bitcoin, Ethereum)</li>
        <li>surowce (np. złoto – fizyczne lub giełdowe)</li>
      </ul>


      <h2>Zalety inwestowania bezpośredniego</h2>
      <div className="article-box article-box--pros">
        <ul>
          <li>pełna kontrola nad decyzjami inwestycyjnymi</li>
          <li>brak opłat za zarządzanie</li>
          <li>możliwość wyboru konkretnych spółek lub aktywów</li>
          <li>potencjalnie wyższe zyski przy trafnych decyzjach</li>
        </ul>
      </div>


      <h2>Wady inwestowania bezpośredniego</h2>
      <div className="article-box article-box--cons">
        <ul>
          <li>wymaga wiedzy i czasu</li>
          <li>większe ryzyko błędów początkującego</li>
          <li>konieczność samodzielnej analizy rynku</li>
          <li>silny wpływ emocji na decyzje</li>
        </ul>
      </div>


      <h2>Dla kogo inwestowanie bezpośrednie?</h2>
      <p>
        To dobre rozwiązanie dla osób, które chcą aktywnie uczestniczyć w
        inwestowaniu, uczyć się rynku i mają czas na analizę. Dla początkujących
        zalecane jest zaczynanie od małych kwot.
      </p>
    </>
  )
}