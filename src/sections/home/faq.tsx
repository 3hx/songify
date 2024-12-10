import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const FAQ_ITEMS = [
  {
    question: "How long does my custom song take?",
    answer:
      "It takes four to seven days to create your custom song. After you select a delivery date at checkout, we'll work with your artist to make sure your song is delivered on time.",
  },
  {
    question: "How will my song be delivered?",
    answer:
      "Download and listen to your original song anytime from your song page. You can also read your lyrics, get to know your artist, and browse custom keepsakes specific to your song.",
  },
  {
    question: "How much does a custom song cost?",
    answer:
      "Our custom songs start at $199.99 USD and come with access to our Lyric Assist Tool, which makes it easy to review and mark up your song's lyrics with suggested changes. Each custom song comes with up to five (5) lines of lyric changes, along with unlimited mispronunciation changes to ensure your song is perfect.",
  },
  {
    question: "Can I make changes to my custom song once I hear it?",
    answer:
      "We understand how meaningful every custom song we deliver is, so we developed our Lyric Assist Tool to enable you to tweak your song's lyrics to perfection. Upon song delivery, you are granted access to our Lyric Assist Tool, which makes it easy to review and mark up your song's lyrics with suggested changes.",
  },
  {
    question: "Do you create custom songs in Spanish?",
    answer:
      'Yes, we have a roster of talented artists that create songs in Spanish. You can browse these artists and listen to their songs on our "Artists" page by selecting the "Spanish" filter.',
  },
];

export function FAQ() {
  return (
    <section className="py-16 px-4">
      <div className="container pt-12 pb-0 tablet:pb-8">
        <h2 className="mb-14 text-3xl font-bold text-center mb-8mb-8 max-w-700 mx-auto max-w-2xl">
          Join hundreds of thousands who&apos;ve already discovered the magic of
          Bill
        </h2>
        <div className="mb-8 tablet:mb-10 text-center">
          <Image
            src="/union.avif"
            className="inline-block"
            alt="icons"
            width={300}
            height={72}
          />
        </div>
        <div className="mt-12">
          <div>
            <div className=""></div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
