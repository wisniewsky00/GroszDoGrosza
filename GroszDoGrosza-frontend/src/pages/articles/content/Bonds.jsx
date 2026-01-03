import BondsPicture from '../../../assets/images/articles/bonds.jpg'

export default function Bonds() {
  return (
    <>
      <h1>Czy warto inwestować w obligacje?</h1>

      <p>
        Obligacje to proste i przewidywalne papiery dłużne — pożyczasz emitentowi
        (państwu, samorządowi lub firmie) pieniądze, a on zobowiązuje się je
        zwrócić wraz z odsetkami w ustalonym terminie. Dla początkującego
        inwestora to często bezpieczniejsza część portfela niż akcje.
      </p>

      <div className="article-definition">
        <p>
          <strong>Obligacja</strong> – dokument potwierdzający dług. Posiadacz
          obligacji jest wierzycielem emitenta.
        </p>
        <p>
          <strong>Kupon / odsetki</strong> – wynagrodzenie wypłacane inwestorowi
          w określonych odstępach czasu.
        </p>
      </div>

      <img
        className="article-image"
        src={BondsPicture}
        alt="Obligacje i ich podstawy"
      />

      <h2>W skrócie</h2>
      <ul>
        <li>Obligacje to forma pożyczki — emitent oddaje kapitał plus odsetki.</li>
        <li>Zazwyczaj mniej ryzykowne niż akcje, ale też dają mniejsze zyski.</li>
        <li>Są użyteczne do dywersyfikacji i generowania regularnego dochodu.</li>
      </ul>

      <h2>Jak działają obligacje — proste wyjaśnienie</h2>
      <p>
        Wyobraź sobie pizzerię, która chce otworzyć nowe lokale, ale nie chce
        rozwodnić udziałów przez emisję akcji. Może wyemitować obligacje —
        pożyczyć łącznie pewną kwotę od wielu inwestorów i spłacić ją po kilku
        latach, wypłacając co roku odsetki. Dla inwestora to przewidywalny
        strumień pieniędzy (kupon) i zwrot kapitału w dniu wykupu.
      </p>

      <h2>Główne rodzaje obligacji</h2>
      <div className="article-definition">
        <p>
          <strong>Według emitenta:</strong> obligacje skarbowe (państwo),
          komunalne (samorządy), korporacyjne (firmy).
        </p>
        <p>
          <strong>Według oprocentowania:</strong> stałokuponowe, zmiennokuponowe
          (np. powiązane z WIBOR), indeksowane do inflacji, zero‑kuponowe,
          zamienne (możliwość zamiany na akcje).
        </p>
      </div>

      <h2>Dlaczego oprocentowanie (rentowność) się różni?</h2>
      <p>
        Rentowność zależy od wiarygodności emitenta, wyników finansowych (w
        przypadku firm), długości zapadalności i warunków rynkowych. Stabilne
        państwa płacą mniej, startupy lub firmy z gorszym ratingiem — więcej.
      </p>

      <h2>Ryzyka, o których warto pamiętać</h2>
      <div className="article-box article-box--cons">
        <ul>
          <li>
            <strong>Ryzyko stopy procentowej:</strong> gdy stopy rosną, cena
            istniejących obligacji spada.
          </li>
          <li>
            <strong>Inflacja:</strong> jeśli inflacja przewyższy kupon, realna
            wartość zysku spadnie.
          </li>
          <li>
            <strong>Ryzyko kredytowe:</strong> emitent może nie wypłacić odsetek
            lub kapitału (szczególnie w obligacjach korporacyjnych).
          </li>
        </ul>
      </div>

      <h2>Obligacje vs akcje — najważniejsze różnice</h2>
      <table className="article-table">
        <thead>
          <tr>
            <th>Cecha</th>
            <th>Obligacje</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Charakter</td>
            <td>Dłużny — wierzyciel</td>
            <td>Udziałowy — współwłaściciel</td>
          </tr>
          <tr>
            <td>Dochód</td>
            <td>Kupony / odsetki</td>
            <td>Dywidendy + wzrost ceny akcji</td>
          </tr>
          <tr>
            <td>Ryzyko</td>
            <td>Zwykle niższe (z wyjątkiem high‑yield)</td>
            <td>Wyższe, większe wahania</td>
          </tr>
          <tr>
            <td>Zwrot</td>
            <td>Ograniczony i przewidywalny</td>
            <td>Potencjalnie nieograniczony</td>
          </tr>
        </tbody>
      </table>

      <h2>Jak inwestować w obligacje — opcje dla początkującego</h2>
      <p>
        Możesz kupować obligacje bezpośrednio (na rynku pierwotnym lub
        wtórnym) przez rachunek maklerski albo wejść do obligacji bardziej
        pasywnie przez fundusz obligacyjny lub ETF. Fundusze oferują
        dywersyfikację i zarządzanie profesjonalne, ale mają opłaty.
      </p>

      <p>
        Jeśli chceszdowiedzieć się więcej o kontakch maklerskich, zobacz artykuł:
        {" "}
        <a href="/articles/brokerage-account" className="article-link">
          Konto maklerskie
        </a>
      </p>

      <p>
        Jeśli chcesz poznać prostszą alternatywę, zobacz artykuł:
        {" "}
        <a href="/articles/etf-funds" className="article-link">
          Czym są fundusze ETF?
        </a>
      </p>

      <h2>Strategie</h2>
      <div className="article-box article-box--pros">
        <ul>
          <li>
            <strong>Buy &amp; hold:</strong> trzymasz obligację do wykupu — mniej
            pracy, przewidywalne odsetki.
          </li>
          <li>
            <strong>Handel na rynku wtórnym:</strong> możesz zarabiać na zmianach
            cen, ale wymaga to wiedzy i aktywności.
          </li>
        </ul>
      </div>

      <h2>Dostępność i jak kupić obligacje skarbowe (przykład Polski)</h2>
      <p>
        W Polsce obligacje skarbowe można kupić m.in. przez serwis
        <strong> obligacjeskarbowe.pl</strong>, przez banki (np. PKO BP, Pekao)
        oraz w wybranych punktach sprzedaży. Niektóre obligacje rodzinne są
        dostępne tylko w oddziałach banku.
      </p>

      <h2>Aktualna oferta oszczędnościowych obligacji skarbowych — styczeń 2026 r.</h2>
      <p className="muted">(dane informacyjne — oferta sprzedaży i zamiany)</p>

      <table className="article-table article-table--bonds">
        <caption>Oferta oszczędnościowych obligacji skarbowych - styczeń 2026 r.</caption>
        <thead>
          <tr>
            <th>Typ obligacji</th>
            <th>Zapadalność / krótki opis</th>
            <th>Oprocentowanie (pierwszy okres)</th>
            <th>Cena sprzedaży</th>
            <th>Cena przy zamianie</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OTS0426</td>
            <td>3‑miesięczne — stałe 2,50% rocznie; odsetki po 3 miesiącach</td>
            <td>2,50%</td>
            <td>100,00 zł</td>
            <td>100,00 zł przy zamianie</td>
          </tr>
          <tr>
            <td>ROR0127</td>
            <td>1‑roczne — zmienne; pierwszy miesiąc 4,25% (płacone co miesiąc)</td>
            <td>4,25% (miesiąc 1)</td>
            <td>100,00 zł</td>
            <td>99,90 zł przy zamianie</td>
          </tr>
          <tr>
            <td>DOR0128</td>
            <td>2‑letnie — zmienne; pierwszy miesiąc 4,40%; odsetki co miesiąc</td>
            <td>4,40% (miesiąc 1)</td>
            <td>100,00 zł</td>
            <td>99,90 zł przy zamianie</td>
          </tr>
          <tr>
            <td>TOS0129</td>
            <td>3‑letnie — stałe 4,65% rocznie; kapitalizacja roczna</td>
            <td>4,65%</td>
            <td>100,00 zł</td>
            <td>99,90 zł przy zamianie</td>
          </tr>
          <tr>
            <td>COI0130</td>
            <td>4‑letnie — indeksowane do inflacji; pierwszy rok 5,00%</td>
            <td>5,00% (rok 1)</td>
            <td>100,00 zł</td>
            <td>99,90 zł przy zamianie</td>
          </tr>
          <tr>
            <td>EDO0136</td>
            <td>10‑letnie — indeksowane do inflacji; pierwszy rok 5,60%</td>
            <td>5,60% (rok 1)</td>
            <td>100,00 zł</td>
            <td>99,90 zł przy zamianie</td>
          </tr>
          <tr>
            <td>ROS0132</td>
            <td>6‑letnie (rodzinne) — preferencyjne; pierwszy rok 5,20%</td>
            <td>5,20% (rok 1)</td>
            <td>100,00 zł</td>
            <td>—</td>
          </tr>
          <tr>
            <td>ROD0138</td>
            <td>12‑letnie (rodzinne) — preferencyjne; pierwszy rok 5,85%</td>
            <td>5,85% (rok 1)</td>
            <td>100,00 zł</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>

      <p>
        <small>
          * Oprocentowanie indeksowane do inflacji = stopa wzrostu cen towarów i
          usług konsumpcyjnych (GUS) + marża.
        </small>
      </p>

      <h2>Podsumowanie — dla kogo obligacje?</h2>
      <p>
        Obligacje to dobry wybór, gdy chcesz mniejszego ryzyka i regularnych
        wypłat, albo gdy budujesz podstawę portfela konserwatywnego. Dla osób
        młodszych i skłonnych do większego ryzyka część portfela warto przeznaczyć
        na akcje — ale obligacje świetnie uzupełniają taką strategię.
      </p>
    </>
  );
}
