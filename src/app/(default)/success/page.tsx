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
    // Reset the song form after successful payment
    resetSong();
  }, [resetSong]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f1eb]">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-sm">
        <div className="text-center space-y-6">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your order. We&apos;ll start working on your custom
            song right away.
          </p>
          <div className="text-sm text-gray-500">
            Order ID: {sessionId?.slice(0, 8)}
          </div>
          <div className="pt-6">
            <Link href="/">
              <Button className="w-full">Return Home</Button>
            </Link>
          </div>
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
