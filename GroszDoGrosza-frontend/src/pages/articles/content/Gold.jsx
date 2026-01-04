import GoldPicture from '../../../assets/images/articles/gold.jpg'

export default function Gold() {
  return (
    <>
      <h1>Czy warto inwestować w złoto?</h1>
       
      <p>
        Złoto od tysięcy lat pełni funkcję środka przechowywania wartości i do dziś
        jest jedną z najczęściej rozważanych alternatywnych klas aktywów.
        Jednocześnie wokół inwestowania w złoto narosło wiele mitów – od
        „gwarantowanej ochrony przed inflacją” po „idealną przeciwwagę dla akcji
        w każdym kryzysie”.
      </p>

      <p>
        W tym artykule spojrzymy na złoto bez emocji: opierając się na danych
        historycznych, porównaniach z innymi klasami aktywów i realnym wpływie
        złota na portfel inwestycyjny.
      </p>

      <img
        className="article-image"
        src={GoldPicture}
        alt="Inwestowanie w złoto"
      />

      <h2>Czym jest inwestowanie w złoto?</h2>
      <p>
        Inwestowanie w złoto polega na lokowaniu kapitału w fizyczny kruszec lub
        instrumenty finansowe powiązane z jego ceną (ETF/ETC), z nadzieją na
        zachowanie wartości kapitału lub jego wzrost w długim terminie.
      </p>

      <div className="article-definition">
        <p>
          <strong>Złoto inwestycyjne</strong> – kruszec o wysokiej próbie
          (najczęściej 999), występujący w postaci sztabek, monet lub instrumentów
          finansowych.
        </p>
      </div>

      <h2>Jak złoto radziło sobie historycznie?</h2>
      <p>
        Od odejścia od standardu złota w 1971 roku cena złota w USD rosła średnio
        o około <strong>8% rocznie</strong>. To wynik porównywalny z wieloma
        indeksami akcji, ale okupiony znacznie większą zmiennością.
      </p>

      <p>
        Co istotne, złoto miało bardzo długie okresy strat lub stagnacji – nawet
        trwające <strong>9–28 lat</strong>. Oznacza to, że inwestor mógł przez
        dekady czekać na powrót ceny do poziomu zakupu.
      </p>

      <div className="article-box article-box--cons">
        <ul>
          <li>Złoto potrafi przez wiele lat nie dawać żadnego realnego zysku</li>
          <li>Obsunięcia kapitału bywają głębsze niż na rynku akcji</li>
        </ul>
      </div>

      <h2>Mity na temat złota</h2>

      <h3>Mit 1: Złoto zawsze chroni przed inflacją</h3>
      <p>
        W bardzo długim terminie złoto często utrzymuje siłę nabywczą pieniądza,
        ale nie oznacza to gwarancji. Inwestorzy, którzy kupili złoto na szczytach
        (np. w 1980 roku), przez dekady przegrywali z inflacją.
      </p>

      <h3>Mit 2: Złoto jest bezpieczne i mało zmienne</h3>
      <p>
        Historyczna zmienność złota była bliższa akcjom niż obligacjom.
        Odchylenie standardowe cen złota przekraczało <strong>19% </strong>
        rocznie, podczas gdy obligacje skarbowe były kilkukrotnie stabilniejsze.
      </p>

      <h3>Mit 3: Złoto zawsze ratuje portfel w kryzysie</h3>
      <p>
        Złoto czasem rośnie w kryzysach, ale czasem spada razem z akcjami. Jego
        zachowanie w trudnych momentach jest nieprzewidywalne i nie stanowi
        gwarantowanej „tarczy ochronnej”.
      </p>

      <h2>Złoto a inne klasy aktywów</h2>
      <p>
        Złoto nie wykazuje trwałej korelacji ani z akcjami, ani z obligacjami.
        Oznacza to, że porusza się w dużej mierze niezależnie, co może pomóc w
        dywersyfikacji portfela – ale nie zawsze poprawia jego stabilność.
      </p>

      <div className="article-definition">
        <p>
          Brak korelacji ≠ ochrona. Złoto może pomóc, ale nie zastąpi obligacji
          jako stabilizatora portfela.
        </p>
      </div>

      <h2>Ile złota warto mieć w portfelu?</h2>
      <p>
        Analizy historyczne pokazują, że niewielki udział złota
        (<strong>5–15%</strong>) może czasem poprawić relację zysku do ryzyka w
        portfelu akcji i obligacji. Większe udziały zwiększają zmienność i mogą
        prowadzić do długich okresów słabych wyników.
      </p>

      <p>
        Złoto nie jest dobrym zamiennikiem ani akcji, ani obligacji. Najlepiej
        traktować je jako <strong>dodatek</strong>, a nie fundament portfela.
      </p>

      <h2>Zalety i wady inwestowania w złoto</h2>

      <div className="article-box article-box--pros">
        <ul>
          <li>Dywersyfikacja portfela inwestycyjnego</li>
          <li>Ochrona kapitału w bardzo długim terminie</li>
          <li>Niezależność od systemu finansowego (złoto fizyczne)</li>
          <li>Potencjalne zyski w okresach kryzysowych</li>
        </ul>
      </div>

      <div className="article-box article-box--cons">
        <ul>
          <li>Wysoka zmienność cen</li>
          <li>Długie okresy strat lub stagnacji</li>
          <li>Koszty przechowywania i zabezpieczenia (złoto fizyczne)</li>
          <li>Ryzyko zakupu po zawyżonej cenie</li>
        </ul>
      </div>

      <h2>Podsumowanie – czy warto inwestować w złoto?</h2>
      <p>
        Złoto nie jest ani magiczną ochroną przed inflacją, ani idealnym
        stabilizatorem portfela. Może jednak pełnić rolę uzupełniającą – jako
        alternatywa wobec akcji i obligacji, szczególnie w okresach podwyższonej
        niepewności.
      </p>

      <p>
        Najrozsądniejsze podejście to traktowanie złota jako niewielkiego dodatku
        do dobrze zdywersyfikowanego portfela, a nie jako jego głównego filaru.
      </p>
    </>
  );
}
