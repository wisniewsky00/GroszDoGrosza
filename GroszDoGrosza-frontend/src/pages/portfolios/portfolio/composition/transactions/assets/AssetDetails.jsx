export function AssetDetails({ asset, metadata }) {

  if (!metadata) return <span className="muted">—</span>;

  switch (asset) {
    case "ZLOTO":
      return <GoldDetails metadata={metadata} />;

    case "NIERUCHOMOSCI":
      return <RealEstateDetails metadata={metadata} />;

    case "KRYPTOWALUTY":
      return <CryptoDetails metadata={metadata} />;

    case "AKCJE":
      return <StockDetails metadata={metadata} />;

    case "OBLIGACJE_SKARBOWE":
      return <BondDetails metadata={metadata} />;

    default:
      return <span className="muted">Brak szczegółów</span>;
  }
}

function GoldDetails({ metadata }) {
  const {
    form,
    amount,
    unit,
    pricePerGram
  } = metadata;

  return (
    <div className="tx-details">
      <div><strong>Forma:</strong> {form === "COIN" ? "Moneta" : "Sztabka"}</div>
      <div><strong>Ilość:</strong> {amount} {unit}</div>
      <div><strong>Cena/g:</strong> {pricePerGram} zł</div>
    </div>
  );
}

function RealEstateDetails({ metadata }) {
  const {
    street,
    city,
    areaM2,
    purchasePricePerM2,
    currentPricePerM2,
  } = metadata;

  return (
    <div className="tx-details">
      <div><strong>{street}</strong>, {city}</div>
      <div><strong>Metraż: </strong>{areaM2} m²</div>
      <div>
        <strong>Zmiana ceny: </strong>{purchasePricePerM2} zł/m² → {currentPricePerM2} zł/m²
      </div>
    </div>
  );
}

function CryptoDetails({ metadata }) {
  const { name, amount, pricePln } = metadata;

  const formatPLN2 = (value) =>
    new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (

    <div className="tx-details">
      <div>
        <strong>Nazwa:</strong> {name}
      </div>
      <div>
        <strong>Ilość:</strong> {amount}
      </div>
      <div>
        <strong>Cena zakupu (PLN / 1 {name}):</strong> {formatPLN2(pricePln)} zł
      </div>
    </div>
  );
}

function StockDetails({ metadata }) {
  const { symbol, name, amount, purchasePrice, currentPrice } = metadata;

  const formatPLN = (v) =>
    new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v);

  return (
    <div className="tx-details">
      <div><strong>{name}</strong> ({symbol})</div>
      <div><strong>Ilość:</strong> {amount}</div>
      <div>
        <strong>Cena zakupu:</strong> {formatPLN(purchasePrice)} zł
      </div>
      <div>
        <strong>Cena aktualna:</strong> {formatPLN(currentPrice)} zł
      </div>
    </div>
  );
}

function BondDetails({ metadata }) {
  const {
    bondType,
    bondName,
    bondSymbolSuffix,
    interestRate,
    firstYearRate,
    margin,
    nbpRate,
    capitalization,
    payout,
    amount,
    currentValue,
  } = metadata;

  const BOND_TYPE_LABEL = {
    FIXED: "Stałoprocentowe",
    VARIABLE: "Zmiennoprocentowe",
    INFLATION: "Indeksowane inflacją",
  };

  const formatPLN = (v) =>
    new Intl.NumberFormat("pl-PL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v);

  return (
    <div className="tx-details">
      <div>
        <strong>{bondName}{bondSymbolSuffix}</strong> ({BOND_TYPE_LABEL[bondType]})
      </div>
      <div><strong>Ilość:</strong> {amount}</div>

      {interestRate && (
        <div><strong>Oprocentowanie:</strong> {interestRate}%</div>
      )}
      {firstYearRate && (
        <div><strong>1. rok:</strong> {firstYearRate}%</div>
      )}
      {margin && (
        <div><strong>Marża:</strong> {margin}%</div>
      )}
      {nbpRate && (
        <div><strong>Stopa NBP:</strong> {nbpRate}%</div>
      )}

      <div>
        <strong>Kapitalizacja:</strong> {capitalization}
      </div>
      <div>
        <strong>Wypłata odsetek:</strong> {payout}
      </div>
      <div>
        <strong>Wartość aktualna:</strong> {formatPLN(currentValue)} zł
      </div>
    </div>
  );
}