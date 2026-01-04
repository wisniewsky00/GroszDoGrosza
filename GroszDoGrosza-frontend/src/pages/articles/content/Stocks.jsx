import StockMarketPicture from '../../../assets/images/articles/stocks-share.png'

export default function StocksInvesting() {
  return (
    <>
      <h1>Akcje – czym są i jak w nie inwestować?</h1>

      <p>
        Akcje to jeden z najpopularniejszych sposobów inwestowania pieniędzy.
        Kupując akcję, stajesz się współwłaścicielem firmy i możesz zarabiać
        na jej rozwoju.
      </p>

      <p>
        Ten artykuł jest prostym wprowadzeniem dla osób początkujących –
        bez trudnych pojęć i skomplikowanych strategii.
      </p>

      <div className="article-definition">
        <p>
          <strong>Akcja</strong> – udział w firmie, który daje Ci prawo do
          części jej zysków oraz wzrostu wartości firmy.
        </p>
        <p>
          <strong>Dywidenda</strong> – pieniądze, które firma może wypłacić
          swoim akcjonariuszom (inwestorom), jeśli osiągnęła zysk.
        </p>
      </div>

      <img
        className="article-image"
        src={StockMarketPicture}
        alt="Inwestowanie w akcje spółek giełdowych"
      />

      <h2>Czym są akcje?</h2>

      <p>
        Akcje to papiery wartościowe emitowane przez firmy, aby pozyskać
        kapitał na rozwój. Kupując akcje, stajesz się współwłaścicielem
        przedsiębiorstwa – nawet jeśli jest to bardzo mały udział.
      </p>

      <p>
        Jeśli firma się rozwija, rośnie jej wartość, a wraz z nią cena akcji.
        Wtedy inwestor może sprzedać akcje drożej lub otrzymywać dywidendy.
      </p>

      <h2>Jak można zarabiać na akcjach?</h2>

      <div className="article-definition">
        <p>
          <strong>Wzrost ceny akcji</strong> – kupujesz akcję taniej i sprzedajesz
          drożej w przyszłości.
        </p>
      </div>

      <h2>Gdzie kupuje się akcje?</h2>

      <p>
        Akcje kupuje się na giełdzie papierów wartościowych, np. na GPW
        (Polska) lub giełdach zagranicznych. Do tego potrzebne jest konto
        maklerskie, które działa podobnie do konta bankowego.
      </p>

      <p>
        Jeśli chceszdowiedzieć się więcej o kontakch maklerskich, zobacz artykuł:
        {" "}
        <a href="/articles/brokerage-account" className="article-link">
          Konto maklerskie
        </a>
      </p>

      <h2>Zalety inwestowania w akcje</h2>

      <div className="article-box article-box--pros">
        <ul>
          <li>Możliwość wysokich zysków w długim terminie</li>
          <li>Udział w rozwoju znanych firm</li>
          <li>Ochrona kapitału przed inflacją</li>
          <li>Możliwość otrzymywania dywidend</li>
          <li>Duży wybór spółek i rynków</li>
        </ul>
      </div>

      <h2>Wady inwestowania w akcje</h2>

      <div className="article-box article-box--cons">
        <ul>
          <li>Wahania cen – wartość akcji może spadać</li>
          <li>Ryzyko strat w krótkim terminie</li>
          <li>Wymaga cierpliwości i odporności na emocje</li>
          <li>Nie każda firma odnosi sukces</li>
        </ul>
      </div>

      <h2>Akcje a inwestowanie pasywne</h2>

      <p>
        Inwestowanie w pojedyncze akcje jest bardziej wymagające niż
        inwestowanie pasywne. Dlatego wielu początkujących inwestorów
        zaczyna od funduszy ETF, które dają szeroką dywersyfikację.
      </p>

      <p>
        Jeśli chcesz poznać prostszą alternatywę, zobacz artykuł:
        {" "}
        <a href="/articles/etf-funds" className="article-link">
          Czym są fundusze ETF?
        </a>
      </p>

      <h2>Czy akcje są dla Ciebie?</h2>

      <p>
        Akcje są dobrym wyborem dla osób, które myślą długoterminowo,
        akceptują wahania rynku i chcą stopniowo budować swój kapitał.
      </p>

      <p>
        W praktyce wiele osób łączy akcje z inwestowaniem pasywnym,
        tworząc zrównoważony portfel inwestycyjny.
      </p>
    </>
  )
}
