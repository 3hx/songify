"use client";

import { useEffect } from "react";
import { useCurrencyStore } from "@/lib/stores/currencyStore";

interface CurrencyDetails {
  symbol: string;
  code: string;
  rate: number;
}

export function CurrencyInitializer({
  currency,
}: {
  currency: CurrencyDetails;
}) {
  const setDetails = useCurrencyStore((state) => state.setDetails);

  useEffect(() => {
    setDetails(currency.symbol, currency.code, currency.rate);
  }, [currency, setDetails]);

  return null;
}
