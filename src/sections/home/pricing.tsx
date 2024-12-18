import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PriceDisplay } from "@/components/pricing/PriceDisplay";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-stone-950 text-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400">
            One price, everything included. No hidden fees.
          </p>
        </div>

        {/* Static Waveform Price Display */}
        <div className="relative h-48 mb-16">
          {/* Static Waveform Bars */}
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            {[...Array(80)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-teal-500 to-blue-500 rounded-full opacity-50"
                style={{
                  height: `${Math.sin(i * 0.2) * 30 + 40}%`,
                }}
              />
            ))}
          </div>

          {/* Price Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-stone-950/80 px-12 py-8 rounded-2xl backdrop-blur-sm">
              <PriceDisplay />
              <div className="text-2xl text-white text-center font-medium">
                per custom song
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Studio Recording", time: "0:00" },
            { title: "5 Free Revisions", time: "1:30" },
            { title: "Real Musicians", time: "2:45" },
            { title: "Fast Delivery", time: "3:15" },
            { title: "Full Rights", time: "4:00" },
            { title: "High Quality Files", time: "4:30" },
          ].map((feature) => (
            <div key={feature.title} className="relative overflow-hidden group">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors">
                {/* Timeline Marker */}
                <div className="text-xs text-gray-500 mb-2">{feature.time}</div>

                {/* Feature Title */}
                <h3 className="font-medium text-white mb-1">{feature.title}</h3>

                {/* Playhead Line */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-blue-500 w-0 group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link href="/create" className="block mt-12">
          <Button className="w-full py-8 text-lg bg-white text-black hover:bg-gray-100 group relative">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-y-0 right-8 flex items-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2">
              <div className="w-1 h-4 bg-stone-950 rounded-full animate-pulse" />
              <div className="w-1 h-6 bg-stone-950 rounded-full animate-pulse mx-1" />
              <div className="w-1 h-4 bg-stone-950 rounded-full animate-pulse" />
            </div>
          </Button>
        </Link>
      </div>
    </section>
  );
}
