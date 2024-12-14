import {
  VIBE_OPTIONS,
  TEMPO_OPTIONS,
  STEPS,
  PROMPT_OPTIONS,
} from "./constants";

export type Song = {
  about: {
    name: string;
    relationship: string;
    occasion: string;
  };
  tags: {
    genre: string;
    vocalStyle: string;
    vibe: (typeof VIBE_OPTIONS)[number][];
    tempo: (typeof TEMPO_OPTIONS)[number];
  };
  story: {
    promptType: (typeof PROMPT_OPTIONS)[number][];
    prompts: string[];
    importantContext: string;
  };
  options: {
    deliveryTime: Date;
    length: string;
    revisions: number;
  };
};

export interface StoreState {
  currentStep: number;
  totalSteps: number;
  steps: typeof STEPS;
  song: Song;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  updateSong: <T extends keyof Song>(
    section: T,
    data: Partial<Song[T]>
  ) => void;
  resetSong: () => void;
}
