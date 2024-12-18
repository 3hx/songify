import { Card } from "@/components/ui/Card";
import { Waves } from "lucide-react";

interface Example {
  title: string;
  description: string;
  category: string;
  genre: string;
  vocalStyle: string;
  audioUrl: string;
  imageUrl: string;
}

interface ExampleSongProps {
  example: Example;
  isSelected: boolean;
  isPlaying: boolean;
  onClick: () => void;
}

export function ExampleSong({
  example,
  isSelected,
  isPlaying,
  onClick,
}: ExampleSongProps) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
        isSelected
          ? "bg-stone-50 shadow-lg translate-y-[-2px]"
          : "hover:translate-y-[-2px]"
      }`}
    >
      <div className="aspect-video relative">
        <img
          src={example.imageUrl}
          alt={example.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isSelected ? "scale-[1.02]" : ""
          }`}
        />
        {isSelected && isPlaying && (
          <div className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-full">
            <Waves className="w-4 h-4 text-white animate-pulse" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold mb-1">{example.title}</h3>
        <p className="text-stone-600 text-sm line-clamp-2 mb-2">
          {example.description}
        </p>
        <div className="flex gap-2">
          <span className="text-xs bg-stone-100 px-2 py-1 rounded">
            {example.genre}
          </span>
          <span className="text-xs bg-stone-100 px-2 py-1 rounded">
            {example.vocalStyle}
          </span>
        </div>
      </div>
    </Card>
  );
}
