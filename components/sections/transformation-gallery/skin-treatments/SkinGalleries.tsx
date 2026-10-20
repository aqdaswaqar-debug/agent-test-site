import { cn } from "@/lib/utils";
import { ResultsSection } from "../ResultsSection";
import { tgContainer, tgH2, tgSection } from "../styles";
import type { Treatment } from "./content";

/**
 * "Transformation At Berkowits" (Figma 252:620): one H2, a jump-chip row to each treatment (added: the page is
 * ~10,000px of galleries, brief Q6), then one H3 gallery per treatment, anchorable by slug.
 */
export function SkinGalleries({ title, treatments }: { title: string; treatments: Treatment[] }) {
  return (
    <section aria-labelledby="skin-results-title" className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col items-center gap-5 lg:gap-8")}>
        <h2 id="skin-results-title" className={cn(tgH2, "max-w-[260px] md:max-w-none")}>
          {title}
        </h2>
        <nav aria-label="Jump to a treatment" className="w-full">
          <ul className="tg-scroll-x tg-fade-x -mx-4 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:[mask-image:none] lg:gap-3">
            {treatments.map((t) => (
              <li key={t.slug} className="shrink-0">
                <a
                  href={`#${t.slug}`}
                  className="inline-flex rounded-full border border-(--tg-teal) bg-(--tg-tint) px-4 py-2 text-[14px] leading-5 font-medium whitespace-nowrap text-(--tg-teal-text) transition-[background-color,color,scale] duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tg-teal-text) lg:text-[16px] [@media(hover:hover)]:hover:bg-(--tg-teal) [@media(hover:hover)]:hover:text-(--tg-on-teal)"
                >
                  {t.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-8 flex flex-col gap-10 lg:mt-12 lg:gap-20">
        {treatments.map((t) => (
          <ResultsSection key={t.slug} id={t.slug} title={t.title} label={t.label} pairs={t.pairs} headingLevel="h3" className="py-0 lg:py-0" />
        ))}
      </div>
    </section>
  );
}
