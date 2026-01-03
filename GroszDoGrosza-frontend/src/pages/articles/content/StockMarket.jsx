import StockPicture from '../../../assets/images/articles/stock-market.jpg'

export default function StockMarket() {
  return (
    <>
      <h1>Czym jest giełda i jak na niej inwestować?</h1>

      <p>
        Giełda papierów wartościowych to nie kasyno ani gra losowa. To
        zorganizowany rynek, na którym inwestorzy mogą legalnie i świadomie
        pomnażać kapitał, inwestując w akcje, obligacje czy fundusze ETF.
      </p>

      <p>
        Choć krótkoterminowe wahania cen mogą przypominać chaos, długoterminowo
        giełda opiera się na realnej wartości spółek, wynikach finansowych i
        rozwoju gospodarki. W tym artykule wyjaśniamy, jak działa giełda, jak
        można na niej zarabiać i na co powinien uważać początkujący inwestor.
      </p>

      <img
        className="article-image"
        src={StockPicture}
        alt="Inwestowanie na giełdzie"
      />

      <h2>Co to jest giełda papierów wartościowych?</h2>
      <p>
        Giełda papierów wartościowych to zorganizowany rynek, na którym dochodzi
        do obrotu instrumentami finansowymi – przede wszystkim akcjami,
        obligacjami i funduszami ETF.
      </p>

      <div className="article-definition">
        <p>
          <strong>Giełda</strong> – rynek, na którym inwestorzy kupują i sprzedają
          instrumenty finansowe, a ceny kształtowane są przez popyt i podaż.
        </p>
      </div>

      <p>
        W Polsce głównym rynkiem kapitałowym jest Giełda Papierów Wartościowych w
        Warszawie (GPW), działająca od 1991 roku i nadzorowana przez Komisję
        Nadzoru Finansowego (KNF).
      </p>

      <h2>Jak działa giełda?</h2>
      <p>
        Mechanizm giełdy jest prosty: jedna strona chce sprzedać instrument po
        określonej cenie, druga chce go kupić. Gdy ceny się spotkają – dochodzi
        do transakcji.
      </p>

      <ul>
        <li>Spółki pozyskują kapitał, emitując akcje (np. w ramach IPO)</li>
        <li>Inwestorzy kupują i sprzedają akcje między sobą</li>
        <li>Cena akcji zmienia się w zależności od popytu i podaży</li>
      </ul>

      <h3>Rodzaje zleceń</h3>
      <ul>
        <li>Zlecenie z limitem ceny – kupno lub sprzedaż po określonej cenie</li>
        <li>Zlecenie rynkowe – realizowane po aktualnej cenie rynkowej</li>
      </ul>

      <p>
        Kursy akcji zmieniają się w czasie rzeczywistym, reagując na wyniki
        finansowe spółek, sytuację gospodarczą oraz nastroje inwestorów.
      </p>

      <h2>Jak zarabia się na giełdzie?</h2>
      <p>
        Inwestorzy mogą osiągać zyski na giełdzie na kilka sposobów:
      </p>

      <ul>
        <li>
          <strong>Wzrost wartości akcji</strong> – kupno taniej i sprzedaż drożej
        </li>
        <li>
          <strong>Dywidendy</strong> – regularne wypłaty zysków przez spółki
        </li>
        <li>
          <strong>ETF-y</strong> – inwestowanie w całe indeksy rynkowe
        </li>
        <li>
          <strong>Spekulacja krótkoterminowa</strong> – handel krótkoterminowy
        </li>
      </ul>

      <h2>Ile pieniędzy potrzeba na start?</h2>
      <p>
        Wbrew powszechnym mitom, inwestowanie na giełdzie nie wymaga dużego
        kapitału. Konto maklerskie można założyć już od kilkuset złotych.
      </p>

      <div className="article-box article-box--pros">
        <ul>
          <li>Niski próg wejścia</li>
          <li>Dostęp do ETF-ów i funduszy indeksowych</li>
          <li>Możliwość regularnego inwestowania małych kwot</li>
        </ul>
      </div>

      <h2>Ryzyko inwestowania na giełdzie</h2>
      <div className="article-box article-box--cons">
        <ul>
          <li>Zmienność cen w krótkim terminie</li>
          <li>Ryzyko strat kapitału</li>
          <li>Błędy emocjonalne inwestorów</li>
        </ul>
      </div>

      <p>
        Największym błędem początkujących jest brak planu inwestycyjnego oraz
        podejmowanie decyzji pod wpływem emocji – strachu i chciwości.
      </p>

      <h2>Giełda a inne formy inwestowania</h2>
      <p>
        W porównaniu z lokatami bankowymi giełda oferuje wyższy potencjał
        długoterminowych zysków. W odróżnieniu od nieruchomości wymaga znacznie
        mniejszego kapitału początkowego i zapewnia wysoką płynność.
      </p>

      <h2>Czy warto inwestować na giełdzie?</h2>
      <p>
        Giełda to jedno z najlepszych narzędzi budowania kapitału w długim
        terminie. Nie gwarantuje szybkich zysków, ale daje możliwość realnego
        pomnażania oszczędności przy rozsądnym podejściu i cierpliwości.
      </p>

      <p>
        Dla większości inwestorów giełda powinna stanowić fundament portfela,
        uzupełniany przez akcje, obligacje, złoto czy aktywa alternatywne.
      </p>
    </>
  );
}
