import { APPLY_ON, CHARGE_DEFINITIONS, CHARGE_ROUNDING_TYPES, CHARGE_TYPES, EXCHANGES } from '@/constants/charges';
import { TRADE_TYPES } from '@/constants/trades';
import { generateId } from '@/lib/utils';

import type {
  Broker,
  ChargeCategory,
  ChargeConfig,
  Exchange,
  ExchangeSpecificCharge,
  NormalCharge,
} from '@/types/charge';

const ALL_EXCHANGES: [Exchange, ...Exchange[]] = [EXCHANGES.NSE, EXCHANGES.BSE];
const ALL_APPLY_ON: ChargeConfig['appliesOn'] = [APPLY_ON.BUY.key, APPLY_ON.SELL.key];

function createNormalCharge<T extends ChargeConfig['tradeType']>(
  tradeType: T,
  name: ChargeCategory,
  value: number,
  options?: Omit<Partial<NormalCharge>, 'id' | 'name' | 'tradeType' | 'value' | '__type'>,
): NormalCharge & { tradeType: T } {
  return {
    __type: 'NORMAL',
    id: generateId(),
    name,
    tradeType,
    value,
    ...options,
    exchanges: options?.exchanges || ALL_EXCHANGES,
    chargeType: options?.chargeType || CHARGE_TYPES.PERCENTAGE.key,
    appliesOn: options?.appliesOn || ALL_APPLY_ON,
    rounding: options?.rounding || CHARGE_ROUNDING_TYPES.AUTO,
    sortOrder: options?.sortOrder || 0,
  };
}

function createExchangeSpecificCharge<T extends ChargeConfig['tradeType']>(
  tradeType: T,
  name: ChargeCategory,
  value: ExchangeSpecificCharge['value'], // This is Record<Exchange, number>
  options?: Omit<Partial<ExchangeSpecificCharge>, 'id' | 'name' | 'tradeType' | 'value' | '__type'>,
): ExchangeSpecificCharge & { tradeType: T } {
  return {
    __type: 'EXCHANGE_SPECIFIC',
    id: generateId(),
    name,
    tradeType,
    value,
    ...options,
    chargeType: options?.chargeType || CHARGE_TYPES.PERCENTAGE.key,
    appliesOn: options?.appliesOn || ALL_APPLY_ON,
    rounding: options?.rounding || CHARGE_ROUNDING_TYPES.AUTO,
    sortOrder: options?.sortOrder || 0,
  };
}

/**
 * Creates broker configuration
 */
export function createBroker({
  name,
  isDefault = false,
  enabled = true,
  gstOnCharges = 18,
}: {
  name: string;
  isDefault?: boolean;
  enabled?: boolean;
  gstOnCharges?: number;
}): Broker {
  const intradayCharges: (ChargeConfig & { tradeType: typeof TRADE_TYPES.INTRADAY })[] = [
    createNormalCharge(TRADE_TYPES.INTRADAY, CHARGE_DEFINITIONS.EQ_BROKERAGE.key, 0.1, {
      max: 20,
      min: 5,
      chargeType: CHARGE_TYPES.PERCENTAGE_WITH_MIN_MAX.key,
    }),
    createNormalCharge(TRADE_TYPES.INTRADAY, CHARGE_DEFINITIONS.STT.key, 0.025, { appliesOn: [APPLY_ON.SELL.key] }),
    createNormalCharge(TRADE_TYPES.INTRADAY, CHARGE_DEFINITIONS.STAMP.key, 0.003, { appliesOn: [APPLY_ON.BUY.key] }),
    createExchangeSpecificCharge(TRADE_TYPES.INTRADAY, CHARGE_DEFINITIONS.EX_TRANSACTION_CHARGES.key, {
      NSE: 0.00297,
      BSE: 0.00375,
    }),
    createNormalCharge(TRADE_TYPES.INTRADAY, CHARGE_DEFINITIONS.SEBI_TURNOVER_CHARGES.key, 0.0001),
    createNormalCharge(TRADE_TYPES.INTRADAY, CHARGE_DEFINITIONS.DP_CHARGES.key, 0, {
      chargeType: CHARGE_TYPES.FIXED.key,
      hint: 'Per scrip (plus tax) on sell side, update according to your broker & you gender',
    }),
    createNormalCharge(TRADE_TYPES.INTRADAY, CHARGE_DEFINITIONS.IPFT_CHARGE.key, 0.0001, {
      exchanges: [EXCHANGES.NSE],
    }),
  ];

  const deliveryCharges: (ChargeConfig & { tradeType: typeof TRADE_TYPES.DELIVERY })[] = [
    createNormalCharge(TRADE_TYPES.DELIVERY, CHARGE_DEFINITIONS.EQ_BROKERAGE.key, 0.1, {
      max: 20,
      min: 5,
      chargeType: CHARGE_TYPES.PERCENTAGE_WITH_MIN_MAX.key,
    }),
    createNormalCharge(TRADE_TYPES.DELIVERY, CHARGE_DEFINITIONS.STT.key, 0.1),
    createNormalCharge(TRADE_TYPES.DELIVERY, CHARGE_DEFINITIONS.STAMP.key, 0.015, { appliesOn: [APPLY_ON.BUY.key] }),
    createExchangeSpecificCharge(TRADE_TYPES.DELIVERY, CHARGE_DEFINITIONS.EX_TRANSACTION_CHARGES.key, {
      NSE: 0.00297,
      BSE: 0.00375,
    }),
    createNormalCharge(TRADE_TYPES.DELIVERY, CHARGE_DEFINITIONS.SEBI_TURNOVER_CHARGES.key, 0.0001),
    createNormalCharge(TRADE_TYPES.DELIVERY, CHARGE_DEFINITIONS.DP_CHARGES.key, 20, {
      chargeType: CHARGE_TYPES.FIXED.key,
      hint: 'Per scrip (plus tax) on sell side, update according to your broker & you gender',
      appliesOn: [APPLY_ON.SELL.key],
    }),
    createNormalCharge(TRADE_TYPES.DELIVERY, CHARGE_DEFINITIONS.IPFT_CHARGE.key, 0.0001, {
      exchanges: [EXCHANGES.NSE],
    }),
  ];

  return {
    id: generateId(),
    name,
    enabled,
    isDefault,
    charges: [...intradayCharges, ...deliveryCharges],
    gstOnCharges,
  };
}

export function getDefaultBrokerConfigs(): Broker[] {
  return [
    createBroker({ name: 'Groww', isDefault: true }),
    createBroker({ name: 'Zerodha' }),
    createBroker({ name: 'Angel One', enabled: false }),
  ];
}
