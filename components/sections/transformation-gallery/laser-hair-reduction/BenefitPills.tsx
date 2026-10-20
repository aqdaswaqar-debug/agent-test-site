/** Hero trust chips (Figma mobile 1008:17767…): static, not interactive. Stacked on phones, one row from lg. */
export function BenefitPills({ items }: { items: string[] }) {
  return (
    <ul aria-label="Why laser hair reduction at Berkowits" className="flex flex-col items-center gap-3 lg:flex-row lg:flex-wrap lg:gap-4">
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-2.5 rounded-full border-2 border-(--tg-teal) bg-[rgb(20_184_166/0.18)] px-5 py-1.5 text-[15px] leading-6 text-white backdrop-blur-sm lg:text-[16px]"
        >
          <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-white" />
          {item}
        </li>
      ))}
    </ul>
  );
}
