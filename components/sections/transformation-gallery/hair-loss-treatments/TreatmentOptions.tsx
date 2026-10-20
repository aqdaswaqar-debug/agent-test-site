import Image from "next/image";
import { hoverLift } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { tgContainer, tgH2, tgSection } from "../styles";
import { TREATMENTS, type Treatment } from "./content";

function TreatmentCard({ t, className }: { t: Treatment; className?: string }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-4 rounded-[10px] bg-white lg:gap-6",
        t.featured ? "border-[5px] border-(--tg-teal) p-[15px] shadow-[0_0_16px_var(--tg-teal)]" : "border-2 border-(--tg-teal) p-[18px]",
        hoverLift,
        className,
      )}
    >
      <div className="relative aspect-[432/308] w-full">
        <Image src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 1024px) 432px, (min-width: 768px) 45vw, 90vw" className="object-contain" />
      </div>
      <h3 className="text-[24px] leading-[1.4] font-semibold lg:text-[28px] xl:text-[32px] xl:leading-[1.3]">{t.title}</h3>
      <ul className="flex list-disc flex-col gap-4 pl-7 text-[18px] leading-[1.4] font-medium marker:text-(--tg-teal) lg:text-[20px] lg:font-normal">
        {t.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

/** "Explore Our Comprehensive Treatment Options" (Figma 208:5799 / 1008:16139): 3 cards, the middle one featured, plus the note card. */
export function TreatmentOptions() {
  const { title, intro, cards, note } = TREATMENTS;
  return (
    <section aria-labelledby="treatments-title" className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col items-center gap-6 lg:gap-12")}>
        <div className="flex flex-col items-center gap-6 text-center lg:gap-12">
          <h2 id="treatments-title" className={cn(tgH2, "max-w-[360px] md:max-w-none")}>
            {title}
          </h2>
          <p className="max-w-[1300px] text-[16px] leading-[1.5] md:text-[20px] lg:text-[26px] xl:text-[32px] xl:leading-[1.4]">{intro}</p>
        </div>
        <Reveal stagger className="w-full lg:mt-8">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-14">
            {cards.map((t, i) => (
              <li key={t.title} data-reveal-item className={cn(i === 2 && "md:col-span-2 md:mx-auto md:w-1/2 lg:col-span-1 lg:w-full")}>
                <TreatmentCard t={t} />
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="w-full max-w-[900px]">
          <ul className="list-disc rounded-[10px] border-2 border-(--tg-teal) py-4 pr-5 pl-10 text-[18px] leading-[1.4] marker:text-(--tg-teal) lg:text-[20px]">
            <li>{note}</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
