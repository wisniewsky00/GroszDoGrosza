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
import { Outlet } from 'react-router';

export function ArticlesPage() {

  const investmentStrategyTiles = [
    {
      title: "Inwestowanie pasywne",
      path: "passive-investing",
      icon: passiveInvestingIcon,
    },
    {
      title: "Inwestowanie aktywne",
      path: "active-investing",
      icon: activeInvestingIcon,
    },
    {
      title: "Spekulacje",
      path: "speculation",
      icon: speculationIcon,
    }
  ];

  const assetClassTiles = [
    {
      title: "Akcje",
      path: "shares",
      icon: SharesIcon,
    },
    {
      title: "Obligacje",
      path: "bonds",
      icon: BondIcon,
    },
    {
      title: "Nieruchomości",
      path: "real-estate",
      icon: RealEstateIcon,
    },
    {
      title: "Złoto",
      path: "gold",
      icon: GoldIcon,
    },
    {
      title: "Kryptowaluty",
      path: "cryptocurrencies",
      icon: CryptoCurrencyIcon,
    },
  ]

  const investmentVehicles = [
    {
      title: "Giełdy",
      path: "stock-exchanges",
      icon: ExchangeIcon,
    },
    {
      title: "Indeksy",
      path: "indexes",
      icon: IndexIcon,
    },
    {
      title: "Inwestowanie bezpośrednie",
      path: "direct-investment",
      icon: DirectInvestmentIcon,
    },
    {
      title: "Inwestowanie pośrednie",
      path: "indirect-investment",
      icon: IndirectInvestmentIcon,
    }
  ];

  const investmentPreparation = [
  {
    title: "Fundusze ETF",
    path: "etf-funds",
    icon: EtfIcon,
  },
  {
    title: "Preferencje inwestycyjne",
    path: "investment-preferences",
    icon: PreferencesIcon,
  },
  {
    title: "Budowa portfela inwestycyjnego",
    path: "portfolio-construction",
    icon: PortfolioIcon,
  },
  {
    title: "Konto maklerskie",
    path: "brokerage-account",
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

      <Outlet />
    </div>
  );
}