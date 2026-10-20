import { Fragment } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { tgContainer, tgH2, tgSection } from "../styles";
import { bodyAreaIcon, type BodyArea } from "./content";

/**
 * Treatable body areas (Figma S4–S6). Figma has flattened screenshots whose labels shrink to ~4px on phones, so
 * each panel is rebuilt as a real list: icon crops + live labels. Figma's row breaks from lg; 4/6-column grid below.
 * Items are informational, not links (brief Q12 default).
 */
export function BodyAreas({ areas }: { areas: BodyArea[] }) {
  return (
    <div className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col gap-12 lg:gap-20")}>
        {areas.map((area) => (
          <section key={area.id} aria-labelledby={`${area.id}-title`} className="flex flex-col gap-6">
            <h2 id={`${area.id}-title`} className={tgH2}>
              {area.title}
            </h2>
            <div className="mx-auto w-full max-w-[936px] rounded-[10px] border-2 border-(--tg-mint) bg-white px-3 py-5 md:px-6 lg:py-6">
              <Reveal stagger>
                <ul className="grid grid-cols-4 gap-x-2 gap-y-4 md:grid-cols-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-2.5 lg:gap-y-5">
                  {area.rows.map((row, r) => (
                    <Fragment key={r}>
                      {r > 0 ? <li role="none" className="hidden lg:block lg:h-0 lg:basis-full" /> : null}
                      {row.map((label) => (
                        <li key={label} data-reveal-item className="group/area flex flex-col items-center gap-2 text-center lg:w-[100px]">
                          <Image
                            src={bodyAreaIcon(label)}
                            alt=""
                            width={96}
                            height={96}
                            sizes="(min-width: 1024px) 92px, 64px"
                            className="size-16 rounded-full transition-transform duration-200 ease-out motion-reduce:transition-none md:size-20 lg:size-[92px] motion-safe:[@media(hover:hover)]:group-hover/area:scale-[1.06]"
                          />
                          <span className="text-[10px] leading-tight font-semibold tracking-[0.02em] text-(--tg-ink) transition-colors duration-200 md:text-[11px] lg:text-[12px] [@media(hover:hover)]:group-hover/area:text-(--tg-teal-text)">
                            {label}
                          </span>
                        </li>
                      ))}
                    </Fragment>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
