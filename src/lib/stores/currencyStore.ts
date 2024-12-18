import { create } from "zustand";

type CurrencyStore = {
  symbol: string;
  code: string;
  rate: number;
  setDetails: (symbol: string, code: string, rate: number) => void;
};

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  symbol: "$",
  code: "USD",
  rate: 1,
  setDetails: (symbol, code, rate) => set({ symbol, code, rate }),
}));

// Server-side helper function
export function getFormattedPrice(
  price: number,
  currency: { symbol: string; rate: number }
) {
  return `${currency.symbol}${(price * currency.rate).toFixed(2)}`;
}
