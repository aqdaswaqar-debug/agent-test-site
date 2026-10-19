type ResponsiveTextProps = {
  desktop: string;
  mobile?: string;
  /** Where the copy switches from mobile to desktop. Default `lg` (Figma frame split). */
  breakpoint?: "md" | "lg";
};

const CLASSES = {
  md: { mobile: "md:hidden", desktop: "hidden md:inline" },
  lg: { mobile: "lg:hidden", desktop: "hidden lg:inline" },
} as const;

/** Shows the shorter mobile copy below the breakpoint and the full copy from it up (Figma has separate copy per frame). */
export function ResponsiveText({ desktop, mobile, breakpoint = "lg" }: ResponsiveTextProps) {
  if (!mobile || mobile === desktop) return <>{desktop}</>;
  return (
    <>
      <span className={CLASSES[breakpoint].mobile}>{mobile}</span>
      <span className={CLASSES[breakpoint].desktop}>{desktop}</span>
    </>
  );
}
