"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/stores/song/useSongStore";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const resetSong = useStore((state) => state.resetSong);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    resetSong();
  }, [resetSong]);

  return (
    <div className="h-screen flex items-start py-12 md:py-32 justify-center bg-stone-50">
      <div className="w-full max-w-sm bg-stone-100 p-8 border-stone-300">
        <div className="space-y-6">
          <div className="bg-green-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-semibold text-center text-stone-800">
              Order Confirmed
            </h1>
            <p className="text-sm text-center text-stone-600">
              We&apos;ll start working on your custom song right away.
            </p>
          </div>

          <div className="text-xs text-center bg-stone-50 py-2 rounded">
            Order ID: {sessionId?.slice(-8)}
          </div>

          <Link href="/" className="block">
            <Button className="w-full bg-stone-800 hover:bg-stone-700">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
