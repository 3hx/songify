"use client";
import { Button } from "@/components/ui/button";
import { LockKeyhole } from "lucide-react";
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
    <div className="w-full flex flex-col md:flex-row h-full">
      <div className="w-full md:w-3/5 bg-[#f3f1eb] px-6 md:px-12 max-w-2xl md:max-w-none mx-auto space-y-4 py-8 md:border-r-2 border-[#f3f1eb] h-full">
        <Link className="sticky top-0 left-0 m-4" href="/">
          <Image
            src="/logo.png"
            alt="Bill Logo"
            width={40}
            height={20}
            className="mb-8"
          />
        </Link>

        {isComplete ? (
          <>
            <h1 className="text-xl font-bold mb-6 mx-4">Your Cart</h1>
            <div className="flex items-center gap-4  p-4 rounded-md">
              <Image
                src="/stock-spanish-1.jpg"
                alt="Musicians on stage"
                width={100}
                height={100}
                className="rounded-xl mr-2 shadow object-cover w-32 h-32"
              />
              <div className="flex-1 ">
                <h2 className="text-2xl font-bold">Original Song</h2>
                <p className="text-sm text-stone-500">
                  A {song.tags.genre}, {song.tags.vibe.join(", ")} song for{" "}
                  {song.about.name}
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  {song.tags.vocalStyle} vocals • {song.tags.tempo} tempo
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-2xl font-bold">$200.00</div>
                <div className="flex gap-2">
                  <Link href="/create/options">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm">
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
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6">Your Cart is empty</h1>
            <p>Not sure where to start?</p>
            <Link href="/create">
              <Button variant="default">Start your song</Button>
            </Link>
          </>
        )}
      </div>

      <div className="w-full md:w-2/5 bg-[#fbf9f6] h-full p-6 space-y-6">
        <div className="space-y-4 max-w-[400px] mx-auto">
          <h3 className="font-bold text-xl">Order Details</h3>
          <div className="flex justify-between py-2">
            <span>Original Song</span>
            <span>$199.99</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Extra Verse</span>
            <span>$64.99</span>
          </div>

          <div className="relative flex gap-2 items-center">
            <Input
              placeholder="Enter code"
              className="flex-1 pr-24"
              onChange={(e) => {
                const url = new URL(window.location.href);
                url.searchParams.set("coupon", e.target.value);
                window.history.replaceState({}, "", url);
              }}
            />
            <Button variant="secondary" className="absolute right-0 ">
              Apply
            </Button>
          </div>

          <div className="flex justify-between py-2 border-t">
            <span>Subtotal</span>
            <span>$269.98</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Service Fee</span>
            <span>$9.95</span>
          </div>
          <div className="flex justify-between py-2 text-xl font-bold">
            <span>Total</span>
            <span>$279.93</span>
          </div>

          <Button
            className="w-full rounded-full bg-blue-600 text-lg hover:bg-blue-700 py-6"
            size="lg"
            disabled={!isComplete}
            onClick={handleCheckout}
          >
            <LockKeyhole className="mr-2 h-4 w-4" />
            Secure Checkout
          </Button>

          <Image
            src="/cart_secure_badge.png"
            alt="Security Badge"
            width={330}
            height={169}
            className="mx-auto mt-4"
          />
        </div>
      </div>
    </div>
  );
}
