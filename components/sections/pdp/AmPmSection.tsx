"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Shield } from "lucide-react";
import { hoverLift } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { PdpContainer, SectionHeader } from "./PdpSection";
import type { PdpContent } from "./types";

type Routine = PdpContent["amPm"]["routines"][number];

function RoutineCard({ routine }: { routine: Routine }) {
  return (
    <div className={cn("flex h-full flex-col gap-4 rounded-[16px] border border-(--pdp-accent) bg-(--pdp-cream) p-5 lg:gap-6 lg:p-8", hoverLift)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[22px] font-bold text-(--pdp-ink) lg:text-[20px]">{routine.title}</h3>
        <span className={cn("rounded-[4px] px-3 py-1 text-[11px] font-bold text-white", routine.id === "am" ? "bg-(--pdp-accent-strong)" : "bg-(--pdp-ink)")}>{routine.badge}</span>
      </div>
      <ol className="flex flex-col gap-3">
        {routine.steps.map((s, i) => (
          <li key={s.name} className="flex items-center gap-3 text-[16px] lg:text-[14px]">
            <span className="font-bold text-(--pdp-accent-strong) tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className={s.highlight ? "font-bold text-(--pdp-ink)" : "text-(--pdp-body)"}>{s.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** "One Serum. Two Moments." (Figma 6969:23804 / 7202:4): two cards on desktop, real AM/PM tabs on mobile. */
export function AmPmSection({ data }: { data: PdpContent["amPm"] }) {
  return (
    <section aria-labelledby="ampm-title" className="bg-white py-8 lg:py-24">
      <PdpContainer className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader id="ampm-title" eyebrow={data.eyebrow} title={data.title} intro={data.intro} />

        {/* Desktop: both routines side by side */}
        <div className="hidden grid-cols-2 gap-10 lg:grid">
          {data.routines.map((r) => (
            <RoutineCard key={r.id} routine={r} />
          ))}
        </div>

        {/* Mobile: tabs show one routine at a time */}
        <TabGroup className="flex flex-col gap-4 lg:hidden">
          <TabList className="grid grid-cols-2 gap-2">
            {data.routines.map((r) => (
              <Tab
                key={r.id}
                className="rounded-[8px] border border-(--pdp-line) bg-white py-2.5 text-[13px] font-semibold text-(--pdp-body) transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) data-selected:border-(--pdp-ink) data-selected:bg-(--pdp-ink) data-selected:font-bold data-selected:text-white"
              >
                {r.tab}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {data.routines.map((r) => (
              <TabPanel key={r.id} unmount={false}>
                <RoutineCard routine={r} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>

        <p className="flex items-start gap-3 rounded-[12px] border border-(--pdp-accent) bg-(--pdp-tint) p-4 text-[14px] text-(--pdp-body) lg:items-center lg:rounded-[8px] lg:text-[13px]">
          <Shield aria-hidden size={20} className="mt-0.5 shrink-0 text-(--pdp-accent-strong) lg:mt-0" />
          <span>
            <strong className="font-bold text-(--pdp-ink)">{data.tip.lead}</strong> {data.tip.body}
          </span>
        </p>
      </PdpContainer>
    </section>
  );
}
