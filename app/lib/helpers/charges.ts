import { CHARGE_TYPES, COMMON_CHARGE_CATEGORIES } from '@/constants/charges';
import { TRADE_TYPES } from '@/constants/trades';
import { generateId } from '@/lib/utils';

import type { Broker, ChargeConfig } from '@/types/charge';

// values of COMMON_CHARGE_CATEGORIES
type CommonChargeCategory = (typeof COMMON_CHARGE_CATEGORIES)[keyof typeof COMMON_CHARGE_CATEGORIES];

/**
 * Creates a default charge configuration
 */
function createDefaultCharge<T extends ChargeConfig['tradeType']>(
  name: CommonChargeCategory,
  chargeType: ChargeConfig['chargeType'],
  tradeType: T,
  value: number,
  options?: Omit<Partial<ChargeConfig>, 'id' | 'name' | 'chargeType' | 'tradeType' | 'value'>,
): ChargeConfig & { tradeType: T } {
  return {
    id: generateId(),
    name,
    chargeType,
    tradeType,
    value,
    ...options,
    applyOn: options?.applyOn || 'BOTH',
    exchange: options?.exchange || 'BOTH',
    rounding: options?.rounding || 'AUTO',
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
}: {
  name: string;
  isDefault?: boolean;
  enabled?: boolean;
}): Broker {
  type ChargeDescriptor = {
    name: CommonChargeCategory;
    chargeType: ChargeConfig['chargeType'];
    value: number;
    options?: Omit<Partial<ChargeConfig>, 'id' | 'name' | 'chargeType' | 'tradeType' | 'value'>;
  };

  function buildChargeRecord<
    T extends ChargeConfig['tradeType'],
    R extends Record<CommonChargeCategory, ChargeDescriptor>,
  >(tradeType: T, descriptors: R): { [K in keyof R]: ChargeConfig & { tradeType: T } } {
    return (Object.keys(descriptors) as CommonChargeCategory[]).reduce(
      (acc, name) => {
        const d = descriptors[name];
        acc[name as keyof R] = createDefaultCharge(d.name, d.chargeType, tradeType, d.value, d.options) as any;
        return acc;
      },
      {} as { [K in keyof R]: ChargeConfig & { tradeType: T } },
    );
  }

  const INTRADAY_DESCRIPTORS: Record<CommonChargeCategory, ChargeDescriptor> = {
    [COMMON_CHARGE_CATEGORIES.EQ_BROKERAGE]: {
      name: COMMON_CHARGE_CATEGORIES.EQ_BROKERAGE,
      chargeType: CHARGE_TYPES.PERCENTAGE_WITH_MIN_MAX,
      value: 0.1,
      options: { min: 5, max: 20 },
    },
    [COMMON_CHARGE_CATEGORIES.STT]: {
      name: COMMON_CHARGE_CATEGORIES.STT,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.025,
      options: { applyOn: 'SELL' },
    },
    [COMMON_CHARGE_CATEGORIES.STAMP]: {
      name: COMMON_CHARGE_CATEGORIES.STAMP,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.003,
      options: { applyOn: 'BUY' },
    },
    [COMMON_CHARGE_CATEGORIES.EX_TRANSACTION_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.EX_TRANSACTION_CHARGES,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.00297,
    },
    [COMMON_CHARGE_CATEGORIES.SEBI_TURNOVER_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.SEBI_TURNOVER_CHARGES,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.0001,
    },
    [COMMON_CHARGE_CATEGORIES.DP_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.DP_CHARGES,
      chargeType: CHARGE_TYPES.FIXED,
      value: 0,
    },
    [COMMON_CHARGE_CATEGORIES.IPFT_CHARGE]: {
      name: COMMON_CHARGE_CATEGORIES.IPFT_CHARGE,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.0001,
      options: { applyOn: 'BOTH', exchange: 'NSE' },
    },
    [COMMON_CHARGE_CATEGORIES.AUTO_SQUARE_OFF_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.AUTO_SQUARE_OFF_CHARGES,
      chargeType: CHARGE_TYPES.FIXED,
      value: 50,
      options: { applyOn: 'BOTH' },
    },
    [COMMON_CHARGE_CATEGORIES.PLEDGE_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.PLEDGE_CHARGES,
      chargeType: CHARGE_TYPES.FIXED,
      value: 20,
      options: { applyOn: 'BOTH' },
    },
    [COMMON_CHARGE_CATEGORIES.GST]: {
      name: COMMON_CHARGE_CATEGORIES.GST,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 18,
      options: { applyOn: 'BOTH' },
    },
  };

  const DELIVERY_DESCRIPTORS: Record<CommonChargeCategory, ChargeDescriptor> = {
    [COMMON_CHARGE_CATEGORIES.EQ_BROKERAGE]: {
      name: COMMON_CHARGE_CATEGORIES.EQ_BROKERAGE,
      chargeType: CHARGE_TYPES.PERCENTAGE_WITH_MIN_MAX,
      value: 0.1,
      options: { min: 5, max: 20 },
    },
    [COMMON_CHARGE_CATEGORIES.STT]: {
      name: COMMON_CHARGE_CATEGORIES.STT,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.1,
      options: { applyOn: 'SELL' },
    },
    [COMMON_CHARGE_CATEGORIES.STAMP]: {
      name: COMMON_CHARGE_CATEGORIES.STAMP,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.015,
      options: { applyOn: 'BUY' },
    },
    [COMMON_CHARGE_CATEGORIES.EX_TRANSACTION_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.EX_TRANSACTION_CHARGES,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.00297,
    },
    [COMMON_CHARGE_CATEGORIES.SEBI_TURNOVER_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.SEBI_TURNOVER_CHARGES,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.0001,
    },
    [COMMON_CHARGE_CATEGORIES.DP_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.DP_CHARGES,
      chargeType: CHARGE_TYPES.FIXED,
      value: 20,
      options: { applyOn: 'SELL' },
    },
    [COMMON_CHARGE_CATEGORIES.IPFT_CHARGE]: {
      name: COMMON_CHARGE_CATEGORIES.IPFT_CHARGE,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 0.0001,
      options: { applyOn: 'BOTH', exchange: 'NSE' },
    },
    [COMMON_CHARGE_CATEGORIES.AUTO_SQUARE_OFF_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.AUTO_SQUARE_OFF_CHARGES,
      chargeType: CHARGE_TYPES.FIXED,
      value: 0,
      options: { applyOn: 'BOTH' },
    },
    [COMMON_CHARGE_CATEGORIES.PLEDGE_CHARGES]: {
      name: COMMON_CHARGE_CATEGORIES.PLEDGE_CHARGES,
      chargeType: CHARGE_TYPES.FIXED,
      value: 20,
      options: { applyOn: 'BOTH' },
    },
    [COMMON_CHARGE_CATEGORIES.GST]: {
      name: COMMON_CHARGE_CATEGORIES.GST,
      chargeType: CHARGE_TYPES.PERCENTAGE,
      value: 18,
      options: { applyOn: 'BOTH' },
    },
  };

  const intradayCharges = buildChargeRecord(TRADE_TYPES.INTRADAY, INTRADAY_DESCRIPTORS);
  const deliveryCharges = buildChargeRecord(TRADE_TYPES.DELIVERY, DELIVERY_DESCRIPTORS);

  const allCharges = [...Object.values(intradayCharges), ...Object.values(deliveryCharges)];
  return {
    id: generateId(),
    name,
    enabled,
    isDefault,
    charges: allCharges,
    customCharges: [],
  };
}

export function getDefaultBrokerConfigs(): Broker[] {
  return [
    createBroker({ name: 'Groww', isDefault: true }),
    createBroker({ name: 'Zerodha' }),
    createBroker({ name: 'Angel One', enabled: false }),
  ];
}
