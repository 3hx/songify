import { z } from "zod";
import { aboutSchema, tagsSchema, storySchema, optionsSchema } from "./form";

export type SongAbout = z.infer<typeof aboutSchema>;
export type SongTags = z.infer<typeof tagsSchema>;
export type SongStory = z.infer<typeof storySchema>;
export type SongOptions = z.infer<typeof optionsSchema>;

export type FormData = SongAbout | SongTags | SongStory | SongOptions;
