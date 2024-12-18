"use client";

import {
  useCurrencyStore,
  getFormattedPrice,
} from "@/lib/stores/currencyStore";
import { PRICES } from "@/lib/constants/prices";
import { useStore } from "@/stores/song/useSongStore";

export function CartTotal() {
  const { symbol, rate } = useCurrencyStore();
  const song = useStore((state) => state.song);

  const basePrice = PRICES.basePrice;
  const rushFee = song.options.deliveryTime === "rush" ? PRICES.rushFee : 0;
  const total = basePrice + rushFee;

  return (
    <div className="space-y-4 border-t pt-6">
      <div className="flex justify-between py-2 text-2xl font-bold">
        <span>Total</span>
        <span className="tabular-nums">
          {getFormattedPrice(total, { symbol, rate })}
        </span>
      </div>
    </div>
  );
}
