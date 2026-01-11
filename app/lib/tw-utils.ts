import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges css class names.
 *
 * @param {...ClassValue[]} inputs - CSS class names to be combined and merged.
 * @returns {string} - A string of merged css class names.
 *
 * @example
 * cn('bg-red-500', 'text-white', 'bg-blue-500')
 * // returns 'text-white bg-blue-500'
 *
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const focusInput = cn([
  // base
  'focus-within:ring-2 focus:ring-2 focus-visible:ring-4',
  // ring color
  'focus-within:ring-primary focus:ring-primary focus-visible:ring-primary',
  // border color
  'focus-within:border-input focus:border-input focus-visible:border-input',
  'focus-within:outline-none focus:outline-none focus-visible:outline-none',
  'focus-within:ring-ring focus:ring-ring focus-visible:ring-ring',
  'focus-within:ring-offset-2 focus:ring-offset-2 focus-visible:ring-offset-2',
  'focus-within:ring-offset-background focus:ring-offset-background focus-visible:ring-offset-background',
]);