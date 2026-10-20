import { cn } from "@/lib/utils";
import { ResultsSection } from "../ResultsSection";
import { tgContainer, tgH2, tgSection } from "../styles";
import { RESULT_GROUPS, RESULTS_TITLE } from "./content";

/**
 * "Transformations At Berkowits" (Figma 205:5154 → 208:5297): one H2, then the Men and Women galleries as h3 groups.
 * Figma's "View More" is dropped: every zip pair is already shown.
 */
export function RegrowthResults() {
  return (
    <section aria-labelledby="transformations-title" className={cn(tgSection, "flex flex-col gap-10 lg:gap-16")}>
      <div className={tgContainer}>
        <h2 id="transformations-title" className={tgH2}>
          {RESULTS_TITLE}
        </h2>
      </div>
      {RESULT_GROUPS.map((g) => (
        <ResultsSection key={g.id} id={g.id} title={g.title} label={g.label} pairs={g.pairs} headingLevel="h3" className="py-0 lg:py-0" />
      ))}
    </section>
  );
}
