// Default delivery time is 1 week from today
export const DELIVERY_OPTIONS = ["normal", "rush"] as const;

// Default Song Object
export const SONG_DEFAULT = {
  about: { name: "", relationship: "", occasion: "" },
  tags: {
    genre: "",
    vocalStyle: "",
    vibe: [] as (typeof VIBE_OPTIONS)[number][],
    tempo: "medium" as (typeof TEMPO_OPTIONS)[number],
  },
  story: {
    promptType: [] as (typeof PROMPT_OPTIONS)[number][],
    prompts: ["", ""],
    importantContext: "",
  },
  options: {
    deliveryTime: "normal" as const,
    length: "",
    revisions: 0,
  },
};

export const validSteps = ["about", "tags", "story", "options"] as const;

export const STEPS = [
  { id: "about", title: "About" },
  { id: "tags", title: "Song characteristics" },
  { id: "story", title: "Story" },
  { id: "options", title: "Options" },
] as const;

export const RELATIONSHIP_OPTIONS = [
  "Wife",
  "Husband",
  "Partner",
  "Boyfriend",
  "Girlfriend",
  "Fiancé/Fiancée",
  "Significant Other",
  "Mom",
  "Dad",
  "Parents",
  "Daughter",
  "Son",
  "Children",
  "Grandmother",
  "Grandfather",
  "Grandparents",
  "Family",
  "Friend",
  "Other",
] as const;

export const OCCASION_OPTIONS = [
  "Anniversary",
  "Birthday",
  "Christmas",
  "Engagement",
  "Father's Day",
  "Graduation",
  "Just Because",
  "Memorial",
  "Mother's Day",
  "New Baby",
  "Proposal",
  "Valentine's Day",
  "Wedding",
  "Other",
] as const;

export const VIBE_OPTIONS = [
  "happy",
  "lighthearted",
  "comical",
  "heartfelt",
  "uplifting",
  "romantic",
  "reflective",
  "somber",
] as const;

export const TEMPO_OPTIONS = ["slow", "medium", "up-tempo"] as const;

export const INFO_CARDS = [
  {
    title: "Top-rated custom song company",
    description:
      "With over 350,000 happy customers and more than $30M paid to Songfinch artists, there's a reason we're rated the #1 custom song company.",
  },
  {
    title: "Work with real artists, not AI",
    description:
      "Every Songfinch song is hand-crafted by a real, professional artist with genuine talent and heart. Don't be fooled by the copycats claiming to work with real artists and deliver flat, lifeless AI songs.",
  },
  {
    title: "Lyric revisions included",
    description:
      "Our custom-built revision tool makes it simple to request changes to your song's lyrics after you've listened, helping you shape it to perfection.",
  },
] as const;

export const GENRE_OPTIONS = [
  "Acoustic Pop",
  "Country",
  "Singer Songwriter",
  "Folk",
  "Rap / Hip-Hop",
  "Rock",
  "Christian",
  "R&B",
  "Spanish",
] as const;
export const VOCAL_STYLE_OPTIONS = ["Female", "Male", "No Preference"] as const;

export const PROMPT_OPTIONS = [
  "Your relationship story",
  "Favorite things about them",
  "What they mean to you",
  "Favorite things to do together",
  "How they've shaped you",
  "Inside jokes and funny stories",
  "Advice you have for them",
  "Other stories or memories",
] as const;
