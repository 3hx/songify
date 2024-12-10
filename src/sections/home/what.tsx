import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const What = () => {
  return (
    <section className="py-24 mt-4">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div
          className="bg-contain bg-no-repeat bg-top pt-[240px] pb-[60px]"
          style={{
            backgroundImage:
              "url('https://content.songfinch.com/static/customer/home/what_is_bg.png')",
          }}
        >
          <h2 className="text-4xl font-bold mb-4 mt-16">
            What is a custom song?
          </h2>
          <p className="text-2xl text-gray-700 mb-8">
            It&apos;s a one-of-a-kind, radio-quality song created for you based
            on your stories, memories, and ideas. Our community of the best
            singers, songwriters, and musical talent will write and record your
            custom song in 7 days or less.
          </p>
        </div>

        <h2 className="text-4xl font-bold mt-8 mb-8">How it works</h2>
        <div className="mb-8">
          <a
            className="videoPlayer cursor-pointer"
            href="#"
            aria-label="play video how it works?"
          >
            <div className="relative">
              <Image
                className="w-[615px] m-auto rounded-lg shadow-lg"
                alt="play video how it works?"
                src="/what.avif"
                width={615}
                height={615}
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  className="playVideoIcon"
                >
                  <g>
                    <rect
                      width="100"
                      height="100"
                      rx="50"
                      fill="white"
                      fillOpacity="0.47"
                    ></rect>
                    <path
                      d="M41.1139 69.8302C42.0321 70.2546 42.9751 70.1215 43.95 69.4391L67.7229 52.9904C68.123 52.7339 68.4529 52.3495 68.6744 51.8818C68.8959 51.4141 68.9999 50.8823 68.9743 50.3481C68.9908 49.8217 68.8826 49.3004 68.6616 48.842C68.4407 48.3835 68.1157 48.0061 67.7229 47.7516L43.95 31.2071C43.5441 30.9056 43.0829 30.7219 42.6045 30.6713C42.1261 30.6206 41.6443 30.7045 41.199 30.9159C40.2525 31.3361 39.781 32.1351 39.781 33.3126V67.3336C39.781 68.5403 40.2241 69.3725 41.1139 69.8302Z"
                      fill="white"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </a>
        </div>

        <p className="text-2xl text-gray-700 mb-8">
          It&apos;s easy to get started. In a few short steps, you&apos;ll be on
          your way to a radio-quality custom song.
        </p>

        <div className="space-y-4">
          <Button variant="default" asChild>
            <Link href="/song-builder">START YOUR SONG</Link>
          </Button>
          <div>
            <Link
              href="/learn-more"
              className="inline-block text-gray-800 font-semibold hover:text-primary transition-colors text-sm tracking-wider"
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default What;
