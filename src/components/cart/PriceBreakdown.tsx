"use client";

import { useCurrencyStore } from "@/lib/stores/currencyStore";
import { formatPrice } from "@/lib/utils/currency";

export function PriceBreakdown({ rushDelivery }: { rushDelivery: boolean }) {
  const { symbol, rate } = useCurrencyStore();

  const basePrice = 199.99;
  const rushFee = rushDelivery ? 99.99 : 0;
  const total = basePrice + rushFee;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Base Price:</span>
        <span>{formatPrice(basePrice, rate, symbol)}</span>
      </div>
      {rushDelivery && (
        <div className="flex justify-between">
          <span>Rush Fee:</span>
          <span>{formatPrice(rushFee, rate, symbol)}</span>
        </div>
      )}
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>{formatPrice(total, rate, symbol)}</span>
      </div>
    </div>
  );
}
