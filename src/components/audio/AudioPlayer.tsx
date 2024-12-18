import { useState, useRef, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Waves } from "lucide-react";
import Image from "next/image";

interface AudioPlayerProps {
  src: string;
  onNext?: () => void;
  onPrevious?: () => void;
  isPlaying: boolean;
  onPlayingChange: (playing: boolean) => void;
  title?: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
  minimal?: boolean;
}

export function AudioPlayer({
  src,
  onNext,
  onPrevious,
  isPlaying,
  onPlayingChange,
  title,
  description,
  tags,
  imageUrl,
  minimal = false,
}: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.preload = "auto";

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    isLoadedRef.current = false;
    setCurrentTime(0);
    setDuration(0);

    audio.src = src;
    audio.load();

    const handleCanPlay = () => {
      isLoadedRef.current = true;
      if (isPlaying) {
        audio.play().catch(() => onPlayingChange(false));
      }
    };

    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.pause();
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {});
      }
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isLoadedRef.current) return;

    if (isPlaying) {
      audio.play().catch(() => onPlayingChange(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, onPlayingChange]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current && isLoadedRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (minimal) {
    return (
      <div className="bg-stone-950 text-white p-4 w-full max-w-md rounded-xl flex flex-col gap-4">
        <audio
          ref={audioRef}
          src={src}
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={onNext}
          onError={(e) => console.error("Audio error:", e)}
        />

        {/* Title and Tags Row */}
        <div className="flex flex-col gap-2">
          {title && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-stone-400">{description}</p>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-stone-800 rounded-full text-stone-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Controls and Progress Rows */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              className="text-stone-400 hover:text-white transition-colors"
            >
              <SkipBack className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPlayingChange(!isPlaying)}
              className="h-14 w-14 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform flex items-center justify-center shadow-lg"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 translate-x-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="text-stone-400 hover:text-white transition-colors"
            >
              <SkipForward className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex items-center gap-3 px-1">
            <span className="text-xs font-medium text-stone-400 w-12 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={handleSliderChange}
              className="w-full"
            />
            <span className="text-xs font-medium text-stone-400 w-12">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 w-full max-w-5xl">
      {/* Image and Content Container */}
      <div className="flex flex-col md:flex-row items-center md:items-center gap-4 w-1/2">
        {/* Image Section - Hidden on Mobile */}
        {imageUrl && (
          <div className="hidden md:block shrink-0">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-stone-800 via-stone-800/50 to-stone-800/30 -m-0.5" />
              <Image
                src={imageUrl}
                alt={title || ""}
                width={56}
                height={56}
                className="rounded-full object-cover w-full h-full relative z-10"
              />
              {isPlaying && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20">
                  <Waves className="w-4 h-4 text-primary animate-pulse" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Title, Description and Tags Section */}
        <div className="flex flex-col gap-2">
          {title && (
            <h3 className="font-bold text-white text-center md:text-left">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-stone-400 text-center md:text-left">
              {description}
            </p>
          )}
          {tags && (
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-stone-800/50 text-stone-300 px-2 py-1 rounded-full border border-stone-700/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col gap-4 w-1/2">
        <div className="flex items-center justify-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <SkipBack className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPlayingChange(!isPlaying)}
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform flex items-center justify-center shadow-lg"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 translate-x-0.5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="text-stone-400 hover:text-white transition-colors"
          >
            <SkipForward className="h-6 w-6" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 px-1">
          <span className="text-xs font-medium text-stone-400 w-12 text-right">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={0.1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
          <span className="text-xs font-medium text-stone-400 w-12">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
