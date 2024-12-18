"use client";

import { formatPrice } from "@/lib/utils/currency";
import { useCurrencyStore } from "@/lib/stores/currencyStore";

const AnnouncementBanner = () => {
  const { symbol, rate } = useCurrencyStore();

  return (
    <div className="bg-foreground">
      <div className="text-center">
        <div className="font-semibold tabular-nums text-background py-2 text-[13px] leading-none md:text-sm">
          {/* Show different text based on screen size */}
          <span className="md:hidden">
            LIMITED TIME: {formatPrice(25, rate, symbol)} OFF WITH SAVE25
          </span>
          <span className="hidden md:inline">
            LIMITED TIME: {formatPrice(25, rate, symbol)} OFF WITH SAVE25,{" "}
            {formatPrice(50, rate, symbol)} OFF ORDERS OF{" "}
            {formatPrice(325, rate, symbol)}+ WITH SAVE50, OR{" "}
            {formatPrice(75, rate, symbol)} OFF ORDERS OF{" "}
            {formatPrice(425, rate, symbol)}+ WITH SAVE75
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
