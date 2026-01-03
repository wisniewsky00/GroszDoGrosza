import IndexPicture from '../../../assets/images/articles/indexes.jpg'

export default function Indexes() {
  return (
    <>
      <h1>Czym są indeksy giełdowe i jak z nich korzystać?</h1>

      <p>
        Na giełdzie notowane są setki, a czasem tysiące instrumentów finansowych.
        Śledzenie każdego z nich osobno byłoby praktycznie niemożliwe. Właśnie
        dlatego powstały indeksy giełdowe – proste wskaźniki, które w jednej
        liczbie pokazują, co dzieje się na rynku lub w jego wybranej części.
      </p>

      <p>
        W tym artykule wyjaśniamy, czym są indeksy giełdowe, jak się je oblicza,
        jakie są ich rodzaje oraz dlaczego odgrywają tak ważną rolę w
        inwestowaniu. Co ważne – indeksy nie dotyczą wyłącznie akcji. Istnieją
        również indeksy obligacji, surowców czy innych klas aktywów.
      </p>

      <img
        className="article-image"
        src={IndexPicture}
        alt="Indeksy giełdowe"
      />

      <h2>Co to jest indeks giełdowy?</h2>
      <p>
        Indeks giełdowy to <strong>liczba</strong>, która pokazuje, jak zmienia się
        wartość wybranej grupy instrumentów finansowych – najczęściej akcji, ale
        także obligacji, surowców lub innych aktywów.
      </p>

      <div className="article-definition">
        <p>
          <strong>Indeks giełdowy</strong> – wskaźnik (liczba), który w uproszczony
          sposób pokazuje zachowanie określonej części rynku.
        </p>
      </div>

      <p>
        Indeks <strong>nie jest instrumentem finansowym</strong> – nie można go
        bezpośrednio kupić ani sprzedać. Służy do obserwowania rynku i porównywania
        wyników inwestycji.
      </p>

      <h2>Do czego służą indeksy giełdowe?</h2>
      <ul>
        <li>szybkiej oceny kondycji rynku lub sektora</li>
        <li>porównywania wyników inwestycji (benchmark)</li>
        <li>budowy funduszy ETF i strategii indeksowych</li>
      </ul>

      <h2>Jak dobiera się składniki indeksu?</h2>
      <p>
        Składniki indeksu dobierane są według ściśle określonych zasad. Najczęściej
        bierze się pod uwagę:
      </p>

      <ul>
        <li>
          <strong>wielkość</strong> – np. indeksy największych spółek
        </li>
        <li>
          <strong>branżę</strong> – indeksy sektorowe
        </li>
        <li>
          <strong>rynek lub kraj</strong> – np. indeksy giełd narodowych
        </li>
      </ul>

      <h2>Jak oblicza się indeksy giełdowe?</h2>
      <p>
        Większość popularnych indeksów jest <strong>ważona kapitalizacją</strong>.
        Oznacza to, że większe instrumenty (np. duże spółki) mają większy wpływ na
        wartość indeksu niż mniejsze.
      </p>

      <p>
        W praktyce kilka największych składników może odpowiadać za znaczną część
        zmian indeksu – nawet jeśli reszta zachowuje się słabiej.
      </p>

      <h2>Indeksy cenowe i dochodowe</h2>
      <ul>
        <li>
          <strong>Indeksy cenowe</strong> – uwzględniają tylko zmiany cen (np. WIG20,
          S&amp;P 500)
        </li>
        <li>
          <strong>Indeksy dochodowe</strong> – uwzględniają również dywidendy i inne
          dochody (np. WIG, DAX)
        </li>
      </ul>

      <h2>Najważniejsze indeksy akcyjne na GPW</h2>
      <ul>
        <li><strong>WIG</strong> – szeroki indeks dochodowy rynku głównego</li>
        <li><strong>WIG20</strong> – 20 największych spółek (indeks cenowy)</li>
        <li><strong>mWIG40</strong> – średnie spółki</li>
        <li><strong>sWIG80</strong> – mniejsze spółki</li>
      </ul>

      <h2>Popularne indeksy akcyjne na świecie</h2>
      <ul>
        <li>S&amp;P 500 (USA)</li>
        <li>Dow Jones Industrial Average (USA)</li>
        <li>DAX (Niemcy)</li>
        <li>FTSE 100 (Wielka Brytania)</li>
        <li>CAC 40 (Francja)</li>
      </ul>

      <h2>Indeks jako punkt odniesienia (benchmark)</h2>
      <p>
        Indeksy są często wykorzystywane jako punkt odniesienia do oceny wyników
        inwestycji. Jeśli portfel lub fundusz zarabia mniej niż indeks, oznacza
        to, że radzi sobie gorzej niż rynek.
      </p>

      <h2>Inwestowanie indeksowe</h2>
      <p>
        Inwestowanie indeksowe polega na naśladowaniu zachowania indeksu, zwykle
        za pomocą funduszy ETF. Zamiast wybierać pojedyncze spółki, inwestor
        inwestuje w cały rynek lub jego fragment.
      </p>

      <h3>Zalety inwestowania indeksowego</h3>
      <div className="article-box article-box--pros">
        <ul>
          <li>Szeroka dywersyfikacja</li>
          <li>Niskie koszty</li>
          <li>Prostota</li>
        </ul>
      </div>

      <h3>Wady inwestowania indeksowego</h3>
      <div className="article-box article-box--cons">
        <ul>
          <li>Brak możliwości pobicia rynku</li>
          <li> Spadki wartości inwestycji w okresach, gdy rynek przez dłuższy czas traci
            na wartości</li>
          <li>Duży wpływ największych składników</li>
        </ul>
      </div>

      <h2>Przykład: uproszczony skład indeksu WIG</h2>
      <p>
        Poniżej znajduje się uproszczony przykład składu indeksu WIG – pokazujemy
        wyłącznie nazwę spółki oraz jej udział procentowy w indeksie.
      </p>

      <table className="article-table">
        <caption>Skład indeksu WIG – stan na 04.01.2026</caption>
        <thead>
          <tr>
            <th>Spółka</th>
            <th>Udział w indeksie (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>PKO BP</td><td>15,85%</td></tr>
          <tr><td>PKN Orlen</td><td>13,32%</td></tr>
          <tr><td>PZU</td><td>8,80%</td></tr>
          <tr><td>KGHM</td><td>8,74%</td></tr>
          <tr><td>Pekao</td><td>8,42%</td></tr>
          <tr><td>LPP</td><td>6,12%</td></tr>
          <tr><td>Allegro</td><td>5,62%</td></tr>
          <tr><td>Santander Bank Polska</td><td>5,34%</td></tr>
          <tr><td>Dino Polska</td><td>4,44%</td></tr>
          <tr><td>CD Projekt</td><td>3,85%</td></tr>
          <tr><td>mBank</td><td>3,27%</td></tr>
          <tr><td>Alior Bank</td><td>2,29%</td></tr>
          <tr><td>Żabka Group</td><td>2,23%</td></tr>
          <tr><td>Kęty</td><td>2,07%</td></tr>
          <tr><td>Kruk</td><td>1,99%</td></tr>
          <tr><td>Budimex</td><td>1,85%</td></tr>
          <tr><td>PGE</td><td>1,77%</td></tr>
          <tr><td>Orange Polska</td><td>1,49%</td></tr>
          <tr><td>CCC</td><td>1,41%</td></tr>
          <tr><td>Pepco Group</td><td>1,13%</td></tr>
        </tbody>
      </table>

      <p className="muted">
        Uwaga: indeks jest ważony kapitalizacją – kilka największych spółek ma
        decydujący wpływ na jego zachowanie. <br />
      </p>

      <div className="article-definition">
        <strong>Kapitalizacja spółki</strong> – to rynkowa wartość firmy, liczona jako
        cena jednej akcji pomnożona przez liczbę wszystkich akcji w obrocie.
        Im wyższa kapitalizacja spółki, tym większy jej wpływ na wartość indeksu.
      </div>

      <h2>Podsumowanie</h2>
      <p>
        Indeksy giełdowe to podstawowe narzędzie analizy rynku i fundament
        nowoczesnego inwestowania pasywnego. Dla większości inwestorów –
        szczególnie początkujących – są one jednym z najlepszych punktów
        wyjścia do budowy długoterminowego portfela.
      </p>
    </>
  );
}
