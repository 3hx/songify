"use client";
import React from "react";
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
import { AnimatePresence } from "framer-motion";
import { FormTransition } from "@/components/form/FormTransition";

type StepData = {
  about: Song["about"];
  tags: Song["tags"];
  story: Song["story"];
  options: Song["options"];
};

type FormFields<T extends keyof StepData> = StepData[T];

type StepId = 0 | 1 | 2 | 3;

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
    // values: song[step.id as CurrentSection],
  });

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
    // const prevValues = song[
    //   steps[currentStep - 1]?.id as CurrentSection
    // ] as FormData;
    // // form.reset(prevValues);
    router.push(`/create/${steps[currentStep - 1].id}`);
  };
  return (
    <>
      <Form {...form}>
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="flex-1 space-y-4 w-[400px] mx-auto">
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid justify-center gap-y-8">
                <span className="px-4 py-1 border font-bold tracking-wider border-stone-300 tabular-nums rounded-full text-sm text-stone-700 uppercase w-fit mx-auto">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <h2 className="text-4xl font-bold">{step.title}</h2>
              </div>

              <AnimatePresence mode="wait">
                <FormTransition key={currentStep}>
                  {currentStep === (0 as StepId) && (
                    <>
                      <FormField
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Recipient&apos;s Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Name or nickname"
                              />
                            </FormControl>
                            <FormDescription>
                              Enter your name or nickname.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="relationship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select their relationship to you" />
                                </SelectTrigger>
                                <SelectContent>
                                  {RELATIONSHIP_OPTIONS.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Describe your relationship.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="occasion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occasion</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an occasion" />
                                </SelectTrigger>
                                <SelectContent>
                                  {OCCASION_OPTIONS.map((occasion) => (
                                    <SelectItem key={occasion} value={occasion}>
                                      {occasion}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Select the occasion for your song.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === (1 as StepId) && (
                    <>
                      <FormField
                        name="genre"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Genre</FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type="single"
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-wrap justify-center gap-2"
                              >
                                {GENRE_OPTIONS.map((genre) => (
                                  <ToggleGroupItem
                                    key={genre}
                                    value={genre}
                                    className="capitalize rounded-lg border border-stone-300 px-6 py-3 data-[state=on]:bg-stone-900 data-[state=on]:text-white"
                                  >
                                    {genre}
                                  </ToggleGroupItem>
                                ))}
                              </ToggleGroup>
                            </FormControl>
                            <FormDescription>
                              This is the foundation of your song.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <hr className="my-4 border-stone-200" />

                      <FormField
                        name="vocalStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vocal Style</FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type="single"
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex flex-wrap justify-center gap-2"
                              >
                                {VOCAL_STYLE_OPTIONS.map((style) => (
                                  <ToggleGroupItem
                                    key={style}
                                    value={style}
                                    className="capitalize rounded-lg border border-stone-300 px-6 py-3 data-[state=on]:bg-stone-900 data-[state=on]:text-white"
                                  >
                                    {style}
                                  </ToggleGroupItem>
                                ))}
                              </ToggleGroup>
                            </FormControl>
                            <FormDescription>
                              Choose your preferred vocal style.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <hr className="my-4 border-stone-200" />

                      <FormField
                        name="vibe"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vibe</FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type="multiple"
                                onValueChange={(value) => {
                                  if (value.length <= 2) {
                                    field.onChange(value);
                                  }
                                }}
                                value={field.value || []}
                                className="flex flex-wrap gap-2"
                              >
                                {VIBE_OPTIONS.map((vibe) => (
                                  <ToggleGroupItem
                                    key={vibe}
                                    value={vibe}
                                    className="capitalize data-[state=on]:bg-stone-900 data-[state=on]:text-white rounded-lg border border-stone-300 px-6 py-3"
                                  >
                                    {vibe}
                                  </ToggleGroupItem>
                                ))}
                              </ToggleGroup>
                            </FormControl>
                            <FormDescription>
                              Select up to 2 vibes for your song.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <hr className="my-4 border-stone-200" />

                      <FormField
                        name="tempo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tempo</FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type="single"
                                onValueChange={field.onChange}
                                value={field.value || "medium"}
                                className="flex flex-wrap gap-2"
                              >
                                {TEMPO_OPTIONS.map((tempo) => (
                                  <ToggleGroupItem
                                    key={tempo}
                                    value={tempo}
                                    className="capitalize data-[state=on]:bg-stone-900 rounded-lg border border-stone-300 px-6 py-3 data-[state=on]:text-white"
                                  >
                                    {tempo}
                                  </ToggleGroupItem>
                                ))}
                              </ToggleGroup>
                            </FormControl>
                            <FormDescription>
                              Select the tempo for your song.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === (2 as StepId) && (
                    <>
                      <div className="space-y-4">
                        {[0, 1].map((index) => (
                          <div key={index} className="space-y-4">
                            <FormField
                              name={`promptType.${index}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Select prompt {index + 1}
                                  </FormLabel>
                                  <FormControl>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a prompt type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {PROMPT_OPTIONS.map((option) => (
                                          <SelectItem
                                            key={option}
                                            value={option}
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
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      placeholder="Share your story here..."
                                      className="min-h-[150px]"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ))}
                      </div>

                      <FormField
                        name="importantContext"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Important Context</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Important Context"
                              />
                            </FormControl>
                            <FormDescription>
                              Add important context.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {currentStep === (3 as StepId) && (
                    <>
                      <FormField
                        name="deliveryTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Time</FormLabel>
                            <FormControl>
                              <ToggleGroup
                                type="single"
                                value={field.value || "normal"}
                                onValueChange={field.onChange}
                                className="flex flex-wrap gap-2"
                              >
                                <ToggleGroupItem
                                  value="normal"
                                  className="capitalize data-[state=on]:bg-stone-900 rounded-3xl border border-stone-300 px-6 py-8 data-[state=on]:text-white flex flex-col text-stone-900 data-[state=on]:shadow-lg"
                                >
                                  <div className="font-bold ">Normal</div>
                                  <div className="text-sm data-[state=on]:text-white tabular-nums">
                                    7 days
                                  </div>
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                  value="rush"
                                  className="capitalize data-[state=on]:bg-stone-900 rounded-3xl border border-stone-300 px-6 py-8 data-[state=on]:text-white data-[state=on]:shadow-lg flex flex-col text-stone-900"
                                >
                                  <div className="font-bold">Rush</div>
                                  <div className="text-sm data-[state=on]:text-white tabular-nums">
                                    3 days
                                  </div>
                                </ToggleGroupItem>
                              </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <p className="text-rose-500 text-center text-bold mt-12 text-lg">
                        Song delivery rush fee: $25.00
                      </p>
                      <FormField
                        name="length"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Length</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select length" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="short">Short</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="long">Long</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormDescription>
                              Select the length.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="revisions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Revisions</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                placeholder="Number of revisions"
                                min="0"
                              />
                            </FormControl>
                            <FormDescription>
                              Enter number of revisions.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </FormTransition>
              </AnimatePresence>
            </form>
          </div>

          <div className="bottom-0 w-full bg-background mt-12">
            <div className="max-w-[400px] mx-auto space-y-4 p-4">
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
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
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
