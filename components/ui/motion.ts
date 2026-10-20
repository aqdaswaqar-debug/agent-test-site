/**
 * Shared hover motion for cards (desktop pointers only, transform/opacity only).
 * The card lifts and a soft shadow fades in on a ::after layer, so no box-shadow is animated.
 * The card itself must not clip (no overflow-hidden): round and clip the image inside instead.
 */
export const hoverLift =
  "relative transition-transform duration-300 ease-out motion-reduce:transition-none " +
  "motion-safe:[@media(hover:hover)]:hover:-translate-y-1.5 " +
  "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:opacity-0 " +
  "after:shadow-[0_18px_40px_-12px_rgba(22,48,43,0.28)] after:transition-opacity after:duration-300 " +
  "motion-reduce:after:transition-none [@media(hover:hover)]:hover:after:opacity-100";

/** Image zoom inside a clipped frame; put `group` on the card. */
export const hoverZoom =
  "transition-transform duration-500 ease-out motion-reduce:transition-none motion-safe:[@media(hover:hover)]:group-hover:scale-[1.05]";
