"use client";

import { useState } from "react";
import Slideshow from "../../../components/Slideshow";
import { Tag, SLIDES, TAGS } from "./data";
import { Button } from "@/components/ui/button";

const Reviews = () => {
  const [activeTag, setActiveTag] = useState<Tag>("My daughter");

  return (
    <section className="-mx-[18rem] bg-white py-24">
      <div className="px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Over 350,000 custom songs created for
          <br className="hidden md:block" /> people just like you
        </h2>
        <p className="text-xl text-gray-700 mb-12">
          Check out some examples of how our artists brought stories to life
          through music.
        </p>

        <div className="space-x-4 mb-16">
          {TAGS.map((text) => (
            <button
              key={text}
              onClick={() => setActiveTag(text as Tag)}
              className={`px-6 py-2 transition-all duration-300 rounded-full uppercase tracking-wider text-sm font-bold text-gray-800 ${
                activeTag === text
                  ? "bg-[#262420] text-white"
                  : "bg-stone-300 hover:bg-stone-400"
              }`}
            >
              {text}
            </button>
          ))}
        </div>

        <div className="flex justify-center max-w-8xl mx-auto">
          <Slideshow slide={SLIDES[activeTag]} />
        </div>

        <div className="mt-12">
          <Button variant="default" asChild>
            <a href="/song-builder">START YOUR SONG</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
