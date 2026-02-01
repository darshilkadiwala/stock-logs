import type { ApplyOn, ChargeCategory, ChargeType, Exchange, Rounding } from '@/types/charge';
import type { IdentityMapping } from '@/types/utils';

export const CHARGE_DEFINITIONS: IdentityMapping<ChargeCategory> = {
  EQ_BROKERAGE: { label: 'Brokerage', key: 'EQ_BROKERAGE' },
  STT: { label: 'STT (Securities Transaction Tax)', key: 'STT' },
  STAMP: { label: 'Stamp charges', key: 'STAMP' },
  EX_TRANSACTION_CHARGES: { label: 'Exchange Transaction Charges', key: 'EX_TRANSACTION_CHARGES' },
  SEBI_TURNOVER_CHARGES: { label: 'SEBI Turnover Charges', key: 'SEBI_TURNOVER_CHARGES' },
  DP_CHARGES: { label: 'DP (Depository participant) Charges', key: 'DP_CHARGES' },
  IPFT_CHARGE: { label: 'Investor Protection Fund Trust charge by NSE', key: 'IPFT_CHARGE' },
  // GST: { label: 'GST', key: 'GST' },
  // AUTO_SQUARE_OFF_CHARGES: 'Auto Square-off Charges',
  // PLEDGE_CHARGES: 'Pledge Charges',
};

export const CHARGE_TYPES: IdentityMapping<ChargeType> = {
  FIXED: { key: 'FIXED', label: 'Fixed' },
  PERCENTAGE: { key: 'PERCENTAGE', label: 'Percentage' },
  PERCENTAGE_WITH_MIN_MAX: { key: 'PERCENTAGE_WITH_MIN_MAX', label: '% With Min/Max value' },
} as const;

export const APPLY_ON: IdentityMapping<ApplyOn> = {
  BUY: { key: 'BUY', label: 'Buy' },
  SELL: { key: 'SELL', label: 'Sell' },
} as const;

export const CHARGE_ROUNDING_TYPES = {
  AUTO: 'AUTO',
  CEIL: 'CEIL',
  FLOOR: 'FLOOR',
  NEAREST_HALF: 'NEAREST_HALF',
} as const satisfies Record<Rounding, Rounding>;

export const EXCHANGES = {
  NSE: 'NSE',
  BSE: 'BSE',
} as const satisfies Record<Exchange, Exchange>;
