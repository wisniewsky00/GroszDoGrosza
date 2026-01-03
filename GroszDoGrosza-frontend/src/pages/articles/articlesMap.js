import EtfFunds from './content/EtfFunds';
import PassiveInvesting from './content/PassiveInvesting';
import ActiveInvesting from './content/ActiveInvesting';  
import Speculation from './content/Speculation';
import StocksInvesting from './content/Stocks';
import Bonds from './content/Bonds';
import RealEstate from './content/RealEstate';
import Gold from './content/Gold';
import Cryptocurrencies from './content/Cryptocurrencies';
import StockMarket from './content/StockMarket';
import Indexes from './content/Indexes';
import { DirectInvesting } from './content/DirectInvesting';
import { IndirectInvesting } from './content/IndirectInvesting';
import InvestmentPreferences from './content/InvestmentPreferences';
import BrokerageAccount from './content/BrokerageAccount';

export const articlesMap = {
  "etf-funds": {
    component: EtfFunds
  },
  "passive-investing": {
    component: PassiveInvesting
  },
  "active-investing": {
    component: ActiveInvesting
  },
  "speculation": {
    component: Speculation
  },
  "shares": {
    component: StocksInvesting
  },
  "bonds": {
    component: Bonds
  },
  "real-estate": {
    component: RealEstate
  },
  "gold": {
    component: Gold
  }, 
  "cryptocurrencies": {
    component: Cryptocurrencies
  },
  "stock-market": {
    component: StockMarket
  },
  "indexes": {
    component: Indexes
  },
  "direct-investing": {
    component: DirectInvesting
  },
  "indirect-investing": {
    component: IndirectInvesting
  }, 
  "investment-preferences": {
    component: InvestmentPreferences
  },
  "brokerage-account": {
    component: BrokerageAccount
  }
}