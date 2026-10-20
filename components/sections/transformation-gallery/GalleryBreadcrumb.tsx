import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { galleryUrl } from "./shared-data";
import { tgContainer } from "./styles";

/** Home › Transformation Gallery › <page>: links every treatment page back to the gallery hub. */
export function GalleryBreadcrumb({ current }: { current: string }) {
  const link = "rounded-[4px] text-(--tg-teal-text) underline-offset-4 focus-visible:outline-2 focus-visible:outline-(--tg-teal) [@media(hover:hover)]:hover:underline";
  return (
    <nav aria-label="Breadcrumb" className="border-b border-(--tg-line)/60 bg-white">
      <ol className={`${tgContainer} flex flex-wrap items-center gap-1.5 py-3 text-[13px] text-(--tg-muted) lg:text-[14px]`}>
        <li>
          <a href="https://berkowits.com/" className={link}>
            Home
          </a>
        </li>
        <ChevronRight aria-hidden size={14} />
        <li>
          <Link href={galleryUrl()} className={link}>
            Transformation Gallery
          </Link>
        </li>
        <ChevronRight aria-hidden size={14} />
        <li aria-current="page" className="font-medium text-(--tg-ink)">
          {current}
        </li>
      </ol>
    </nav>
  );
}
