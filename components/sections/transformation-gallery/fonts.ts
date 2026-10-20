import { Playfair_Display, Poppins } from "next/font/google";

/** Gallery fonts, shared by the shell and the popups (dialogs render in a portal outside the .tg wrapper). */
export const tgPoppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-tg" });
// Stat numerals and the hub's Before/After labels (Figma: Playfair / "Poor Richard", not a web font).
export const tgPlayfair = Playfair_Display({ subsets: ["latin"], weight: ["500"], display: "swap", variable: "--font-tg-display", preload: false });
