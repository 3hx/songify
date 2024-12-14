import Hero from "@/sections/home/hero";
import What from "@/sections/home/what";
import Reviews from "@/sections/home/reviews/index";
import { FAQ } from "@/sections/home/faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <What />
      <Reviews />
      <FAQ />
    </main>
  );
}
