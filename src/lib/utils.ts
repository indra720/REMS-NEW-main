import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = "₹"): string {
  const num = parseFloat(price);
  if (isNaN(num)) {
    return String(price);
  }
  if (num >= 10000000) {
    return `${currency} ${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `${currency} ${(num / 100000).toFixed(2)} Lac`;
  }
  return `${currency} ${num.toLocaleString("en-IN")}`;
}
