import { z } from "zod";
import {
  VIBE_OPTIONS,
  TEMPO_OPTIONS,
  PROMPT_OPTIONS,
} from "@/stores/song/constants";

// About Step Validation Schema
export const aboutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  occasion: z.string().min(1, "Occasion is required"),
});

// Song Tags Step Validation Schema
export const tagsSchema = z.object({
  genre: z.string(),
  vocalStyle: z.string(),
  vibe: z.array(z.enum(VIBE_OPTIONS)).min(1).max(2),
  tempo: z.enum(TEMPO_OPTIONS),
});

// Story Step Validation Schema
export const storySchema = z.object({
  promptType: z.array(z.enum(PROMPT_OPTIONS)).min(1).max(2),
  prompts: z.array(z.string().min(1, "Story prompts are required")).length(2),
  importantContext: z.string().optional(),
});

// Billing Step Validation Schema
export const optionsSchema = z.object({
  deliveryTime: z.enum(["normal", "rush"]),
  length: z.string(),
  revisions: z.number().min(0),
});

// Combine schemas for the entire form
export const songSchema = z.object({
  about: aboutSchema,
  tags: tagsSchema,
  story: storySchema,
  options: optionsSchema,
});
