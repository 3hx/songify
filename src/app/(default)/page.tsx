import Hero from "@/sections/home/hero";
import What from "@/sections/home/what";
import Reviews from "@/sections/home/reviews/index";
import { Pricing } from "@/sections/home/pricing";
import { FAQ } from "@/sections/home/faq";
import { SEO } from "@/components/SEO";

export default function Home() {
  return (
    <>
      <SEO />
      <main>
        <Hero />
        <What />
        <Reviews />
        <Pricing />
        <FAQ />
      </main>
    </>
  );
}
