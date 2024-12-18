"use client";

import { useEffect, useState } from "react";
import { useCurrencyStore } from "@/lib/stores/currencyStore";
import { getCurrencyDetails } from "@/lib/utils/currency";

export function CurrencyInitializer() {
  const setDetails = useCurrencyStore((state) => state.setDetails);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      async function init() {
        const currency = await getCurrencyDetails();
        setDetails(currency.symbol, currency.code, currency.rate);
        setIsInitialized(true);
      }
      init();
    }
  }, [setDetails, isInitialized]);

  return null;
}
