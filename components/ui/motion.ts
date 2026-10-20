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

/*
 * Centre-focus carousels (house pattern for EVERY card carousel: reviews, videos, results, journeys).
 * The selected slide sits centred at full size and raised with a soft shadow; its neighbours are slightly smaller.
 * Scale and shadow opacity only (no box-shadow animation). Use with Embla `align: "center"` (+ `loop` when > 3 slides).
 */
const focusScaleOn = "scale-100";
const focusScaleOff = "scale-[0.88]";
/** Scale part: put on the slide's outer wrapper. */
export const focusScale = (selected: boolean) =>
  `transition-[scale] duration-300 ease-out motion-reduce:transition-none ${selected ? focusScaleOn : focusScaleOff}`;
/** Shadow part: put on the card itself (must not be overflow-hidden; clip media inside it). */
export const focusShadow = (selected: boolean) =>
  "relative after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[0_8px_30px_rgba(0,0,0,0.22)] after:transition-opacity after:duration-300 motion-reduce:after:transition-none " +
  (selected ? "after:opacity-100" : "after:opacity-0");
/** Both on one element. */
export const focusSlide = (selected: boolean) => `${focusScale(selected)} ${focusShadow(selected)}`;
