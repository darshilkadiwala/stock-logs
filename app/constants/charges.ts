import type { ApplyOn, ChargeCategory, ChargeType, Rounding } from '@/types/charge';

export const COMMON_CHARGE_CATEGORIES = {
  EQ_BROKERAGE: 'Brokerage',
  STT: 'STT (Securities Transaction Tax)',
  STAMP: 'Stamp charges',
  EX_TRANSACTION_CHARGES: 'Exchange Transaction Charges',
  SEBI_TURNOVER_CHARGES: 'SEBI Turnover Charges',
  DP_CHARGES: 'DP (Depository participant) Charges',
  IPFT_CHARGE: 'Investor Protection Fund Trust charge by NSE',
  GST: 'GST',
  AUTO_SQUARE_OFF_CHARGES: 'Auto Square-off Charges',
  PLEDGE_CHARGES: 'Pledge Charges',
} as const satisfies Record<ChargeCategory, string>;

export const CHARGE_TYPES = {
  FIXED: 'FIXED',
  PERCENTAGE: 'PERCENTAGE',
  PERCENTAGE_WITH_MIN_MAX: 'PERCENTAGE_WITH_MIN_MAX',
} as const satisfies Record<ChargeType, ChargeType>;

export const APPLY_ON = {
  BOTH: 'BOTH',
  BUY: 'BUY',
  SELL: 'SELL',
} as const satisfies Record<ApplyOn, ApplyOn>;

export const CHARGE_ROUNDING_TYPES = {
  AUTO: 'AUTO',
  CEIL: 'CEIL',
  FLOOR: 'FLOOR',
  NEAREST_HALF: 'NEAREST_HALF',
} as const satisfies Record<Rounding, Rounding>;
