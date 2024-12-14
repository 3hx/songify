import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SONG_DEFAULT } from "./constants";
import { StoreState } from "./types";
import { STEPS } from "./constants";

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        currentStep: 0,
        totalSteps: STEPS.length,
        steps: STEPS,

        song: { ...SONG_DEFAULT },

        nextStep: () =>
          set((state) => ({
            currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
          })),
        previousStep: () =>
          set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 0),
          })),
        goToStep: (step) =>
          set((state) => ({
            currentStep: Math.min(Math.max(step, 0), state.totalSteps - 1),
          })),

        updateSong: (section, data) =>
          set((state) => ({
            song: {
              ...state.song,
              [section]: { ...state.song[section], ...data },
            },
          })),

        resetSong: () =>
          set(() => ({
            currentStep: 0,
            song: { ...SONG_DEFAULT },
          })),
      }),
      {
        name: "song-storage",
        partialize: (state) => ({
          currentStep: state.currentStep,
          song: state.song,
        }),
      }
    )
  )
);
