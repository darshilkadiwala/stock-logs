import type { TradeType } from './trade';

/**
 * Broker charge configuration types
 */
export type ChargeType = 'FIXED' | 'PERCENTAGE' | 'PERCENTAGE_WITH_MIN_MAX';
export type ApplyOn = 'BUY' | 'SELL' | 'BOTH';
export type Exchange = 'NSE' | 'BSE' | 'BOTH';
export type Rounding = 'AUTO' | 'FLOOR' | 'CEIL' | 'NEAREST_HALF';
export type ChargeCategory =
  | 'EQ_BROKERAGE'
  | 'STT'
  | 'STAMP'
  | 'EX_TRANSACTION_CHARGES'
  | 'SEBI_TURNOVER_CHARGES'
  | 'DP_CHARGES'
  | 'IPFT_CHARGE'
  | 'GST'
  | 'AUTO_SQUARE_OFF_CHARGES'
  | 'PLEDGE_CHARGES';

/**
 * Configuration for a single charge
 */
export interface ChargeConfig {
  id: string;
  name: string;
  chargeType: ChargeType;
  tradeType: TradeType;
  value: number; // amount or percentage
  min?: number; // Minimum charge (amount or percentage)
  max?: number; // Maximum charge (amount or percentage)
  applyOn: ApplyOn;
  exchange: Exchange;
  rounding: Rounding; // How to round decimal places of the charge value
  hint?: string; // hint to the user about the charge

  /** internal fields */
  sortOrder?: number; // sorting order of the charge - lower the number, higher the priority, defaults to 0
}

/**
 * Configuration for a broker
 */
export interface Broker {
  id: string;
  name: string;
  enabled: boolean;
  isDefault: boolean;
  charges: ChargeConfig[]; // Key is charge category name
  customCharges: ChargeConfig[];
}

/**
 * Complete broker settings configuration
 */
export interface BrokerSettings {
  brokers: Broker[];
  defaultBrokerId: string;
}
