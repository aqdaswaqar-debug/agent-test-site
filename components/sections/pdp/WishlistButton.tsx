"use client";

import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { iconBtn } from "@/components/ui/site/site-styles";
import { cn } from "@/lib/utils";
import { usePdpSelection } from "./pdp-store";

/** Header wishlist toggle for the product on this page. */
export function WishlistButton({ productName, className }: { productName: string; className?: string }) {
  const wishlisted = usePdpSelection((s) => s.wishlisted);
  const toggle = usePdpSelection((s) => s.toggleWishlist);
  return (
    <button
      type="button"
      className={cn(iconBtn, className)}
      aria-pressed={wishlisted}
      aria-label={wishlisted ? `Remove ${productName} from wishlist` : `Save ${productName} to wishlist`}
      onClick={() => toast.success(toggle() ? "Saved to your wishlist" : "Removed from your wishlist", { id: "wishlist" })}
    >
      <Heart aria-hidden size={22} className={cn("transition-colors", wishlisted && "fill-(--site-accent-strong) text-(--site-accent-strong)")} />
    </button>
  );
}
