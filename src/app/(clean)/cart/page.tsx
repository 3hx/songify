"use client";
import { Button } from "@/components/ui/button";
import { LockKeyhole, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/stores/song/useSongStore";
import { StoreState } from "@/stores/song/types";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { loadStripe } from "@stripe/stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { SEO } from "@/components/SEO";
import { CartTotal } from "@/components/cart/CartClient";
import { PRICES } from "@/lib/constants/prices";
import { getFormattedPrice } from "@/lib/stores/currencyStore";
import { useCurrencyStore } from "@/lib/stores/currencyStore";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Cart() {
  const song = useStore((state: StoreState) => state.song);
  const { symbol, rate, code } = useCurrencyStore();
  const isComplete =
    song.tags.genre && song.tags.vocalStyle && song.story.prompts;
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          song,
          currency: {
            symbol,
            code,
            rate,
          },
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (!stripe) throw new Error("Stripe failed to load");

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe error:", error);
        // You might want to show an error toast here
      }
    } catch (err) {
      console.error("Checkout error:", err);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Cart"
        description="Review and complete your custom song order"
      />
      <div className="w-full flex flex-col md:flex-row h-full gap-8 min-w-[320px]">
        <div className="w-full md:w-3/5 bg-[#f3f1eb] px-4 md:px-16 max-w-2xl md:max-w-none mx-auto space-y-3 md:space-y-8 py-3 md:py-12 md:border-r-2 border-[#f3f1eb] h-full min-w-[320px]">
          <Link className="relative top-0 left-0 m-4" href="/">
            <Image
              src="/logo.png"
              alt="Bill Logo"
              width={40}
              height={20}
              className="mb-8"
            />
          </Link>

          {isComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <h1 className="text-2xl font-bold mb-6 mx-1.5">Your Cart</h1>
              <div className="sticky top-4">
                <motion.div
                  layout
                  className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-stone-100 via-stone-50/80 to-stone-50/90 shadow-[0_0_1px_rgba(0,0,0,0.08),0_2px_12px_-3px_rgba(0,0,0,0.05)] border border-stone-100/80 hover:shadow-[0_0_1px_rgba(0,0,0,0.08),0_2px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 w-full"
                >
                  <div className="relative group w-full lg:w-auto">
                    <Image
                      src="/song.jpg"
                      alt="Musicians on stage"
                      width={302}
                      height={200}
                      className="rounded-xl sm:rounded-2xl object-cover w-full h-48 sm:h-56 lg:w-36 lg:h-36 transition-all duration-500 group-hover:scale-[1.02] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]"
                    />
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-black/[0.03] bg-gradient-to-t from-black/5 to-black/2" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-4">
                      <div className="space-y-2 sm:space-y-3 w-full sm:w-auto">
                        <div className="flex justify-between sm:block">
                          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-stone-900">
                            Original Song
                          </h2>
                          <div className="block sm:hidden text-lg font-semibold text-stone-900 tabular-nums">
                            {getFormattedPrice(PRICES.basePrice, {
                              symbol,
                              rate,
                            })}
                          </div>
                        </div>
                        <p className="text-sm text-stone-500">
                          A personalized song for{" "}
                          <span className="font-medium text-stone-800">
                            {song.about.name}
                          </span>
                        </p>
                      </div>

                      <div className="hidden sm:block text-xl lg:text-2xl font-bold text-stone-900 tabular-nums">
                        {getFormattedPrice(PRICES.basePrice, { symbol, rate })}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-stone-100/80 text-xs font-medium text-stone-800 ring-1 ring-stone-200/80">
                        {song.tags.genre}
                      </span>
                      {song.tags.vibe.map((v) => (
                        <span
                          key={v}
                          className="inline-flex items-center px-2.5 py-1 rounded-full bg-stone-100/80 text-xs font-medium text-stone-800 ring-1 ring-stone-200/80"
                        >
                          {v}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 items-center text-[13px] text-stone-600 font-medium pt-1">
                      <span className="inline-flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-stone-400" />
                        {song.tags.vocalStyle} vocals
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-stone-400" />
                        {song.tags.tempo} tempo
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2 sm:pt-3">
                      <Link
                        href="/create/options"
                        className="flex-1 sm:flex-none"
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full sm:w-auto h-9 text-stone-600 hover:text-stone-900 hover:bg-stone-100/70 transition-colors duration-200 font-medium"
                        >
                          Edit details
                        </Button>
                      </Link>
                      <div className="hidden sm:block h-4 w-px bg-stone-200/70" />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-full sm:w-auto text-stone-600 hover:text-red-600 hover:bg-red-50/80 transition-colors duration-200 font-medium"
                          >
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Song</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this song from
                              your cart?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => useStore.getState().resetSong()}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 md:space-y-6"
            >
              <ShoppingCart className="w-24 h-24 mx-auto text-stone-300" />

              <div className="space-y-3">
                <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
                <p className="text-stone-600">
                  Create a personalized song in 4 easy steps
                </p>
              </div>

              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <Link href="/create">
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
                    size="lg"
                  >
                    Start Creating
                  </Button>
                </Link>

                <Link href="/examples">
                  <Button variant="outline" className="w-full">
                    Listen to Examples
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        <div className="w-full md:w-2/5 bg-white h-full p-4 md:p-12 min-w-[320px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="sticky top-4 space-y-6 md:space-y-8 max-w-[400px] mx-auto md:mt-[100px]"
          >
            <h3 className="font-bold text-2xl text-center">Order Details</h3>

            <AnimatePresence mode="wait">
              {isComplete ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between py-2 text-lg">
                    <span>Original Song</span>
                    <span className="font-medium tabular-nums">
                      {getFormattedPrice(PRICES.basePrice, { symbol, rate })}
                    </span>
                  </div>

                  {song.options.deliveryTime === "rush" && (
                    <div className="flex justify-between py-2 text-lg">
                      <span>Rush Delivery</span>
                      <span className="font-medium tabular-nums">
                        {getFormattedPrice(PRICES.rushFee, { symbol, rate })}
                      </span>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-6 md:py-12 text-center space-y-4"
                >
                  <p className="text-stone-500 text-lg">
                    Add a song to your cart to see order details
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative flex gap-2 items-center">
              <Input
                placeholder="Enter promo code"
                className="flex-1 pr-24 h-12"
                onChange={(e) => {
                  const url = new URL(window.location.href);
                  url.searchParams.set("coupon", e.target.value);
                  window.history.replaceState({}, "", url);
                }}
              />
              <Button variant="secondary" className="absolute right-0 h-12">
                Apply
              </Button>
            </div>

            <CartTotal />

            <Button
              className="w-full rounded-full bg-blue-600 text-lg hover:bg-blue-700 py-7 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:hover:bg-stone-300"
              size="lg"
              disabled={!isComplete || isLoading}
              onClick={handleCheckout}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <LockKeyhole className="mr-2 h-5 w-5" />
                  Secure Checkout
                </>
              )}
            </Button>

            <div className="flex items-center justify-center mt-4">
              <Image
                src="/cart_secure_badge.png"
                alt="Secure checkout powered by Stripe"
                width={400}
                height={100}
                className="opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
