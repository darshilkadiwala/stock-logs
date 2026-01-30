/**
 * Instrument types supported by the application
 */
export type InstrumentType = 'EQUITY' | 'MF' | 'ETF' | 'FNO'; // FNO for future use

/**
 * Transaction types
 */
export type TransactionType = 'BUY' | 'SELL';

/**
 * Trade types - Intraday (same day buy/sell) or Delivery (held for delivery)
 */
export type TradeType = 'INTRADAY' | 'DELIVERY';

/**
 * Trade/Transaction entry
 */
export interface Trade {
  id: string;
  date: string; // ISO date string
  instrumentType: InstrumentType;
  symbol: string; // Stock symbol, MF scheme code, ETF symbol
  name: string; // Full name of the instrument
  transactionType: TransactionType;
  tradeType?: TradeType; // INTRADAY or DELIVERY (defaults to DELIVERY for backward compatibility)
  quantity: number;
  price: number; // Price per unit
  fees?: number; // Brokerage, charges, etc.
  notes?: string;
  createdAt: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
}

/**
 * Portfolio holding (aggregated from trades)
 */
export interface Holding {
  symbol: string;
  name: string;
  instrumentType: InstrumentType;
  quantity: number;
  averagePrice: number; // Weighted average buy price
  totalInvested: number; // Total amount invested
  currentPrice?: number; // Current market price (for manual entry or future API integration)
  currentValue: number; // quantity * currentPrice (or averagePrice if currentPrice not available)
  pnl: number; // Profit/Loss
  pnlPercent: number; // P&L percentage
  lastUpdated?: string;
}

/**
 * Portfolio summary statistics
 */
export interface PortfolioSummary {
  totalInvested: number;
  currentValue: number;
  totalPnl: number;
  totalPnlPercent: number;
  holdingsCount: number;
  holdingsByType: Record<InstrumentType, number>;
}

/**
 * Intraday trade pair (buy and sell on same day)
 */
export interface IntradayTrade {
  symbol: string;
  name: string;
  instrumentType: InstrumentType;
  date: string;
  buyTrade: Trade;
  sellTrade: Trade;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  buyFees: number;
  sellFees: number;
  pnl: number; // (sellPrice - buyPrice) * quantity - (buyFees + sellFees)
  pnlPercent: number;
}

/**
 * Intraday summary statistics
 */
export interface IntradaySummary {
  totalTrades: number;
  totalPnl: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
}

/**
 * Dashboard data
 */
export interface DashboardData {
  summary: PortfolioSummary;
  holdings: Holding[];
  recentTrades: Trade[];
  topGainers: Holding[];
  topLosers: Holding[];
  intradayTrades: IntradayTrade[];
  intradaySummary: IntradaySummary;
}
