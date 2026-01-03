import StockMarketVolatilityChart from '../../../assets/images/articles/stock-market-volatility-chart.jpg';

export default function Speculation() {
  return (
    <>
      <h1>Spekulacje – czym różnią się od inwestowania?</h1>

      <p>
        Spekulacja to podejście, w którym celem jest szybki zysk wynikający
        ze zmiany ceny danego aktywa, a nie jego długoterminowej wartości.
      </p>

      <p>
        Osoba spekulująca kupuje aktywo z nadzieją, że w krótkim czasie
        będzie mogła sprzedać je drożej. Równie szybko może jednak ponieść stratę.
      </p>

      <img
        className="article-image"
        src={StockMarketVolatilityChart}
        alt="Duże wahania cen na rynku finansowym"
      />

      <h2>Na czym polega spekulacja w praktyce?</h2>

      <p>
        W spekulacji najważniejszy jest <strong>moment</strong> zakupu
        i sprzedaży. Liczy się cena oraz to, jak zachowa się rynek
        w krótkim czasie — za kilka godzin, dni lub tygodni.
      </p>

      <p>
        Spekulant nie musi wierzyć w przyszłość firmy czy rynku.
        Wystarczy, że liczy na szybki ruch ceny.
      </p>

      <div className="article-definition">
        <p>
          <strong>Spekulacja</strong> – próba zarobienia na krótkoterminowych
          zmianach cen, przy akceptacji wysokiego ryzyka.
        </p>
      </div>

      <h2>Zalety spekulacji</h2>

      <div className="article-box article-box--pros">
        <ul>
          <li>Możliwość szybkiego zysku</li>
          <li>Duża dynamika i „akcja” na rynku</li>
          <li>Nie wymaga długiego zamrażania kapitału</li>
        </ul>
      </div>

      <h2>Wady spekulacji</h2>

      <div className="article-box article-box--cons">
        <ul>
          <li>Wysokie ryzyko straty pieniędzy</li>
          <li>Duży stres i presja emocjonalna</li>
          <li>Konieczność częstego obserwowania rynku</li>
          <li>Trudność w długoterminowym osiąganiu zysków</li>
        </ul>
      </div>

      <h2>Czym spekulacja różni się od inwestowania?</h2>

      <p>
        Główna różnica polega na horyzoncie czasowym i podejściu do ryzyka.
      </p>

      <ul>
        <li>
          <strong>Inwestowanie</strong> skupia się na długim terminie
          i stopniowym budowaniu wartości.
        </li>
        <li>
          <strong>Spekulacja</strong> koncentruje się na krótkim terminie
          i szybkich zmianach cen.
        </li>
      </ul>

      <p>
        Spekulacja nie jest zła sama w sobie, ale nie jest też
        odpowiednia dla każdego — szczególnie na początku drogi
        z rynkiem finansowym.
      </p>

      <h2>Dla kogo spekulacja?</h2>

      <p>
        Spekulacja może zainteresować osoby, które:
      </p>

      <ul>
        <li>dobrze radzą sobie ze stresem</li>
        <li>akceptują możliwość szybkiej straty</li>
        <li>mają czas na częste śledzenie rynku</li>
      </ul>

      <p>
        Dla większości początkujących inwestorów bezpieczniejszym
        punktem startowym jest jednak inwestowanie pasywne
        lub długoterminowe inwestowanie aktywne.
      </p>
    </>
  );
}
