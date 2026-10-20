import { BuyBox } from "./BuyBox";
import { Gallery } from "./Gallery";
import { PdpContainer } from "./PdpSection";
import type { PdpContent } from "./types";

/** First fold (Figma 6986:5175 / mobile 7132:261): gallery left (sticky on desktop), buy box right. */
export function HeroSection({ product }: { product: PdpContent["product"] }) {
  return (
    <section aria-labelledby="pdp-title" className="border-b border-[#e7e5e4] bg-[linear-gradient(137deg,#fafaf9_0%,#ffffff_50%,rgba(255,251,235,0.3)_100%)]">
      <PdpContainer className="grid gap-12 pt-4 pb-10 lg:grid-cols-2 lg:items-start lg:gap-12 lg:pt-12 lg:pb-16 xl:gap-16">
        <Gallery images={product.gallery} trustRow={product.trustRow} name={product.name} />
        <BuyBox product={product} />
      </PdpContainer>
    </section>
  );
}
