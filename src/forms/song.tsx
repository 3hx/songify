"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useStore, Song } from "../stores/song";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  aboutSchema,
  tagsSchema,
  storySchema,
  optionsSchema,
} from "@/schemas/form";
import { RELATIONSHIP_OPTIONS } from "../stores/song/constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { OCCASION_OPTIONS } from "../stores/song/constants";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { VIBE_OPTIONS } from "../stores/song/constants";
import { TEMPO_OPTIONS } from "../stores/song/constants";
import { INFO_CARDS } from "../stores/song/constants";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import AutoPlay from "embla-carousel-autoplay";
import { GENRE_OPTIONS } from "../stores/song/constants";
import { VOCAL_STYLE_OPTIONS } from "../stores/song/constants";
import { PROMPT_OPTIONS } from "../stores/song/constants";
import { AnimatePresence, motion } from "framer-motion";
import { FormTransition } from "@/components/form/FormTransition";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CircleHelp } from "lucide-react";
import {
  VIBE_DESCRIPTIONS,
  GENRE_DESCRIPTIONS,
  TEMPO_DESCRIPTIONS,
} from "@/constants/descriptions";
import {
  useCurrencyStore,
  getFormattedPrice,
} from "@/lib/stores/currencyStore";
import { PRICES } from "@/lib/constants/prices";

type StepData = {
  about: Song["about"];
  tags: Song["tags"];
  story: Song["story"];
  options: Song["options"];
};

type FormFields<T extends keyof StepData> = StepData[T];

type StepId = 0 | 1 | 2 | 3;

// Helper function to get step descriptions
const getStepDescription = (stepId: string) => {
  switch (stepId) {
    case "about":
      return "Tell us about who this song is for";
    case "tags":
      return "Choose the musical style and mood";
    case "story":
      return "Share your story and memories";
    case "options":
      return "Customize your song preferences";
    default:
      return "";
  }
};

