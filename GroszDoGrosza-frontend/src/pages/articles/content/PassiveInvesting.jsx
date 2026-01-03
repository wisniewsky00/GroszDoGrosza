import WoodenBlocksPassivePicture from '../../../assets/images/articles/wooden-blocks-passive.jpeg'

export default function PassiveInvesting() {
  return (
    <>
      <h1>Inwestowanie pasywne – czym jest i czy warto?</h1>

      <p>
        Nie masz czasu na codzienne śledzenie rynku? Inwestowanie pasywne to
        rozwiązanie dla inwestorów preferujących długoterminową perspektywę
        rynkową przy minimalnym zaangażowaniu czasowym.
      </p>

      <p>
        Dochód pasywny jest czymś, o czym marzysz? Inwestowanie pasywne może
        zapewnić regularne wpływy w postaci dywidend oraz potencjał
        długoterminowego wzrostu kapitału.
      </p>

      <div className="article-definition">
        <p>
          <strong>Dywidenda</strong> – pieniądze, które firma może wypłacać
          swoim właścicielom (inwestorom) z wypracowanego zysku.
        </p>
        <p>
          <strong>Kapitał</strong> – pieniądze, które inwestujesz z myślą,
          że z czasem będą warte więcej niż dziś.
        </p>
      </div>

      <img
        className="article-image"
        src={WoodenBlocksPassivePicture}
        alt="Aktywne i pasywne inwestowanie"
      />

      <h2>Czym jest inwestowanie pasywne?</h2>

      <p>
        Inwestowanie pasywne polega na długoterminowym utrzymywaniu aktywów inwestycyjnych (np. <strong>akcje, złoto</strong>)
        bez konieczności częstego reagowania na krótkoterminowe wahania rynku (spadek/wzrost cen).
        Inwestor pasywny nie próbuje „pokonać rynku”, lecz do niego dołącza.
      </p>

      <p>
        Najczęściej realizuje się to poprzez inwestowanie w fundusze indeksowe
        lub ETF-y, które odwzorowują zachowanie całych rynków lub sektorów,
        takich jak S&amp;P 500 czy WIG20.
      </p>

      <div className="article-definition">
        <p>
          <strong>S&amp;P 500</strong> – indeks pokazujący, jak radzi sobie
          500 największych firm notowanych w Stanach Zjednoczonych.
        </p>
        <p>
          <strong>WIG20</strong> – indeks obejmujący 20 największych spółek
          notowanych na Giełdzie Papierów Wartościowych w Warszawie.
        </p>
        <p>
          <strong>Fundusz indeksowy</strong> – to fundusz, który naśladuje
          zachowanie wybranego indeksu (np. S&amp;P 500 lub WIG20), zamiast
          próbować wybierać „najlepsze” spółki.
        </p>
        <p>
          Jeśli chcesz dowiedzieć się więcej, zobacz artykuł:
          {" "}
          <a href="/articles/etf-funds" className="article-link">
            Czym są fundusze ETF?
          </a>
        </p>
      </div>

      <h2>Dlaczego inwestowanie pasywne zyskuje na popularności?</h2>

      <p>
        Podejście pasywne zyskało popularność m.in. dzięki takim inwestorom jak
        Warren Buffett, Peter Lynch czy John C. Bogle. To właśnie Bogle
        zapoczątkował rewolucję funduszy indeksowych, umożliwiając inwestorom
        detalicznym tani i prosty dostęp do rynków finansowych.
      </p>

      <p>
        Ograniczenie liczby transakcji oznacza niższe koszty oraz mniejszą
        zmienność wyników. Choć inwestowanie pasywne rzadko prowadzi do
        ponadprzeciętnych zysków, oferuje stabilność i przewidywalność.
      </p>

      <h2>Zalety inwestowania pasywnego</h2>

      <div className="article-box article-box--pros">
        <ul>
          <li>Możliwość uzyskania rynkowej stopy zwrotu</li>
          <li>Niskie koszty inwestowania</li>
          <li>Oszczędność czasu i energii</li>
          <li>Szeroka dywersyfikacja (np. ETF na S&P 500)</li>
          <li>Niższa zmienność i ryzyko inwestycyjne</li>
          <li>Korzyści z długoterminowych trendów wzrostowych</li>
        </ul>
      </div>

      <h2>Wady inwestowania pasywnego</h2>

      <div className="article-box article-box--cons">
        <ul>
          <li>Niska szansa na ponadprzeciętne zyski</li>
          <li>
            Spadki wartości inwestycji w okresach, gdy rynek przez dłuższy czas traci
            na wartości
          </li>
          <li>Ryzyko niedokładnego odwzorowania indeksu</li>
          <li>Ograniczona elastyczność w zmieniających się warunkach rynkowych</li>
          <li>Zależność od dostawców funduszy i ETF-ów</li>
        </ul>
      </div>

      <h2>Strategia „kup i trzymaj”</h2>

      <p>
        Inwestowanie pasywne często opiera się na strategii „kup i trzymaj”.
        Polega ona na długoterminowym utrzymywaniu aktywów, niezależnie od
        krótkoterminowych spadków czy wzrostów rynku.
      </p>

      <p>
        Historia pokazuje, że w długim terminie rynki kapitałowe osiągają
        dodatnie stopy zwrotu, co sprawia, że cierpliwość jest jednym z
        kluczowych elementów tej strategii.
      </p>

      <h2>Czy inwestowanie pasywne jest dla Ciebie?</h2>

      <p>
        Inwestowanie pasywne sprawdzi się szczególnie u osób, które nie chcą
        poświęcać wielu godzin na analizę rynku, a jednocześnie chcą
        systematycznie budować kapitał w długim terminie.
      </p>

      <p>
        Nic nie stoi jednak na przeszkodzie, aby łączyć inwestowanie pasywne
        z aktywnym – wielu inwestorów z powodzeniem stosuje podejście
        hybrydowe.
      </p>
    </>
  );
}
