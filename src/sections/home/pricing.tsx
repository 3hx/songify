import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#f3f1eb]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Simple, transparent pricing</h2>
        <p className="text-xl text-gray-700 mb-12">
          One price, everything included
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="space-y-4">
            <div className="text-5xl font-bold">$200</div>
            <p className="text-gray-600">per song</p>
          </div>

          <div className="mt-8 space-y-4 max-w-md mx-auto text-left">
            <div className="flex gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span>Professional recording with real instruments</span>
            </div>
            <div className="flex gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span>Unlimited streaming and downloads</span>
            </div>
            <div className="flex gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span>Up to 5 lyric revisions included</span>
            </div>
            <div className="flex gap-3">
              <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span>Delivery within 7 days</span>
            </div>
          </div>

          <Link href="/create" className="block mt-8">
            <Button className="w-full py-6 text-lg" size="lg">
              Start Your Song
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
