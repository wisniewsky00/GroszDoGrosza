import { TileGrid } from '../../components/tiles/TileGrid';
import './ArticlesPage.css';
import speculationIcon from '../../assets/images/icons/speculation.png';
import activeInvestingIcon from '../../assets/images/icons/activeInvesting.png';
import passiveInvestingIcon from '../../assets/images/icons/passiveInvesting.png';
import SharesIcon from '../../assets/images/icons/shares.png';
import BondIcon from '../../assets/images/icons/bond.png';
import RealEstateIcon from '../../assets/images/icons/house.png';
import GoldIcon from '../../assets/images/icons/gold.png';
import CryptoCurrencyIcon from '../../assets/images/icons/bitcoin.png';
import ExchangeIcon from '../../assets/images/icons/stockExchange.png';
import IndexIcon from '../../assets/images/icons/stockIndex.png';
import DirectInvestmentIcon from '../../assets/images/icons/directInvestment.png';
import IndirectInvestmentIcon from '../../assets/images/icons/indirectInvestment.png';
import EtfIcon from '../../assets/images/icons/etf.png';
import PreferencesIcon from '../../assets/images/icons/preferences.png';
import PortfolioIcon from '../../assets/images/icons/portfolio.png';
import BrokerageAccountIcon from '../../assets/images/icons/account.png';

export function ArticlesPage() {

  const investmentStrategyTiles = [
    {
      title: "Inwestowanie pasywne",
      path: "",
      icon: passiveInvestingIcon,
    },
    {
      title: "Inwestowanie aktywne",
      path: "",
      icon: activeInvestingIcon,
    },
    {
      title: "Spekulacje",
      path: "",
      icon: speculationIcon,
    }
  ];

  const assetClassTiles = [
    {
      title: "Akcje",
      path: "",
      icon: SharesIcon,
    },
    {
      title: "Obligacje",
      path: "",
      icon: BondIcon,
    },
    {
      title: "Nieruchomości",
      path: "",
      icon: RealEstateIcon,
    },
    {
      title: "Złoto",
      path: "",
      icon: GoldIcon,
    },
    {
      title: "Kryptowaluty",
      path: "",
      icon: CryptoCurrencyIcon,
    },
  ]

  const investmentVehicles = [
    {
      title: "Giełdy",
      path: "",
      icon: ExchangeIcon,
    },
    {
      title: "Indeksy",
      path: "",
      icon: IndexIcon,
    },
    {
      title: "Inwestowanie bezpośrednie",
      path: "",
      icon: DirectInvestmentIcon,
    },
    {
      title: "Inwestowanie pośrednie",
      path: "",
      icon: IndirectInvestmentIcon,
    }
  ];

  const investmentPreparation = [
  {
    title: "Fundusze ETF",
    path: "",
    icon: EtfIcon,
  },
  {
    title: "Preferencje inwestycyjne",
    path: "",
    icon: PreferencesIcon,
  },
  {
    title: "Budowa portfela inwestycyjnego",
    path: "",
    icon: PortfolioIcon,
  },
  {
    title: "Konto maklerskie",
    path: "",
    icon: BrokerageAccountIcon,
  },
];

  return (
    <div className="articles-container">
      <div className="articles-grid">
        <h2 className="articles-title">1. Strategie Inwestycyjne</h2>
        <TileGrid tiles={investmentStrategyTiles} />
      </div>

      <div className="articles-grid">
        <h2 className="articles-title">2. Podstawowe klasy aktywów inwestycyjncyh </h2>
        <TileGrid tiles={assetClassTiles} />
      </div>

      <div className="articles-grid">
        <h2 className="articles-title">3. Dostęp do rynku inwestycyjnego</h2>
        <TileGrid tiles={investmentVehicles} />
      </div>

      <div className="articles-grid">
        <h2 className="articles-title">4. Przygotowanie do inwestowania</h2>
        <TileGrid tiles={investmentPreparation} />
      </div>
    </div>
  );
}