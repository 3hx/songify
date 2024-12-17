"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Info, Clock, Music2 } from "lucide-react";

export default function OriginalSong() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Column - Image */}
        <div>
          <Image
            src="/product.avif"
            alt="Original Song"
            width={600}
            height={600}
            className="rounded-xl shadow-lg"
          />
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Original Song</h1>
          <div className="space-y-2">
            <div className="text-3xl font-bold">$199.99</div>
            <p className="text-gray-600">
              or 4 interest-free payments of $50.00 with{" "}
              <span className="font-semibold">klarna</span>
            </p>
          </div>

          <Button
            onClick={() => router.push("/create")}
            className="w-full py-6 text-lg"
          >
            Start Your Song
          </Button>

          <div className="border-t pt-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Info className="h-5 w-5" />
              Product Details
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Preserve your memories in a custom song from scratch by a real
              professional artist. Transport them back to their most treasured
              moments. It&apos;s simple and quick, and it will feel like you
              spent months planning and coordinating such a special,
              personalized gift.
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-5 w-5" />
              Delivery: 1-7 days
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Music2 className="h-5 w-5" />
              How it works
            </h2>
            <ol className="space-y-4 list-decimal list-inside text-gray-600">
              <li>
                Set the stage by letting us know the special occasion and who
                the song is for.
              </li>
              <li>
                Tell us which artist you have in mind, or let us suggest a few
                based on your genre, vibe, and tempo preferences.
              </li>
              <li>
                Use our prompts, suggestions, and examples to craft your story
                and details. You&apos;ll be amazed at how easily it all unfolds!
              </li>
              <li>
                Finally, your selected artist will take the reins, transforming
                your story and vision into a one-of-a-kind custom song.
              </li>
              <li>
                Head over to your personal song page to listen, read the lyrics,
                learn about the artist, and easily share with friends and family
                to comment and join in the experience!
              </li>
            </ol>
          </div>

          <div className="border-t pt-6">
            <p className="text-gray-600">
              All our Original Custom Songs come with access to our lyric
              editing tool where you can request up to 5 lines of lyrical
              revisions to your song at no additional charge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
