import { v7 as uuidV7 } from 'uuid';

/**
 * Utility functions for formatting and calculations
 */

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return uuidV7();
}
