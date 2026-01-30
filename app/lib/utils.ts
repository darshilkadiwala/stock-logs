import { v7 as uuidV7 } from 'uuid';

/**
 * Generate unique ID
 */
export function generateId(): string {
  return uuidV7();
}
