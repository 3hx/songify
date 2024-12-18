"use client";

import { useEffect, useState } from "react";
import { getCurrencyDetails } from "@/lib/utils/currency";
import { PRICES } from "@/lib/constants/prices";

interface CurrencyDetails {
  symbol: string;
  code: string;
  rate: number;
}

export function PriceDisplay() {
  const [currency, setCurrency] = useState<CurrencyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrency() {
      try {
        const details = await getCurrencyDetails();
        setCurrency(details);
      } catch (error) {
        console.error("Failed to fetch currency:", error);
        setCurrency({ symbol: "$", code: "USD", rate: 1 });
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrency();
  }, []);

  if (isLoading) {
    return (
      <div className="text-7xl font-bold text-white mb-2 tabular-nums animate-pulse">
        $---
      </div>
    );
  }

  const formattedPrice = currency
    ? `${currency.symbol}${(PRICES.basePrice * currency.rate).toFixed(2)}`
    : `$${PRICES.basePrice.toFixed(2)}`;

  return (
    <div className="text-7xl font-bold text-white mb-2 tabular-nums">
      {formattedPrice}
    </div>
  );
}
