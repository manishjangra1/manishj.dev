import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export * from './utils/format';
export * from './utils/slug';
export * from './utils/scroll';
export * from './utils/clipboard';
export * from './utils/resume';
