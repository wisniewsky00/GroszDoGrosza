import EtfIllustration from '../../../assets/images/articles/etf-wooden-blocks.png';

export default function EtfFunds() {
  return (
    <>
      <h1>Fundusze ETF – czym są i jak w nie inwestować?</h1>

      <p>
        Fundusze ETF (Exchange Traded Funds) to jedna z najprostszych i
        najtańszych form inwestowania dostępnych dla inwestorów indywidualnych.
        Pozwalają inwestować w całe rynki, branże lub klasy aktywów bez
        konieczności samodzielnego wyboru pojedynczych spółek.
      </p>

      <p>
        Jeśli dopiero zaczynasz inwestować i szukasz rozwiązania, które nie
        wymaga codziennego śledzenia wykresów, ETF-y mogą być bardzo dobrym
        wyborem.
      </p>

      <div className="article-definition">
        <p>
          <strong>ETF (Exchange Traded Fund)</strong> – fundusz inwestycyjny
          notowany na giełdzie, który można kupić i sprzedać tak jak akcję.
        </p>
        <p>
          <strong>Indeks giełdowy</strong> – wskaźnik pokazujący, jak zachowuje
          się określona grupa instrumentów finansowych (np. spółek).
        </p>
      </div>

      <img
        className="article-image"
        src={EtfIllustration}
        alt="Fundusze ETF – inwestowanie pasywne"
      />

      <h2>Czym są fundusze ETF?</h2>

      <p>
        ETF to fundusz, którego celem jest najczęściej odwzorowanie zachowania
        wybranego indeksu giełdowego, takiego jak <strong>S&amp;P 500</strong>,
        <strong> MSCI World</strong> czy <strong>WIG20</strong>.
      </p>

      <p>
        Kupując jednostkę ETF, inwestujesz jednocześnie w wiele spółek lub
        instrumentów finansowych. Dzięki temu ETF-y zapewniają
        <strong> automatyczną dywersyfikację</strong>.
      </p>

      <div className="article-definition">
        <p>
          <strong>Dywersyfikacja</strong> – rozłożenie kapitału na wiele
          inwestycji w celu zmniejszenia ryzyka.
        </p>
        <p>
          <strong>WIG20</strong> – indeks obejmujący 20 największych spółek
          notowanych na Giełdzie Papierów Wartościowych w Warszawie.
        </p>
      </div>

      <h2>Jak działa ETF?</h2>

      <p>
        Wyobraź sobie koszyk z różnymi zabawkami. W koszyku są klocki, samochodziki
        i figurki. Zamiast kupować każdą zabawkę osobno, kupujesz cały koszyk
        naraz.
      </p>

      <p>
        <strong>ETF działa dokładnie tak samo</strong>. Zamiast kupować pojedyncze
        akcje wielu firm, kupujesz jeden „koszyk”, w którym są już te akcje.
      </p>

      <p>
        To, że ETF jest notowany na giełdzie, oznacza tylko jedno:
        <strong> możesz go kupić i sprzedać w każdej chwili podczas sesji giełdowej</strong>,
        tak samo jak zwykłą akcję.
      </p>

      <p>
        Nie kupujesz prawdziwego koszyka, tylko <strong>udział w koszyku</strong>,
        czyli mały kawałek całego ETF-a.
        Cena tego udziału zmienia się w ciągu dnia, bo zmienia się wartość rzeczy,
        które są w koszyku.
      </p>

      <p>
        Cały proces wygląda bardzo prosto:
      </p>

      <ol>
        <li>Ktoś tworzy ETF (czyli koszyk z inwestycjami).</li>
        <li>Koszyk trafia na giełdę.</li>
        <li>Ty kupujesz jeden „udział” w tym koszyku.</li>
        <li>Wartość koszyka rośnie lub spada razem z rynkiem.</li>
      </ol>

      <p>
        Jeśli firmy znajdujące się w ETF-ie radzą sobie dobrze, cena ETF rośnie.
        Jeśli radzą sobie gorzej – cena spada.
      </p>

      <p>
        Nie musisz nic liczyć ani pilnować – wszystko dzieje się automatycznie.
      </p>

      <p className="muted">
        Choć słowo „giełda” może brzmieć skomplikowanie, w praktyce ETF jest jednym
        z najprostszych produktów inwestycyjnych. Kupujesz jeden produkt i masz
        ekspozycję na cały rynek.
      </p>

      <h2>ETF a inwestowanie pasywne</h2>

      <p>
        Większość ETF-ów to fundusze <strong>pasywne</strong>. Ich celem nie jest
        pokonanie rynku, lecz jak najwierniejsze odwzorowanie jego zachowania.
      </p>

      <p>
        Jeśli chcesz dowiedzieć się więcej o tym podejściu, zobacz artykuł:
        {' '}
        <a href="/articles/passive-investing" className="article-link">
          Inwestowanie pasywne – czym jest i czy warto?
        </a>
      </p>

      <h2>Fundusze ETF a fundusze inwestycyjne – czym się różnią?</h2>

      <p>
        Wiele osób, które chcą zacząć inwestować, zastanawia się, czy lepszym
        wyborem będą fundusze ETF, czy tradycyjne fundusze inwestycyjne oferowane
        np. przez banki lub TFI. Choć oba rozwiązania pozwalają inwestować w
        zdywersyfikowany portfel aktywów, różnią się między sobą w kilku
        kluczowych aspektach.
      </p>

      <table className="article-table">
        <thead>
          <tr>
            <th>Cecha</th>
            <th>Fundusze ETF</th>
            <th>Fundusze inwestycyjne (TFI)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sposób zakupu i sprzedaży</td>
            <td>Kupowane i sprzedawane na giełdzie w czasie rzeczywistym</td>
            <td>Transakcje realizowane raz dziennie po wycenie</td>
          </tr>
          <tr>
            <td>Dywersyfikacja</td>
            <td>Szeroka – często setki lub tysiące spółek</td>
            <td>Zwykle węższa, zależna od strategii funduszu</td>
          </tr>
          <tr>
            <td>Koszty</td>
            <td>Zazwyczaj niskie (pasywne zarządzanie)</td>
            <td>Często wysokie (aktywne zarządzanie)</td>
          </tr>
          <tr>
            <td>Zarządzanie</td>
            <td>Pasywne – odwzorowanie indeksu</td>
            <td>Aktywne – decyzje zarządzającego</td>
          </tr>
          <tr>
            <td>Przejrzystość</td>
            <td>Wysoka – skład ETF znany na bieżąco</td>
            <td>Ograniczona – skład publikowany rzadziej</td>
          </tr>
        </tbody>
      </table>

      <p className="muted">
        Oba rozwiązania mają swoje zalety i wady. Fundusze ETF są zwykle tańsze i
        prostsze, natomiast tradycyjne fundusze inwestycyjne mogą odpowiadać
        osobom, które wolą oddać decyzje w ręce zarządzającego.
      </p>


      <h2>Zalety funduszy ETF</h2>

      <div className="article-box article-box--pros">
        <ul>
          <li>Niskie koszty inwestowania</li>
          <li>Szeroka dywersyfikacja portfela</li>
          <li>Prostota i przejrzystość</li>
          <li>Łatwy zakup i sprzedaż przez konto maklerskie</li>
          <li>Dobre rozwiązanie dla inwestorów długoterminowych</li>
        </ul>
      </div>

      <h2>Wady funduszy ETF</h2>

      <div className="article-box article-box--cons">
        <ul>
          <li>Brak szansy na „pobicie rynku”</li>
          <li>Spadki wartości inwestycji w okresach, gdy rynek przez dłuższy czas traci
            na wartości</li>
          <li>Ryzyko walutowe przy ETF-ach zagranicznych</li>
          <li>Prowizje maklerskie przy częstych transakcjach</li>
        </ul>
      </div>

      <h2>ETF akumulacyjny i dystrybucyjny</h2>

      <p>
        ETF-y mogą różnić się sposobem traktowania dywidend:
      </p>

      <ul>
        <li>
          <strong>ETF akumulacyjny (Acc)</strong> – reinwestuje dywidendy
          automatycznie w funduszu.
        </li>
        <li>
          <strong>ETF dystrybucyjny (Dis)</strong> – wypłaca dywidendy
          inwestorowi.
        </li>
      </ul>

      <p>
        Dla początkujących inwestorów długoterminowych ETF-y akumulacyjne są
        często prostsze pod względem podatkowym.
      </p>

      <h2>Czy ETF-y są dla Ciebie?</h2>

      <p>
        Fundusze ETF sprawdzą się szczególnie u osób, które chcą inwestować
        długoterminowo, nie poświęcając wielu godzin na analizę rynku.
      </p>

      <p>
        Mogą one stanowić podstawę portfela inwestycyjnego lub być elementem
        szerszej strategii inwestycyjnej.
      </p>
    </>
  );
}
