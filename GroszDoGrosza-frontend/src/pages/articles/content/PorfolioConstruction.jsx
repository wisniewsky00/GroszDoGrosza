import PortfolioConstructionPicture from '../../../assets/images/articles/portfolio-construction.jpg';
import DashboardPicture from '../../../assets/images/articles/dashboard.png';
import EmptyPortfoliosPicture from '../../../assets/images/articles/empty-portfolios.png';
import AddModelWeightsPicture from '../../../assets/images/articles/add-model-weights.jpg';
import ModelWeightsPicture from '../../../assets/images/articles/model-weights.jpg';
import AddTransactionPicture from '../../../assets/images/articles/add-transaction.jpg';
import AddStocksPicture from '../../../assets/images/articles/add-stocks.jpg';
import AddBondsPicture from '../../../assets/images/articles/add-bonds.jpg';
import ActualWeightsChartPicture from '../../../assets/images/articles/actual-weights-chart.jpg';
import PortfolioValueChartPicture from '../../../assets/images/articles/portfolio-value-chart.jpg';
import TransactionsTablePicture from '../../../assets/images/articles/transactions-table.jpg';

export default function PortfolioConstruction() {
  return (
    <>
      <h1>Budowa portfela inwestycyjnego</h1>

      <p>
        Budowa portfela inwestycyjnego to jeden z najważniejszych kroków na drodze
        do świadomego inwestowania. Dobrze zaprojektowany portfel pozwala
        ograniczyć ryzyko, uporządkować decyzje inwestycyjne i zwiększyć szanse
        na długoterminowy sukces.
      </p>

      <p>
        W tym artykule pokażemy przykładowe portfele dla początkujących
        inwestorów oraz krok po kroku wyjaśnimy, jak korzystać z narzędzia
        do śledzenia inwestycji dostępnego w aplikacji.
      </p>

      <img
        className="article-image"
        src={PortfolioConstructionPicture}
        alt="Budowa portfela inwestycyjnego"
      />

      <h2>Czym jest portfel inwestycyjny?</h2>

      <p>
        Portfel inwestycyjny to zestaw różnych aktywów finansowych, takich jak
        akcje, obligacje, złoto czy nieruchomości, dobranych w określonych
        proporcjach. Jego celem jest osiągnięcie oczekiwanego zysku przy
        akceptowalnym poziomie ryzyka.
      </p>

      <div className="article-definition">
        <p>
          <strong>Dywersyfikacja</strong> – rozłożenie kapitału pomiędzy różne
          klasy aktywów w celu ograniczenia ryzyka.
        </p>
        <p>
          <strong>Profil ryzyka</strong> – indywidualna skłonność inwestora do
          akceptowania wahań wartości inwestycji.
        </p>
      </div>

      <h2>Co znajdziesz w tym artykule?</h2>

      <ul>
        <li>Przykładowe portfele inwestycyjne dla początkujących</li>
        <li>Omówienie roli poszczególnych klas aktywów</li>
        <li>Instrukcję korzystania z narzędzia do śledzenia inwestycji</li>
        <li>Praktyczne wskazówki dotyczące zarządzania portfelem</li>
      </ul>

      <h2>Przykładowy portfel nr 1: jeden ETF na cały świat</h2>

      <p>
        Jednym z najprostszych sposobów budowy portfela inwestycyjnego jest
        wykorzystanie jednego funduszu ETF, który zawiera w sobie zarówno akcje,
        jak i obligacje z całego świata. Takie rozwiązanie pozwala na uzyskanie
        szerokiej dywersyfikacji bez konieczności samodzielnego dobierania wielu
        instrumentów.
      </p>

      <p>
        Przykładem takiego funduszu jest{" "}
        <strong>Vanguard LifeStrategy 60% Equity UCITS ETF Accumulating</strong>,
        notowany pod tickerem <strong>V60A</strong> (ISIN:{" "}
        <strong>IE00BMVB5P51</strong>).
      </p>

      <div className="article-definition">
        <p>
          <strong>Vanguard LifeStrategy 60%</strong> – fundusz ETF, który inwestuje
          około 60% środków w globalne rynki akcji, a pozostałe 40% w obligacje.
          Proporcje te są utrzymywane automatycznie przez emitenta funduszu.
        </p>
      </div>

      <p>
        Dzięki temu inwestor nie musi samodzielnie dbać o rebalansowanie portfela
        ani podejmować decyzji o zmianie proporcji pomiędzy akcjami a obligacjami.
        Cała struktura portfela jest zarządzana w ramach jednego instrumentu.
      </p>

      <h3>Zalety takiego portfela</h3>

      <div className="article-box article-box--pros">
        <ul>
          <li>Bardzo duża prostota – tylko jeden instrument w portfelu</li>
          <li>Automatyczna dywersyfikacja pomiędzy akcje i obligacje</li>
          <li>Brak konieczności samodzielnego rebalansowania</li>
          <li>Minimalne zaangażowanie czasowe inwestora</li>
          <li>Łatwy start nawet z niewielkim kapitałem</li>
        </ul>
      </div>

      <h3>Wady i ryzyka</h3>

      <div className="article-box article-box--cons">
        <ul>
          <li>
            Ryzyko walutowe – fundusz inwestuje w aktywa notowane w różnych walutach,
            co może powodować krótkoterminowe wahania wartości
          </li>
          <li>Brak możliwości samodzielnej kontroli proporcji aktywów</li>
          <li>Mniejsza elastyczność w dostosowaniu portfela do indywidualnych preferencji</li>
        </ul>
      </div>

      <p>
        Ryzyko walutowe może być szczególnie odczuwalne dla inwestorów
        krótkoterminowych. W długim horyzoncie czasowym wpływ wahań kursów walut
        zwykle ulega jednak zmniejszeniu.
      </p>

      <p>
        Tego typu portfel jest szczególnie dobrze dopasowany do inwestorów
        długoterminowych, którzy:
      </p>

      <ul>
        <li>nie mają czasu ani chęci na aktywne zarządzanie portfelem</li>
        <li>planują inwestować regularnie i spokojnie</li>
        <li>nie będą potrzebować zainwestowanych środków przez co najmniej 15 lat</li>
        <li>chcą rozpocząć inwestowanie bez skomplikowanej analizy rynku</li>
      </ul>

      <p>
        Jeśli zależy Ci na niemal całkowicie bezobsługowym rozwiązaniu i akceptujesz
        krótkoterminowe wahania wartości inwestycji, taki portfel może być bardzo
        dobrym punktem startowym.
      </p>


      <h2>Przykładowy portfel nr 2: globalne akcje i polskie obligacje oszczędnościowe</h2>

      <p>
        Drugim przykładem portfela dla początkujących jest połączenie globalnych
        rynków akcji z polskimi obligacjami oszczędnościowymi. Takie podejście
        pozwala na zachowanie szerokiej dywersyfikacji akcyjnej przy jednoczesnym
        ograniczeniu ryzyka walutowego w części obligacyjnej.
      </p>

      <p>
        Część akcyjna może być zrealizowana za pomocą{" "}
        <strong>iShares MSCI ACWI UCITS ETF</strong>, notowanego pod tickerami{" "}
        <strong>ISAC</strong> lub <strong>IUSQ</strong> (ISIN:{" "}
        <strong>IE00B6R52259</strong>). Fundusz ten zapewnia ekspozycję na rynki
        akcji zarówno krajów rozwiniętych, jak i wschodzących.
      </p>

      <div className="article-definition">
        <p>
          <strong>MSCI ACWI</strong> – globalny indeks obejmujący spółki z rynków
          rozwiniętych oraz wschodzących, reprezentujący znaczną część światowej
          kapitalizacji rynkowej.
        </p>
      </div>

      <p>
        Część obligacyjna portfela może zostać zbudowana w oparciu o{" "}
        <strong>10-letnie obligacje oszczędnościowe EDO</strong>, emitowane przez
        Skarb Państwa. Obligacje te są denominowane w złotówkach i oferują ochronę
        kapitału przed inflacją w długim terminie.
      </p>

      <p>
        Przykładowa proporcja portfela:
      </p>

      <ul>
        <li><strong>60%</strong> – globalne akcje (ETF MSCI ACWI)</li>
        <li><strong>40%</strong> – obligacje oszczędnościowe EDO</li>
      </ul>

      <h3>Zalety takiego portfela</h3>

      <div className="article-box article-box--pros">
        <ul>
          <li>Niższa zmienność portfela w porównaniu do portfela opartego na jednym ETF-ie</li>
          <li>Ograniczone ryzyko walutowe w części obligacyjnej</li>
          <li>Większa kontrola nad strukturą portfela</li>
          <li>Lepsze dopasowanie do konkretnych celów inwestycyjnych</li>
          <li>Możliwość elastycznego zarządzania proporcjami aktywów</li>
        </ul>
      </div>

      <h3>Wady i ograniczenia</h3>

      <div className="article-box article-box--cons">
        <ul>
          <li>Konieczność posiadania co najmniej dwóch różnych kont inwestycyjnych</li>
          <li>Brak automatycznego rebalansowania – inwestor musi robić to samodzielnie</li>
          <li>Większe zaangażowanie czasowe niż w przypadku portfela nr 1</li>
          <li>Bardziej złożone zarządzanie portfelem</li>
        </ul>
      </div>

      <p>
        W porównaniu do portfela opartego na jednym funduszu ETF, to rozwiązanie
        charakteryzuje się niższą zmiennością oraz mniejszym wpływem wahań kursów
        walutowych. Jednocześnie wymaga od inwestora większej dyscypliny i
        regularnego monitorowania proporcji portfela.
      </p>

      <p>
        Taki portfel może być dobrym wyborem dla inwestorów, którzy:
      </p>

      <ul>
        <li>posiadają jasno określone cele inwestycyjne</li>
        <li>nie chcą zamrażać całego kapitału na okres 10 lat lub dłużej</li>
        <li>akceptują konieczność okresowego rebalansowania portfela</li>
        <li>chcą lepiej kontrolować ryzyko i strukturę inwestycji</li>
      </ul>

      <p>
        Choć portfel ten nadal dobrze sprawdzi się w inwestowaniu długoterminowym,
        jego prowadzenie wymaga zdecydowanie więcej uwagi i czasu niż portfel nr 1.
      </p>

      <h2>Instrukcja: jak korzystać z narzędzia do śledzenia inwestycji</h2>

      <h3>Krok 1: Logowanie i ekran startowy (dashboard)</h3>

      <p>
        Po zalogowaniu się do aplikacji użytkownik trafia na ekran startowy (dashboard).
        Jest to główne miejsce nawigacyjne, z którego można przejść do najważniejszych
        funkcji systemu.
      </p>

      <p>
        Na dashboardzie dostępne są m.in.:
      </p>

      <ul>
        <li>
          sekcja <strong>Artykuły</strong> – zawierająca materiały edukacyjne dotyczące inwestowania
        </li>
        <li>
          sekcja <strong>Portfele inwestycyjne</strong> – umożliwiająca tworzenie i zarządzanie
          własnymi portfelami
        </li>
      </ul>

      <p>
        Aby rozpocząć pracę z własnym portfelem inwestycyjnym, wybierz opcję
        <strong> Portfele inwestycyjne</strong>.
      </p>

      <img
        class="article-image"
        src={DashboardPicture}
        alt="Dashboard po zalogowaniu do aplikacji"
      />

      <h3>Krok 2: Lista portfeli inwestycyjnych</h3>

      <p>
        Po przejściu do sekcji portfeli inwestycyjnych wyświetlany jest widok z listą
        wszystkich utworzonych portfeli.
      </p>

      <p>
        Jeśli korzystasz z aplikacji po raz pierwszy i nie masz jeszcze żadnego
        portfela, zobaczysz informację zachęcającą do jego utworzenia.
      </p>

      <p>
        W takiej sytuacji kliknij przycisk <strong>„Utwórz portfel”</strong>, aby
        przejść do formularza tworzenia nowego portfela inwestycyjnego.
      </p>

      <img
        class="article-image"
        src={EmptyPortfoliosPicture}
        alt="Widok listy portfeli bez utworzonych portfeli"
      />

      <p>
        W kolejnych krokach utworzysz swój pierwszy portfel, określisz jego strukturę
        inwestycyjną oraz dodasz transakcje, które pozwolą śledzić rzeczywistą wartość
        portfela w czasie.
      </p>

      <h3>Krok 3: Dodanie wag modelowych portfela</h3>

      <p>
        Po utworzeniu portfela i przejściu do jego strony szczegółowej zobaczysz
        sekcję <strong>Skład portfela</strong>, podzieloną na dwie części:
      </p>

      <ul>
        <li><strong>Wagi modelowe</strong> – docelowa struktura portfela</li>
        <li><strong>Wagi rzeczywiste</strong> – faktyczny skład wynikający z dodanych transakcji</li>
      </ul>

      <p>
        Aby móc rejestrować transakcje i śledzić rzeczywisty skład portfela,
        w pierwszej kolejności należy zdefiniować <strong>wagi modelowe</strong>.
      </p>

      <p>
        W naszym przykładzie budujemy portfel składający się z akcji i obligacji
        w proporcji <strong>60/40</strong>.
      </p>

      <p>
        Kliknij przycisk <strong>„Dodaj wagi modelowe”</strong>, widoczny w sekcji
        wag modelowych.
      </p>

      <img
        class="article-image"
        src={AddModelWeightsPicture}
        alt="Sekcja wag modelowych z przyciskiem Dodaj wagi modelowe"
      />

      <p>
        Po kliknięciu przycisku otworzy się okno umożliwiające zdefiniowanie
        docelowych proporcji aktywów w portfelu. W kolejnym kroku przypiszemy
        odpowiednie wartości procentowe dla poszczególnych klas aktywów.
      </p>

      <h3>Krok 4: Ustawienie proporcji portfela (60% akcji / 40% obligacji)</h3>

      <p>
        Po kliknięciu przycisku <strong>„Dodaj wagi modelowe”</strong> otworzy się
        okno, w którym możesz zdefiniować docelową strukturę portfela.
      </p>

      <p>
        W tym przykładzie budujemy klasyczny portfel długoterminowy składający się
        z akcji i obligacji w proporcji <strong>60/40</strong>.
      </p>

      <p>
        W formularzu:
      </p>

      <ul>
        <li>
          wybierz <strong>Akcje</strong> jako pierwszy typ aktywa i przypisz mu wagę
          <strong>60%</strong>
        </li>
        <li>
          wybierz <strong>Obligacje skarbowe</strong> jako drugi typ aktywa i przypisz
          mu wagę <strong>40%</strong>
        </li>
      </ul>

      <p>
        System automatycznie sprawdza, czy suma wag wynosi <strong>100%</strong>.
        Dopiero po spełnieniu tego warunku możliwe jest zapisanie wag modelowych.
      </p>

      <img
        class="article-image"
        src={ModelWeightsPicture}
        alt="Ustawienie wag modelowych portfela 60% akcji i 40% obligacji"
      />

      <p>
        Po poprawnym ustawieniu wag kliknij przycisk
        <strong> „Zapisz wagi”</strong>.
        Od tego momentu zdefiniowana struktura stanie się punktem odniesienia
        dla całego portfela.
      </p>

      <p>
        Na jej podstawie aplikacja będzie:
      </p>

      <ul>
        <li>obliczać rzeczywisty skład portfela</li>
        <li>pokazywać odchylenia od założonych proporcji</li>
        <li>pomagać w podejmowaniu decyzji o równoważeniu portfela</li>
      </ul>

      <h3>Krok 5: Dodanie pierwszych transakcji</h3>

      <p>
        Po zapisaniu wag modelowych w sekcji <strong>Wagi rzeczywiste</strong>
        pojawi się informacja, że nie masz jeszcze żadnych transakcji w portfelu.
      </p>

      <p>
        Aby rozpocząć rejestrowanie rzeczywistego składu portfela, kliknij przycisk
        <strong>„Dodaj pierwszą transakcję”</strong>.
      </p>

      <img
        class="article-image"
        src={AddTransactionPicture}
        alt="Sekcja wag rzeczywistych z przyciskiem Dodaj pierwszą transakcję"
      />

      <p>
        Dodawanie transakcji pozwala określić:
      </p>

      <ul>
        <li>jakie aktywo zostało kupione</li>
        <li>za jaką kwotę zostało nabyte</li>
        <li>szczegóły potrzebne do obliczania aktualnej wartości inwestycji</li>
      </ul>

      <p>
        Na podstawie dodanych transakcji aplikacja automatycznie oblicza
        <strong> wagi rzeczywiste</strong> oraz porównuje je z wagami modelowymi,
        pokazując ewentualne odchylenia od założonej struktury portfela.
      </p>

      <p>
        W kolejnym kroku dodamy transakcje odpowiadające wcześniej zdefiniowanym
        proporcjom, np. zakup akcji oraz obligacji zgodnie z podziałem 60/40.
      </p>

      <h3>Krok 6: Dodanie transakcji akcyjnej i obligacyjnej</h3>

      <p>
        Aby odwzorować wcześniej zdefiniowaną strukturę portfela (60% akcji / 40% obligacji),
        należy dodać transakcje odpowiadające obu klasom aktywów.
      </p>

      <p>
        Transakcje dodajemy osobno dla każdego typu aktywa, korzystając z tego samego
        formularza, który dynamicznie dopasowuje się do wybranego rodzaju inwestycji.
      </p>

      <h4>Dodanie transakcji akcyjnej</h4>

      <p>
        W przypadku części akcyjnej wybieramy typ aktywa <strong>Akcje</strong>,
        a następnie uzupełniamy dane dotyczące kupowanego instrumentu, takie jak:
      </p>

      <ul>
        <li>symbol instrumentu (np. ETF)</li>
        <li>nazwa</li>
        <li>cena zakupu</li>
        <li>ilość</li>
      </ul>

      <p>
        Kwota zakupu jest wyliczana automatycznie na podstawie ceny i ilości.
      </p>

      <h4>Dodanie transakcji obligacyjnej</h4>

      <p>
        Dla części obligacyjnej wybieramy typ aktywa <strong>Obligacje skarbowe</strong>
        i uzupełniamy informacje charakterystyczne dla obligacji oszczędnościowych,
        takie jak:
      </p>

      <ul>
        <li>rodzaj obligacji (np. indeksowane inflacją)</li>
        <li>nazwa i symbol obligacji</li>
        <li>oprocentowanie</li>
        <li>liczba obligacji</li>
      </ul>

      <p>
        Podobnie jak w przypadku akcji, całkowita kwota inwestycji obliczana jest automatycznie.
      </p>

      <div class="article-images-row">
        <img
          class="article-image"
          src={AddStocksPicture}
          alt="Formularz dodawania transakcji akcyjnej"
        />

        <img
          class="article-image"
          src={AddBondsPicture}
          alt="Formularz dodawania transakcji obligacyjnej"
        />
      </div>

      <p>
        Po zapisaniu obu transakcji portfel zacznie odzwierciedlać rzeczywisty skład
        inwestycji, a aplikacja automatycznie obliczy <strong> wagi rzeczywiste </strong>
        oraz porówna je z założeniami modelowymi.
      </p>

      <h3>Krok 7: Śledzenie inwestycji i analiza portfela</h3>

      <p>
        Po dodaniu transakcji aplikacja automatycznie zaczyna śledzić rzeczywisty
        stan portfela oraz jego zmiany w czasie. Wszystkie najważniejsze informacje
        dostępne są na stronie szczegółowej portfela.
      </p>

      <h4>Wagi rzeczywiste portfela</h4>

      <p>
        W sekcji <strong>Wagi rzeczywiste</strong> widoczny jest aktualny skład portfela
        wynikający z dodanych transakcji. Wykres pokazuje, jaki procent portfela
        stanowią poszczególne klasy aktywów.
      </p>

      <p>
        Dzięki temu łatwo zauważyć niewielkie odchylenia od założeń modelowych,
        np. 59% akcji i 41% obligacji zamiast docelowych 60/40.
      </p>

      <img
        class="article-image"
        src={ActualWeightsChartPicture}
        alt="Wagi rzeczywiste portfela inwestycyjnego"
      />

      <p>
        W przypadku większych odchyleń aplikacja umożliwia szybkie sprawdzenie,
        jakie transakcje należałoby wykonać, aby ponownie zrównoważyć portfel.
      </p>

      <h4>Wartość portfela w czasie</h4>

      <p>
        Poniżej znajduje się sekcja <strong>Wartość portfela w czasie</strong>,
        która prezentuje:
      </p>

      <ul>
        <li>łączną kwotę zainwestowanych środków</li>
        <li>aktualną wartość portfela</li>
        <li>procentową zmianę wartości</li>
      </ul>

      <p>
        Wykres pozwala śledzić, jak portfel zachowuje się w dłuższym okresie oraz
        porównać wartość aktualną z sumą wpłaconych środków.
      </p>

      <img
        class="article-image"
        src={PortfolioValueChartPicture}
        alt="Wykres wartości portfela w czasie"
      />

      <h4>Historia transakcji</h4>

      <p>
        Na dole strony dostępna jest tabela z pełną historią transakcji.
        Każda pozycja zawiera informacje o:
      </p>

      <ul>
        <li>dacie transakcji</li>
        <li>typie aktywa</li>
        <li>kwocie zakupu</li>
        <li>aktualnej wartości</li>
        <li>szczegółach instrumentu</li>
      </ul>

      <p>
        Z tego miejsca można również edytować lub usuwać transakcje, jeśli zajdzie
        taka potrzeba.
      </p>

      <img
        class="article-image"
        src={TransactionsTablePicture}
        alt="Tabela transakcji w portfelu inwestycyjnym"
      />

      <p>
        Dzięki połączeniu wag modelowych, wag rzeczywistych, wykresów oraz historii
        transakcji aplikacja umożliwia świadome i uporządkowane zarządzanie
        portfelem inwestycyjnym – zarówno w krótkim, jak i długim terminie.
      </p>

    </>
  );
}
