"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play } from "lucide-react";

const CATEGORIES = [
  "All",
  "Birthday",
  "Anniversary",
  "Wedding",
  "Graduation",
  "Memorial",
] as const;

type Example = {
  title: string;
  description: string;
  category: (typeof CATEGORIES)[number];
  genre: string;
  vocalStyle: string;
  audioUrl: string;
  imageUrl: string;
};

const EXAMPLES: Example[] = [
  {
    title: "Happy Birthday Sarah",
    description: "A fun birthday song for a daughter turning 16",
    category: "Birthday",
    genre: "Pop",
    vocalStyle: "Female",
    audioUrl: "https://example.com/song1.mp3",
    imageUrl: "/examples/birthday-1.jpg",
  },
  {
    title: "Our Love Story",
    description: "A romantic anniversary song celebrating 25 years together",
    category: "Anniversary",
    genre: "Acoustic",
    vocalStyle: "Male",
    audioUrl: "https://example.com/song2.mp3",
    imageUrl: "/examples/anniversary-1.jpg",
  },
  // Add more examples...
];

function ExampleCard({ example }: { example: Example }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="relative aspect-square">
        <img
          src={example.imageUrl}
          alt={example.title}
          className="object-cover w-full h-full"
        />
        <button
          aria-label={`Play ${example.title}`}
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity"
        >
          <Play className="w-16 h-16 text-white" />
        </button>
      </div>
      <div className="p-6 space-y-2">
        <h3 className="text-xl font-bold">{example.title}</h3>
        <p className="text-gray-600">{example.description}</p>
        <div className="flex gap-2 text-sm">
          <span className="px-2 py-1 bg-stone-100 rounded-full">
            {example.genre}
          </span>
          <span className="px-2 py-1 bg-stone-100 rounded-full">
            {example.vocalStyle}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Examples() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");

  const filteredExamples = EXAMPLES.filter(
    (example) => activeCategory === "All" || example.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Example Songs</h1>
        <p className="text-xl text-gray-600">
          Listen to real custom songs created by our artists
        </p>
      </div>

      <Tabs defaultValue="All" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            {CATEGORIES.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeCategory}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExamples.map((example, index) => (
              <ExampleCard key={index} example={example} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
