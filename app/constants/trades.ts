import type { Exchange } from '@/types/charge';
import type { TradeType } from '@/types/trade';

export const TRADE_TYPES = {
  INTRADAY: 'INTRADAY',
  DELIVERY: 'DELIVERY',
} as const satisfies Record<TradeType, TradeType>;

export const EXCHANGES = {
  BOTH: 'BOTH',
  NSE: 'NSE',
  BSE: 'BSE',
} as const satisfies Record<Exchange, Exchange>;
