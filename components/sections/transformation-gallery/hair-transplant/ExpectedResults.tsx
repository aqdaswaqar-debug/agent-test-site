import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { hoverZoom } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { tgContainer, tgH2, tgSection } from "../styles";
import type { Img } from "../types";
import { EXPECTED_AFTER, EXPECTED_BEFORE, EXPECTED_STEPS, EXPECTED_TITLE } from "./content";
import "./expected-results.css";

function EndPhoto({ image }: { image: Img }) {
  return (
    <div className="group relative z-10 size-[177px] shrink-0 overflow-hidden rounded-full bg-(--tg-surface) lg:size-[140px] xl:size-[177px]">
      <Image src={image.src} alt={image.alt} fill sizes="177px" className={cn("object-cover", hoverZoom)} />
    </div>
  );
}

/**
 * Recovery timeline (Figma 200:3537 / 1221:792): before photo → 4 steps → after photo on a teal line.
 * Vertical with labels alternating left/right below lg (Figma's misplaced mobile step 3 is put back in order),
 * horizontal with labels alternating above/below from lg. Semantic <ol>; line, nodes and numerals are decorative.
 */
export function ExpectedResults() {
  return (
    <section aria-labelledby="expected-title" className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col gap-6 lg:gap-10")}>
        <h2 id="expected-title" className={cn(tgH2, "uppercase")}>
          {EXPECTED_TITLE}
        </h2>
        <Reveal stagger>
          <div className="relative mx-auto flex max-w-[1416px] flex-col items-center lg:flex-row">
            <span
              aria-hidden
              className="ht-line absolute top-[88px] bottom-[88px] left-[calc(50%-3px)] w-1.5 origin-top rounded-full bg-(--tg-teal) lg:top-[calc(50%-3px)] lg:right-[70px] lg:bottom-auto lg:left-[70px] lg:h-1.5 lg:w-auto lg:origin-left xl:right-[88px] xl:left-[88px]"
            />
            <EndPhoto image={EXPECTED_BEFORE} />
            <ol className="ht-steps relative flex w-full flex-col gap-10 py-10 lg:grid lg:flex-1 lg:grid-cols-4 lg:gap-0 lg:px-4 lg:py-0">
              {EXPECTED_STEPS.map((step, i) => {
                const odd = i % 2 === 0;
                return (
                  <li key={step} data-reveal-item className="ht-step grid grid-cols-[1fr_46px_1fr] items-center gap-x-3 lg:grid-cols-1 lg:grid-rows-[170px_46px_170px] lg:justify-items-center lg:gap-y-2 xl:grid-rows-[190px_46px_190px]">
                    <span aria-hidden className="ht-node col-start-2 row-start-1 size-[46px] rounded-full border-[5px] border-(--tg-teal) bg-white lg:col-start-1 lg:row-start-2" />
                    <div
                      className={cn(
                        "row-start-1 flex font-semibold text-(--tg-teal-text) lg:col-start-1 lg:max-w-[190px] lg:items-center lg:text-center",
                        odd ? "col-start-1 flex-col-reverse items-end text-right lg:row-start-1 lg:self-end" : "col-start-3 flex-col items-start text-left lg:row-start-3 lg:self-start",
                      )}
                    >
                      <span aria-hidden className="text-[48px] leading-none lg:text-[60px] xl:text-[80px]">
                        {i + 1}
                      </span>
                      <span className="text-[15px] leading-[1.4] sm:text-[16px] xl:text-[20px]">{step}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
            <EndPhoto image={EXPECTED_AFTER} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
