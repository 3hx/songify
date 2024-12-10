import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="text-center relative h-[40rem] w-full">
      <div className="relative h-full">
        <div className="rounded-t-3xl overflow-hidden h-full">
          <div className="relative h-full">
            <video
              className="w-full h-full object-cover filter brightness-[1.15]"
              src="https://content.songfinch.com/res/songfinch/video/upload/content-files/sazugjofghipwtrhxj0e/1701861573.mp4?format=mp4"
              autoPlay
              loop
              muted
              playsInline
              disableRemotePlayback
            />
            <div className="absolute inset-0 bg-white/20"></div>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(0deg,rgb(243,241,235) 0%,rgba(243,241,235,0) 65%)",
            }}
          ></div>
        </div>

        <div className="absolute inset-x-0 -bottom-24 flex items-center justify-center z-20">
          <div className="max-w-[800px] mx-auto px-2.5 text-gray-900">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2.5 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.3)]">
              <span className="text-white">Create a moment that&apos;s</span>{" "}
              <br />
              truly unforgettable
            </h1>
            <p className="text-lg md:text-2xl mb-3 text-gray-800">
              Share your love with a one-of-a-kind custom song, created by a
              professional musician.
            </p>
            <Button className="mt-6" variant="default" asChild>
              <a href="/song-builder">Start Your Song</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
