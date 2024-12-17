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

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Cart() {
  const song = useStore((state: StoreState) => state.song);
  const isComplete =
    song.tags.genre && song.tags.vocalStyle && song.story.prompts;

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(song),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (!stripe) throw new Error("Stripe failed to load");

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe error:", error);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row h-full gap-8">
      <div className="w-full md:w-3/5 bg-[#f3f1eb] px-4 md:px-16 max-w-2xl md:max-w-none mx-auto space-y-3 md:space-y-8 py-3 md:py-12 md:border-r-2 border-[#f3f1eb] h-full">
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
          >
            <h1 className="text-xl font-bold mb-6 mx-1.5">Your Cart</h1>
            <motion.div
              layout
              className="flex items-center gap-2 px-2 md:gap-6 md:p-6 md:rounded-lg md:bg-white/50"
            >
              <Image
                src="/stock-spanish-1.jpg"
                alt="Musicians on stage"
                width={100}
                height={100}
                className="rounded-xl shadow object-cover w-20 h-20 md:w-32 md:h-32"
              />
              <div className="flex-1 min-w-0 px-2">
                <h2 className="text-xl md:text-2xl font-bold truncate">
                  Original Song
                </h2>
                <p className="text-xs md:text-sm text-stone-500 mt-1">
                  A {song.tags.genre}, {song.tags.vibe.join(", ")} song for{" "}
                  {song.about.name}
                </p>
                <p className="text-xs md:text-sm text-stone-500 mt-1">
                  {song.tags.vocalStyle} vocals • {song.tags.tempo} tempo
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 ml-2">
                <div className="text-xl md:text-2xl font-bold">$200.00</div>
                <div className="flex gap-1 md:gap-2">
                  <Link href="/create/options">
                    <Button variant="ghost" size="sm" className="px-2 md:px-3">
                      Edit
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2 md:px-3"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Song</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this song from your
                          cart?
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

      <div className="w-full md:w-2/5 bg-[#fbf9f6] h-full p-4 md:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 md:space-y-8 max-w-[400px] mx-auto md:mt-[100px]"
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
                  <span className="font-medium">$200.00</span>
                </div>

                {song.options.deliveryTime === "rush" && (
                  <div className="flex justify-between py-2 text-lg">
                    <span>Rush Delivery</span>
                    <span className="font-medium">$25.00</span>
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

          <div className="space-y-4 border-t pt-6">
            <div className="flex justify-between py-2 text-lg">
              <span>Subtotal</span>
              <span className="font-medium">
                ${song.options.deliveryTime === "rush" ? "225.00" : "200.00"}
              </span>
            </div>
            <div className="flex justify-between py-2 text-lg">
              <span>Service Fee (5%)</span>
              <span className="font-medium">
                ${song.options.deliveryTime === "rush" ? "11.25" : "10.00"}
              </span>
            </div>
            <div className="flex justify-between py-2 text-2xl font-bold">
              <span>Total</span>
              <span>
                ${song.options.deliveryTime === "rush" ? "236.25" : "210.00"}
              </span>
            </div>
          </div>

          <Button
            className="w-full rounded-full bg-blue-600 text-lg hover:bg-blue-700 py-7 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:hover:bg-stone-300"
            size="lg"
            disabled={!isComplete}
            onClick={handleCheckout}
          >
            <LockKeyhole className="mr-2 h-5 w-5" />
            Secure Checkout
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
  );
}