function MultiStepForm() {
  const router = useRouter();

  const { currentStep, steps, song, nextStep, previousStep, updateSong } =
    useStore();
  const step = steps[currentStep];
  type CurrentSection = keyof Song;

  const getStepSchema = () => {
    switch (step.id) {
      case "about":
        return aboutSchema;
      case "tags":
        return tagsSchema;
      case "story":
        return storySchema;
      case "options":
        return optionsSchema;
      default:
        return aboutSchema;
    }
  };

  const form = useForm<FormFields<CurrentSection>>({
    resolver: zodResolver(getStepSchema()),
    defaultValues: song[step.id as CurrentSection],
    values: song[step.id as CurrentSection],
    shouldUnregister: false,
  });

  // Update form values when step changes
  React.useEffect(() => {
    const values = song[step.id as CurrentSection];
    if (step.id === "about") {
      const aboutValues = values as Song["about"];
      form.reset({
        name: aboutValues.name,
        relationship: aboutValues.relationship || undefined,
        occasion: aboutValues.occasion || undefined,
      } as FormFields<"about">);
    } else {
      form.reset(values as FormFields<CurrentSection>);
    }
  }, [step.id]);

  const onSubmit = form.handleSubmit((data: FormFields<CurrentSection>) => {
    updateSong(step.id as CurrentSection, data);

    if (currentStep < steps.length - 1) {
      nextStep();
      router.push(`/create/${steps[currentStep + 1].id}`);
    } else {
      router.push("/cart");
    }
  });

  const handlePrevious = () => {
    previousStep();
    router.push(`/create/${steps[currentStep - 1].id}`);
  };

  // Update the visibility logic to include touched fields
  const [visibleFields, setVisibleFields] = useState<string[]>(() => {
    const fields = ["genre"];
    const values = song.tags;

    if (values.genre) {
      fields.push("vocalStyle");
    }
    if (values.vocalStyle) {
      fields.push("vibe");
    }
    if (values.vibe?.length && values.vibe.length > 0) {
      fields.push("tempo");
    }

    return fields;
  });

  // Update visibility logic to use store values
  React.useEffect(() => {
    const fields = ["genre"];
    const values = song.tags;

    if (values.genre) {
      fields.push("vocalStyle");
    }
    if (values.vocalStyle) {
      fields.push("vibe");
    }
    if (values.vibe?.length && values.vibe.length > 0) {
      fields.push("tempo");
    }

    setVisibleFields(fields);
  }, [song.tags.genre, song.tags.vocalStyle, song.tags.vibe]);

  const { symbol, rate } = useCurrencyStore();

  return (
    <>
      <Form {...form}>
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="flex-1 space-y-4 w-[400px] mx-auto">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid justify-center gap-y-6 mb-12">
                <span className="px-3 py-1 bg-stone-100/50 font-medium tracking-wider tabular-nums rounded-full text-[11px] text-stone-500 uppercase w-fit mx-auto ring-1 ring-stone-200/50">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-semibold text-stone-800">
                    {step.title}
                  </h2>
                  <p className="text-stone-500/80 text-[13px] max-w-[280px] mx-auto leading-relaxed">
                    {getStepDescription(step.id)}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <FormTransition key={currentStep}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      mass: 0.5,
                    }}
                  >
                    {currentStep === (0 as StepId) && (
                      <>
                        <div className="space-y-8">
                          <FormField
                            name="name"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <div className="text-center">
                                  <FormLabel className="text-lg">
                                    Who is this song for?
                                  </FormLabel>
                                  <FormDescription className="text-sm text-stone-500">
                                    Enter their name or nickname
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="e.g. Sarah, Mom, Dad..."
                                    className="text-center max-w-xs mx-auto"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            name="relationship"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <div className="text-center">
                                  <FormLabel className="text-lg">
                                    What&apos;s your relationship?
                                  </FormLabel>
                                  <FormDescription className="text-sm text-stone-500">
                                    How are you connected to them
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""}
                                    defaultValue={song.about.relationship}
                                  >
                                    <SelectTrigger className="max-w-xs mx-auto text-center">
                                      <SelectValue placeholder="Select relationship" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {RELATIONSHIP_OPTIONS.map((option) => (
                                        <SelectItem
                                          key={option}
                                          value={option}
                                          className="cursor-pointer"
                                        >
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            name="occasion"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <div className="text-center">
                                  <FormLabel className="text-lg">
                                    What&apos;s the occasion?
                                  </FormLabel>
                                  <FormDescription className="text-sm text-stone-500">
                                    Choose the event or reason
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""}
                                    defaultValue={song.about.occasion}
                                  >
                                    <SelectTrigger className="max-w-xs mx-auto text-center">
                                      <SelectValue placeholder="Select occasion" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {OCCASION_OPTIONS.map((occasion) => (
                                        <SelectItem
                                          key={occasion}
                                          value={occasion}
                                          className="cursor-pointer"
                                        >
                                          {occasion}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}

                    {currentStep === (1 as StepId) && (
                      <>
                        <div className="space-y-8">
                          <FormField
                            name="genre"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <div className="text-center">
                                  <FormLabel className="text-lg flex items-center gap-2 justify-center">
                                    Pick a genre
                                    <HoverCard>
                                      <HoverCardTrigger className="cursor-pointer">
                                        <CircleHelp className="h-4 w-4 text-stone-400" />
                                      </HoverCardTrigger>
                                      <HoverCardContent className="w-80">
                                        <div className="p-3">
                                          <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-lg overflow-hidden">
                                            <div className="px-4 py-3 border-b border-stone-700/50">
                                              <h4 className="font-medium text-sm text-white/90">
                                                Musical Styles
                                              </h4>
                                            </div>
                                            <div className="p-3 grid gap-2 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                                              {Object.entries(
                                                GENRE_DESCRIPTIONS
                                              ).map(([genre, desc]) => (
                                                <div
                                                  key={genre}
                                                  className="group px-3.5 py-3 rounded-md bg-stone-800/50 hover:bg-stone-700/50 transition-colors"
                                                >
                                                  <span className="font-medium text-white/90 flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400/40 group-hover:bg-blue-400 transition-colors" />
                                                    {genre}
                                                  </span>
                                                  <p className="text-xs text-stone-400 mt-1.5 pl-3.5 leading-relaxed">
                                                    {desc}
                                                  </p>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </HoverCardContent>
                                    </HoverCard>
                                  </FormLabel>
                                  <FormDescription className="text-sm text-stone-500">
                                    This is the foundation of your song
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <ToggleGroup
                                    type="single"
                                    value={field.value}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      if (
                                        value &&
                                        !visibleFields.includes("vocalStyle")
                                      ) {
                                        setVisibleFields([
                                          ...visibleFields,
                                          "vocalStyle",
                                        ]);
                                      }
                                    }}
                                    className="flex flex-wrap justify-center gap-2 max-w-md mx-auto"
                                  >
                                    {GENRE_OPTIONS.map((genre) => (
                                      <ToggleGroupItem
                                        key={genre}
                                        value={genre}
                                        className="capitalize rounded-lg border border-stone-200 px-4 py-2 text-sm transition-all duration-300 ease-out transform hover:scale-[1.02] hover:border-stone-400 active:scale-[0.98] data-[state=on]:scale-[1.02] data-[state=on]:bg-stone-900 data-[state=on]:border-stone-900 data-[state=on]:text-white"
                                      >
                                        {genre}
                                      </ToggleGroupItem>
                                    ))}
                                  </ToggleGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {visibleFields.includes("vocalStyle") && (
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.15,
                                ease: [0.4, 0, 0.2, 1],
                              }}
                            >
                              <div className="flex justify-center my-8">
                                <motion.div
                                  className="w-24 h-[1px] bg-stone-200/70"
                                  initial={{ width: 0 }}
                                  animate={{ width: 96 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 0.2,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                              <FormField
                                name="vocalStyle"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <div className="text-center">
                                      <FormLabel className="text-lg">
                                        Choose vocal style
                                      </FormLabel>
                                      <FormDescription className="text-sm text-stone-500">
                                        Select your preferred vocalist
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <ToggleGroup
                                        type="single"
                                        value={field.value}
                                        onValueChange={(value) => {
                                          field.onChange(value);
                                          if (
                                            value &&
                                            !visibleFields.includes("vibe")
                                          ) {
                                            setVisibleFields([
                                              ...visibleFields,
                                              "vibe",
                                            ]);
                                          }
                                        }}
                                        className="flex justify-center gap-2 max-w-md mx-auto"
                                      >
                                        {VOCAL_STYLE_OPTIONS.map((style) => (
                                          <ToggleGroupItem
                                            key={style}
                                            value={style}
                                            className="flex-1 capitalize rounded-lg border border-stone-200 px-4 py-2 text-sm transition-all duration-300 ease-out transform hover:scale-[1.02] hover:border-stone-400 active:scale-[0.98] data-[state=on]:scale-[1.02] data-[state=on]:bg-stone-900 data-[state=on]:border-stone-900 data-[state=on]:text-white"
                                          >
                                            {style}
                                          </ToggleGroupItem>
                                        ))}
                                      </ToggleGroup>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </motion.div>
                          )}

                          {visibleFields.includes("vibe") && (
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.15,
                                ease: [0.4, 0, 0.2, 1],
                              }}
                            >
                              <div className="flex justify-center my-8">
                                <motion.div
                                  className="w-24 h-[1px] bg-stone-200/70"
                                  initial={{ width: 0 }}
                                  animate={{ width: 96 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 0.2,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                              <FormField
                                name="vibe"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <div className="text-center">
                                      <FormLabel className="text-lg flex items-center gap-2 justify-center">
                                        Choose the vibe
                                        <HoverCard>
                                          <HoverCardTrigger className="cursor-pointer">
                                            <CircleHelp className="h-4 w-4 text-stone-400" />
                                          </HoverCardTrigger>
                                          <HoverCardContent className="w-80">
                                            <div className="p-3">
                                              <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-lg overflow-hidden">
                                                <div className="px-4 py-3 border-b border-stone-700/50">
                                                  <h4 className="font-medium text-sm text-white/90">
                                                    Choose Your Vibe
                                                  </h4>
                                                </div>
                                                <div className="p-3 grid gap-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                                                  {Object.entries(
                                                    VIBE_DESCRIPTIONS
                                                  ).map(([vibe, desc]) => (
                                                    <div
                                                      key={vibe}
                                                      className="group px-3.5 py-3 rounded-md bg-stone-800/50 hover:bg-stone-700/50 transition-colors"
                                                    >
                                                      <span className="font-medium text-white/90 capitalize flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400/40 group-hover:bg-blue-400 transition-colors" />
                                                        {vibe}
                                                      </span>
                                                      <p className="text-xs text-stone-400 mt-1.5 pl-3.5 leading-relaxed">
                                                        {desc}
                                                      </p>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>
                                          </HoverCardContent>
                                        </HoverCard>
                                      </FormLabel>
                                      <FormDescription className="text-sm text-stone-500">
                                        Select up to 2 vibes for your song
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <ToggleGroup
                                        type="multiple"
                                        onValueChange={(value) => {
                                          if (value.length <= 2) {
                                            field.onChange(value);
                                            // Only show tempo if it hasn't been shown before
                                            if (
                                              value.length > 0 &&
                                              !visibleFields.includes("tempo")
                                            ) {
                                              setVisibleFields([
                                                ...visibleFields,
                                                "tempo",
                                              ]);
                                            }
                                          }
                                        }}
                                        value={field.value || []}
                                        className="flex flex-wrap justify-center gap-2 max-w-md mx-auto"
                                      >
                                        {VIBE_OPTIONS.map((vibe) => (
                                          <ToggleGroupItem
                                            key={vibe}
                                            value={vibe}
                                            className="flex-1 min-w-fit capitalize rounded-lg border border-stone-200 px-4 py-2 text-sm transition-all duration-300 ease-out transform hover:scale-[1.02] hover:border-stone-400 active:scale-[0.98] data-[state=on]:scale-[1.02] data-[state=on]:bg-stone-900 data-[state=on]:border-stone-900 data-[state=on]:text-white"
                                          >
                                            {vibe}
                                          </ToggleGroupItem>
                                        ))}
                                      </ToggleGroup>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </motion.div>
                          )}

                          {visibleFields.includes("tempo") && (
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.15,
                                ease: [0.4, 0, 0.2, 1],
                              }}
                            >
                              <div className="flex justify-center my-8">
                                <motion.div
                                  className="w-24 h-[1px] bg-stone-200/70"
                                  initial={{ width: 0 }}
                                  animate={{ width: 96 }}
                                  transition={{
                                    duration: 0.3,
                                    delay: 0.2,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                              <FormField
                                name="tempo"
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <div className="text-center">
                                      <FormLabel className="text-lg flex items-center gap-2 justify-center">
                                        Choose the tempo
                                        <HoverCard>
                                          <HoverCardTrigger className="cursor-pointer">
                                            <CircleHelp className="h-4 w-4 text-stone-400" />
                                          </HoverCardTrigger>
                                          <HoverCardContent className="w-80">
                                            <div className="p-3">
                                              <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-lg overflow-hidden">
                                                <div className="px-4 py-3 border-b border-stone-700/50">
                                                  <h4 className="font-medium text-sm text-white/90">
                                                    Song Speed
                                                  </h4>
                                                </div>
                                                <div className="p-3 grid gap-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-track-stone-800 scrollbar-thumb-stone-700">
                                                  {Object.entries(
                                                    TEMPO_DESCRIPTIONS
                                                  ).map(([tempo, desc]) => (
                                                    <div
                                                      key={tempo}
                                                      className="group px-3.5 py-3 rounded-md bg-stone-800/50 hover:bg-stone-700/50 transition-colors"
                                                    >
                                                      <span className="font-medium text-white/90 capitalize flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-400/40 group-hover:bg-blue-400 transition-colors" />
                                                        {tempo}
                                                      </span>
                                                      <p className="text-xs text-stone-400 mt-1.5 pl-3.5 leading-relaxed">
                                                        {desc}
                                                      </p>
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>
                                          </HoverCardContent>
                                        </HoverCard>
                                      </FormLabel>
                                      <FormDescription className="text-sm text-stone-500">
                                        Select how fast or slow you want the
                                        song
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <ToggleGroup
                                        type="single"
                                        onValueChange={(value) => {
                                          // Only update if a value is selected
                                          if (value) {
                                            field.onChange(value);
                                          }
                                        }}
                                        value={field.value}
                                        className="flex justify-center gap-2 max-w-md mx-auto"
                                      >
                                        {TEMPO_OPTIONS.map((tempo) => (
                                          <ToggleGroupItem
                                            key={tempo}
                                            value={tempo}
                                            className="capitalize rounded-lg border border-stone-200 px-4 py-2 text-sm transition-all duration-300 ease-out transform hover:scale-[1.02] hover:border-stone-400 active:scale-[0.98] data-[state=on]:scale-[1.02] data-[state=on]:bg-stone-900 data-[state=on]:border-stone-900 data-[state=on]:text-white"
                                          >
                                            {tempo}
                                          </ToggleGroupItem>
                                        ))}
                                      </ToggleGroup>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </motion.div>
                          )}
                        </div>
                      </>
                    )}

                    {currentStep === (2 as StepId) && (
                      <>
                        <div className="space-y-8">
                          {[0, 1].map((index) => (
                            <div key={index} className="space-y-4">
                              <FormField
                                name={`promptType.${index}`}
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <div className="text-center">
                                      <FormLabel className="text-lg">
                                        {index === 0 ? "First" : "Second"} story
                                        prompt
                                      </FormLabel>
                                      <FormDescription className="text-sm text-stone-500">
                                        Choose what you&apos;d like to share
                                        about
                                      </FormDescription>
                                    </div>
                                    <FormControl>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                      >
                                        <SelectTrigger className="max-w-xs mx-auto text-center">
                                          <SelectValue placeholder="Select a prompt" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {PROMPT_OPTIONS.map((option) => (
                                            <SelectItem
                                              key={option}
                                              value={option}
                                              className="cursor-pointer"
                                            >
                                              {option}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                name={`prompts.${index}`}
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormControl>
                                      <Textarea
                                        {...field}
                                        placeholder="Share your story, memories, or thoughts here..."
                                        className="min-h-[150px] resize-none text-base"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {index === 0 && (
                                <div className="flex justify-center my-8">
                                  <div className="w-24 h-[1px] bg-stone-200/70" />
                                </div>
                              )}
                            </div>
                          ))}

                          <FormField
                            name="importantContext"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <div className="text-center">
                                  <FormLabel className="text-lg">
                                    Any important context?
                                  </FormLabel>
                                  <FormDescription className="text-sm text-stone-500">
                                    Add any key details we should know
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="e.g. Surprise party, inside jokes, special dates..."
                                    className="text-center max-w-xs mx-auto"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}

                    {currentStep === (3 as StepId) && (
                      <>
                        <div className="space-y-8">
                          <FormField
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <div className="text-center">
                                  <FormLabel className="text-lg">
                                    Your email address
                                  </FormLabel>
                                  <FormDescription className="text-sm text-stone-500">
                                    We&apos;ll send updates about your song here
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Input
                                    type="email"
                                    {...field}
                                    value={field.value || ""}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                    placeholder="Enter your email"
                                    className="text-center max-w-xs mx-auto"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex justify-center my-8">
                            <div className="w-24 h-[1px] bg-stone-200/70" />
                          </div>

                          <FormField
                            name="deliveryTime"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <div className="text-center">
                                  <FormLabel className="text-lg">
                                    Choose delivery time
                                  </FormLabel>
                                  <FormDescription className="text-sm text-stone-500">
                                    When would you like your song delivered?
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <ToggleGroup
                                    type="single"
                                    value={field.value}
                                    defaultValue="normal"
                                    onValueChange={(value) => {
                                      if (value) {
                                        field.onChange(value);
                                      }
                                    }}
                                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[400px] mx-auto"
                                  >
                                    <ToggleGroupItem
                                      value="normal"
                                      className="capitalize data-[state=on]:bg-stone-900 p-4 rounded-xl h-24 border border-stone-300 px-4 py-3 data-[state=on]:text-white flex flex-col items-center text-stone-900 data-[state=on]:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] relative"
                                    >
                                      <div className="font-medium text-base">
                                        Standard
                                      </div>
                                      <div className="text-sm opacity-80 tabular-nums">
                                        7 days
                                      </div>
                                      <div className="text-xs text-stone-500 mt-1">
                                        Free
                                      </div>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem
                                      value="rush"
                                      className="capitalize data-[state=on]:bg-stone-900 rounded-xl border h-24 p-4 border-stone-300 px-4 py-3 data-[state=on]:text-white flex flex-col items-center text-stone-900 data-[state=on]:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] relative"
                                    >
                                      <div className="font-medium text-base">
                                        Rush
                                      </div>
                                      <div className="text-sm opacity-80 tabular-nums">
                                        3 days
                                      </div>
                                      <div className="tabular-nums text-xs text-green-500 mt-1">
                                        +
                                        {getFormattedPrice(PRICES.rushFee, {
                                          symbol,
                                          rate,
                                        })}
                                      </div>
                                    </ToggleGroupItem>
                                  </ToggleGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}
                  </motion.div>
                </FormTransition>
              </AnimatePresence>
            </form>
          </div>

          <div className="bottom-0 w-full bg-background mt-12">
            <div className="max-w-[400px] mx-auto space-y-4 p-4">
              {currentStep === 0 && (
                <Carousel
                  className="w-full"
                  plugins={[AutoPlay({ playOnInit: true, delay: 5000 })]}
                >
                  <CarouselContent>
                    {INFO_CARDS.map((card, index) => (
                      <CarouselItem key={index}>
                        <div className="p-6 border rounded-xl">
                          <p className="font-bold">{card.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselDots />
                </Carousel>
              )}
              <form onSubmit={onSubmit}>
                <div className="flex gap-2">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handlePrevious}
                      className="w-full"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:hover:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={!form.formState.isValid}
                  >
                    {currentStep < steps.length - 1 ? "Next" : "Submit"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default MultiStepForm;
