import type { TradeType } from './trade';

/**
 * Broker charge configuration types
 */
export type ChargeType = 'FIXED' | 'PERCENTAGE' | 'PERCENTAGE_WITH_MIN_MAX';
export type ApplyOn = 'BUY' | 'SELL';
export type Exchange = 'NSE' | 'BSE';
export type Rounding = 'AUTO' | 'FLOOR' | 'CEIL' | 'NEAREST_HALF';
export type ChargeCategory =
  | 'EQ_BROKERAGE'
  | 'STT'
  | 'STAMP'
  | 'EX_TRANSACTION_CHARGES'
  | 'SEBI_TURNOVER_CHARGES'
  | 'DP_CHARGES'
  | 'IPFT_CHARGE';
// | 'GST'
// | 'AUTO_SQUARE_OFF_CHARGES'
// | 'PLEDGE_CHARGES';

/**
 * Configuration for a single charge
 */
export interface Charge {
  __type: string;
  id: string;
  name: ChargeCategory;
  chargeType: ChargeType;
  tradeType: TradeType;
  appliesOn: [ApplyOn, ...ApplyOn[]];
  value: unknown;
  rounding: Rounding; // How to round decimal places of the charge value
  hint?: string; // hint to the user about the charge

  /** internal fields */
  sortOrder?: number;
}

export interface NormalCharge extends Charge {
  __type: 'NORMAL';

  value: number; // amount or percentage
  min?: number; // Minimum charge (amount or percentage)
  max?: number; // Maximum charge (amount or percentage)
  exchanges: [Exchange, ...Exchange[]];
}

export interface ExchangeSpecificCharge extends Charge {
  __type: 'EXCHANGE_SPECIFIC';

  value: Record<Exchange, number>;
}

export type ChargeConfig = NormalCharge | ExchangeSpecificCharge;

/**
 * Configuration for a broker
 */
export interface Broker {
  id: string;
  name: string;
  enabled: boolean;
  isDefault: boolean;
  charges: ChargeConfig[]; // Key is charge category name
  gstOnCharges: number;
}

/**
 * Complete broker settings configuration
 */
export interface BrokerSettings {
  brokers: Broker[];
  defaultBrokerId: string;
}
