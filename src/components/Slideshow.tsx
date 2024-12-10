import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Slide } from "@/sections/home/reviews/data";
import { Card } from "@/components/ui/Card";
import { LucideStar } from "lucide-react";
import parse from "html-react-parser";
import Image from "next/image";

const Slideshow: React.FC<{ slide: Slide }> = ({
  slide: { lyrics, requirements, review, video },
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full max-w-[90vw]"
    >
      <CarouselPrevious />
      <CarouselContent className="z-50 m-auto flex items-center justify-center">
        <CarouselItem className="md:basis-1/4 p-2">
          <Card
            className={`text-stone-700 bg-cover bg-center text-4xl uppercase text-left p-6`}
            style={{ backgroundImage: `url(${requirements.bg})` }}
          >
            <div className="whitespace-pre-line">
              {parse(requirements.text, {
                replace: (node) => {
                  if (node.type === "tag" && node.name === "strong") {
                    return (
                      <strong className="font-bold text-[#262420]">
                        {node.children[0].type === "text"
                          ? node.children[0].data
                          : ""}
                      </strong>
                    );
                  }
                },
              })}
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem className="md:basis-1/4 p-2">
          <Card
            style={{ backgroundImage: `url(${lyrics.bg})` }}
            className={`text-stone-600 bg-cover bg-center text-4xl font-extrabold text-left p-6 relative`}
          >
            <div className="bg-black/30 p-3 rounded-xl absolute top-6 right-6">
              <Image src="/note.avif" alt="play icon" width={24} height={24} />
            </div>
            <div className="whitespace-normal max-w-[75%] italic">
              {parse(
                lyrics.text
                  .split("\n")
                  .map((line, i) => {
                    const opacity = 100 - i * 20;
                    return `<span class="opacity-${opacity} block mb-2">${line}</span>`;
                  })
                  .join(""),
                {
                  replace: (node) => {
                    if (node.type === "text") {
                      return node.data;
                    }
                  },
                }
              )}
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem className={`md:basis-${expanded ? "1/2" : "1/4"} p-2`}>
          <Card onClick={toggleExpand}>
            {expanded ? (
              <div className="relative">
                <video
                  src={video.src}
                  controls
                  autoPlay
                  onPause={() => setExpanded(false)}
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={video.img}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <rect
                      width="100"
                      height="100"
                      rx="50"
                      fill="white"
                      fillOpacity="0.47"
                    />
                    <path
                      d="M41.1139 69.8302C42.0321 70.2546 42.9751 70.1215 43.95 69.4391L67.7229 52.9904C68.123 52.7339 68.4529 52.3495 68.6744 51.8818C68.8959 51.4141 68.9999 50.8823 68.9743 50.3481C68.9908 49.8217 68.8826 49.3004 68.6616 48.842C68.4407 48.3835 68.1157 48.0061 67.7229 47.7516L43.95 31.2071C43.5441 30.9056 43.0829 30.7219 42.6045 30.6713C42.1261 30.6206 41.6443 30.7045 41.199 30.9159C40.2525 31.3361 39.781 32.1351 39.781 33.3126V67.3336C39.781 68.5403 40.2241 69.3725 41.1139 69.8302Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            )}
          </Card>
        </CarouselItem>
        <CarouselItem className="md:basis-1/4 p-2">
          <Card className="bg-[#fffdf6] ">
            <div className="flex justify-center gap-3 mt-4">
              {[...Array(5)].map((_, i) => (
                <LucideStar
                  key={i}
                  className="w-12 h-12 fill-[#f3744f] text-[#f3744f]"
                />
              ))}
            </div>
            <div className="mt-8 px-4 text-[#262420] italic">
              &ldquo;{review}&rdquo;
            </div>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  );
};
export default Slideshow;
