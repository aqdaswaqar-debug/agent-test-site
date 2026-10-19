type ResponsiveTextProps = { desktop: string; mobile?: string };

/** Shows the shorter mobile copy below lg and the full copy from lg up (Figma has separate copy per frame). */
export function ResponsiveText({ desktop, mobile }: ResponsiveTextProps) {
  if (!mobile || mobile === desktop) return <>{desktop}</>;
  return (
    <>
      <span className="lg:hidden">{mobile}</span>
      <span className="hidden lg:inline">{desktop}</span>
    </>
  );
}
