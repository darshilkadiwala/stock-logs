import { z } from 'zod';

import { APPLY_ON, CHARGE_ROUNDING_TYPES, CHARGE_TYPES } from '@/constants/charges';
import { EXCHANGES, TRADE_TYPES } from '@/constants/trades';

import type { Broker, BrokerSettings, ChargeConfig } from '@/types/charge';

/**
 * Zod schema for charge configuration (for future validation)
 */
export const chargeConfigSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  chargeType: z.enum(Object.values(CHARGE_TYPES)),
  tradeType: z.enum(Object.values(TRADE_TYPES)),
  value: z.number().min(0),
  min: z.number().min(0).optional(),
  max: z.number().min(0).optional(),
  applyOn: z.enum(Object.values(APPLY_ON)),
  exchange: z.enum(Object.values(EXCHANGES)),
  rounding: z.enum(Object.values(CHARGE_ROUNDING_TYPES)),
  hint: z.string().optional(),

  /** internal fields */
  sortOrder: z.number().optional().default(0),
}) as z.ZodType<ChargeConfig>;

/**
 * Zod schema for broker configuration (for future validation)
 */
export const brokerConfigSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  enabled: z.boolean(),
  isDefault: z.boolean(),
  charges: z.array(chargeConfigSchema),
  customCharges: z.array(chargeConfigSchema),
}) as z.ZodType<Broker>;

/**
 * Zod schema for broker settings (for future validation)
 */
export const brokerSettingsSchema = z.object({
  brokers: z.array(brokerConfigSchema),
  defaultBrokerId: z.string(),
}) as z.ZodType<BrokerSettings>;
