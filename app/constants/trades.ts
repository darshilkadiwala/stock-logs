import type { TradeType } from '@/types/trade';

export const TRADE_TYPES = {
  INTRADAY: 'INTRADAY',
  DELIVERY: 'DELIVERY',
} as const satisfies Record<TradeType, TradeType>;
