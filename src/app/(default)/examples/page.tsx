"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { ExampleSong } from "@/components/audio/ExampleSong";

interface Example {
  title: string;
  description: string;
  category: string;
  genre: string;
  vocalStyle: string;
  audioUrl: string;
  imageUrl: string;
}

const EXAMPLES: Example[] = [
  {
    title: "Happy Birthday Sarah",
    description: "A fun birthday song for a daughter turning 16",
    category: "My daughter",
    genre: "Pop",
    vocalStyle: "Female",
    audioUrl: "/songs/terrible-song-1.mp3",
    imageUrl: "/songs/terrible-song-1.webp",
  },
  {
    title: "Our Love Story",
    description: "A romantic anniversary song celebrating 25 years together",
    category: "My partner",
    genre: "Acoustic",
    vocalStyle: "Male",
    audioUrl: "/songs/terrible-song-2.mp3",
    imageUrl: "/songs/terrible-song-2.jpg",
  },
];

const TABS = [
  "All",
  "My daughter",
  "My friend",
  "My partner",
  "My mother",
  "My girlfriend",
] as const;
type Tab = (typeof TABS)[number];

export default function ExamplesPage() {
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredExamples =
    activeTab === "All"
      ? EXAMPLES
      : EXAMPLES.filter((example) => example.category === activeTab);

  const handleExampleClick = (example: Example) => {
    setSelectedExample(example);
    setIsPlaying(true);
  };

  const handleNext = () => {
    if (!selectedExample) return;
    const currentIndex = filteredExamples.findIndex(
      (ex) => ex.title === selectedExample.title
    );
    const nextIndex = (currentIndex + 1) % filteredExamples.length;
    setSelectedExample(filteredExamples[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (!selectedExample) return;
    const currentIndex = filteredExamples.findIndex(
      (ex) => ex.title === selectedExample.title
    );
    const previousIndex =
      currentIndex === 0 ? filteredExamples.length - 1 : currentIndex - 1;
    setSelectedExample(filteredExamples[previousIndex]);
    setIsPlaying(true);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Song Examples</h1>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 my-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 transition-all duration-300 rounded-full text-sm font-bold ${
              activeTab === tab
                ? "bg-stone-950 text-white"
                : "bg-stone-100 hover:bg-stone-200 text-stone-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Centered Grid */}
      <div className="max-w-6xl mx-auto mt-12">
        <div className="flex flex-col md:flex-row lg:flex-row flex-wrap gap-6 justify-center">
          {filteredExamples.map((example) => (
            <ExampleSong
              key={example.title}
              example={example}
              isSelected={selectedExample?.title === example.title}
              isPlaying={isPlaying}
              onClick={() => handleExampleClick(example)}
            />
          ))}
        </div>
      </div>

      {/* Updated Player */}
      {selectedExample && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
          <div className="bg-stone-950 border-t border-stone-800 shadow-lg p-4">
            <div className="container mx-auto flex justify-center items-center">
              <AudioPlayer
                src={selectedExample.audioUrl}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isPlaying={isPlaying}
                onPlayingChange={setIsPlaying}
                title={selectedExample.title}
                description={selectedExample.description}
                tags={[selectedExample.genre, selectedExample.vocalStyle]}
                imageUrl={selectedExample.imageUrl}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
