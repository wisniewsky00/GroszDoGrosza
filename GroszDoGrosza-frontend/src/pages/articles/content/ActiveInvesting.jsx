import ChartAnalystPicture from '../../../assets/images/articles/chart-analyst.jpg';

export default function ActiveInvesting() {
  return (
    <>
      <h1>Inwestowanie aktywne – na czym polega?</h1>

      <p>
        Inwestowanie aktywne to podejście, w którym inwestor samodzielnie
        podejmuje decyzje o tym, co i kiedy kupić lub sprzedać, próbując
        osiągnąć lepsze wyniki niż cały rynek.
      </p>

      <p>
        W przeciwieństwie do inwestowania pasywnego, inwestor aktywny
        nie „podąża za rynkiem”, lecz stara się go wyprzedzić, wybierając
        konkretne spółki lub momenty inwestycji.
      </p>
      
      <img
        className="article-image"
        src={ChartAnalystPicture}
        alt="Analiza rynku finansowego"
      />

      <h2>Na czym polega inwestowanie aktywne w praktyce?</h2>

      <p>
        Inwestor aktywny regularnie obserwuje rynek, czyta informacje
        gospodarcze i analizuje sytuację firm. Na tej podstawie podejmuje
        decyzje inwestycyjne – czasem kupuje, czasem sprzedaje aktywa.
      </p>

      <p>
        Celem jest znalezienie okazji inwestycyjnych, zanim zauważy je
        większość uczestników rynku.
      </p>

      <div className="article-definition">
        <p>
          <strong>Analiza rynku</strong> – to próba oceny, czy dana inwestycja
          ma szansę przynieść zysk, na podstawie dostępnych informacji
          i obserwacji.
        </p>
      </div>

      <h2>Zalety inwestowania aktywnego</h2>

      <div className="article-box article-box--pros">
        <ul>
          <li>Możliwość osiągnięcia wyższych zysków niż rynek</li>
          <li>Elastyczność w reagowaniu na zmiany sytuacji rynkowej</li>
          <li>Szansa na ograniczenie strat w trudnych okresach</li>
          <li>Możliwość wykorzystania krótkoterminowych okazji</li>
        </ul>
      </div>

      <h2>Wady inwestowania aktywnego</h2>

      <div className="article-box article-box--cons">
        <ul>
          <li>Wymaga dużo czasu i zaangażowania</li>
          <li>Wyższe koszty związane z częstymi transakcjami</li>
          <li>Ryzyko popełniania błędnych decyzji</li>
          <li>Trudność w regularnym osiąganiu lepszych wyników niż rynek</li>
        </ul>
      </div>

      <h2>Dla kogo inwestowanie aktywne?</h2>

      <p>
        Inwestowanie aktywne może być odpowiednie dla osób, które:
      </p>

      <ul>
        <li>mają czas na regularne śledzenie rynku</li>
        <li>lubią analizować informacje finansowe</li>
        <li>są gotowe na większe wahania wartości inwestycji</li>
      </ul>

      <p>
        Nie jest to jednak podejście dla każdego. Dla wielu osób
        inwestowanie pasywne będzie prostszym i mniej stresującym rozwiązaniem.
      </p>

      <h2>Inwestowanie aktywne czy pasywne – co wybrać?</h2>

      <p>
        Nie ma jednej, uniwersalnej odpowiedzi. Wybór strategii zależy od
        Twojego czasu, wiedzy oraz podejścia do ryzyka.
      </p>

      <p>
        W praktyce wiele osób łączy oba podejścia – część środków inwestuje
        pasywnie, a część aktywnie, w zależności od swoich celów.
      </p>
    </>
  );
}
