import InvestmentIndirectImage from '../../../assets/images/articles/indirect-investing.jpg'

export function IndirectInvesting() {
  return (
    <>
      <h1>Inwestowanie pośrednie – czym różni się od bezpośredniego?</h1>

      <p>
        Inwestowanie pośrednie polega na lokowaniu kapitału za pośrednictwem
        instytucji finansowych. Inwestor nie wybiera pojedynczych akcji czy
        obligacji – robi to za niego fundusz lub zarządzający.
      </p>


      <img
        className="article-image"
        src={InvestmentIndirectImage}
        alt="Inwestowanie pośrednie"
      />


      <h2>Na czym polega inwestowanie pośrednie?</h2>
      <p>
        Twoje pieniądze trafiają do funduszu, który inwestuje je zgodnie z
        określoną strategią. Ty kupujesz jednostki funduszu lub ETF, a nie
        konkretne instrumenty.
      </p>

      <p>
        Jeśli chcesz dowiedzieć się więcej o ETF, zobacz artykuł:
        {" "}
        <a href="/articles/etf-funds" className="article-link">
          Czym są fundusze ETF?
        </a>
      </p>

      <h2>Główne formy inwestowania pośredniego</h2>
      <ul>
        <li>fundusze inwestycyjne aktywne</li>
        <li>fundusze indeksowe i ETF</li>
        <li>produkty emerytalne (IKE, IKZE)</li>
      </ul>


      <h2>Fundusze aktywne – co to jest?</h2>
      <p>
        Fundusze aktywne są zarządzane przez zespół specjalistów, którzy próbują
        osiągnąć wynik lepszy niż rynek (np. lepszy niż indeks giełdowy).
      </p>


      <h3>Zalety funduszy aktywnych</h3>
      <div className="article-box article-box--pros">
        <ul>
          <li>Zarządzanie przez profesjonalistów</li>
          <li>Brak konieczności samodzielnej analizy rynku</li>
          <li>Dostęp do rynków trudnych dla inwestora indywidualnego</li>
        </ul>
      </div>


      <h3>Wady funduszy aktywnych</h3>
      <div className="article-box article-box--cons">
        <ul>
          <li>Wysokie opłaty za zarządzanie</li>
          <li>Brak gwarancji pobicia rynku</li>
          <li>Wyniki zależne od decyzji zarządzającego</li>
        </ul>
      </div>


      <h2>Fundusze indeksowe i ETF</h2>
      <p>
        Fundusze indeksowe oraz ETF nie próbują pobić rynku. Ich celem jest
        odwzorowanie zachowania konkretnego indeksu (np. WIG, S&P 500).
      </p>


      <h3>Zalety funduszy indeksowych</h3>
      <div className="article-box article-box--pros">
        <ul>
          <li>Niskie koszty</li>
          <li>Szeroka dywersyfikacja</li>
          <li>Prostota i przejrzystość</li>
        </ul>
      </div>


      <h3>Wady funduszy indeksowych</h3>
      <div className="article-box article-box--cons">
        <ul>
          <li>Brak szansy na znaczące pobicie rynku</li>
          <li>Spadki wartości inwestycji w okresach, gdy rynek przez dłuższy czas traci
          na wartości</li>
        </ul>
      </div>


      <h2>Dla kogo inwestowanie pośrednie?</h2>
      <p>
        Inwestowanie pośrednie jest szczególnie polecane osobom początkującym,
        które chcą inwestować regularnie, bez konieczności codziennego śledzenia
        rynku.
      </p>


      <h2>Podsumowanie</h2>
      <p>
        Inwestowanie bezpośrednie daje większą kontrolę, ale wymaga wiedzy i
        zaangażowania. Inwestowanie pośrednie jest prostsze i bardziej pasywne,
        kosztem mniejszego wpływu na decyzje i wysokimi opłatami za zarządzanie.
      </p>
    </>
  )
}