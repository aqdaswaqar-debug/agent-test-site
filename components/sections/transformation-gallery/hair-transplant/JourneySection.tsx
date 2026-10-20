import { Fragment } from "react";
import { Caveat } from "next/font/google";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { tgContainer, tgH2, tgSection } from "../styles";
import { JOURNEY_TITLE, PHASES, STORY } from "./content";
import { JourneyCarousel } from "./JourneyCarousel";

// Handwritten patient story (Figma: Caveat Bold). Only this section uses it, so it is not preloaded.
const caveat = Caveat({ subsets: ["latin"], weight: ["700"], display: "swap", preload: false });

/** "Behind the Transformation Journey" (Figma 200:4059): phase carousel + the patient's own story. */
export function JourneySection() {
  return (
    <section aria-labelledby="journey-title" className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col gap-6 lg:gap-10")}>
        <h2 id="journey-title" className={tgH2}>
          {JOURNEY_TITLE}
        </h2>
        <JourneyCarousel phases={PHASES} />
        <Reveal>
          {/* TODO(content): add a figcaption with the patient's name/initials once consent is confirmed. */}
          <figure className={cn(caveat.className, "mx-auto max-w-[1414px] text-center text-[17px] leading-[1.5] text-black lg:text-[24px] lg:leading-[1.35]")}>
            <blockquote className="flex flex-col">
              {STORY.map((para, i) => (
                <p key={i}>
                  {para.map((part, j) =>
                    typeof part === "string" ? (
                      <Fragment key={j}>{part}</Fragment>
                    ) : (
                      <strong key={j} className="font-bold text-(--tg-teal-deep)">
                        {part.hl}
                      </strong>
                    ),
                  )}
                </p>
              ))}
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
