import { Suspense, type ReactNode } from "react";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { LazyCartDrawer } from "@/components/ui/site/LazyCartDrawer";
import { SiteFooter } from "@/components/ui/site/SiteFooter";
import { SiteHeader } from "@/components/ui/site/SiteHeader";
import { cn } from "@/lib/utils";
import { ConsultProvider } from "./ConsultProvider";
import { tgPlayfair, tgPoppins } from "./fonts";
import "@/components/ui/motion.css";
import "@/components/ui/site/site.css";
import "./tg.css";

/** Page frame shared by the gallery hub and the 5 treatment pages: header, main, footer, cart, toasts. */
export function GalleryShell({ children, treatment }: { children: ReactNode; treatment?: string }) {
  return (
    <div className={cn("tg min-h-dvh", tgPoppins.className, tgPoppins.variable, tgPlayfair.variable)}>
      <a href="#main" className="sr-only z-70 rounded-[8px] bg-(--tg-ink) px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <SiteHeader activeNav="Treatments" />
      <main id="main">
        <ConsultProvider treatment={treatment}>{children}</ConsultProvider>
      </main>
      <Suspense>
        <SiteFooter defaultTreatment={treatment} />
      </Suspense>
      {/* Giant wordmark band under the footer (Figma 217:6023); decorative. */}
      <div aria-hidden className="bg-white px-4 py-6 md:px-8 lg:py-10">
        <Image src="/images/transformation-gallery/shared/berkowits-wordmark.svg" alt="" width={370} height={80} unoptimized className="mx-auto h-auto w-full max-w-[1600px]" />
      </div>
      <LazyCartDrawer />
      <Toaster position="top-center" toastOptions={{ duration: 3000, style: { fontSize: "14px" } }} />
    </div>
  );
}
