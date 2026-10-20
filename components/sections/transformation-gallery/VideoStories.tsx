"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Play } from "lucide-react";
import { Dots, useEmblaDots } from "@/components/ui/carousel-controls";
import { focusSlide, hoverZoom } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { tgContainer, tgH2, tgSection } from "./styles";
import type { VideoStory } from "./types";

const VideoDialog = dynamic(() => import("./VideoDialog").then((m) => m.VideoDialog), { ssr: false });

/** "Hear It From Them" video row (Figma 204:4273): swipeable thumbnails; each plays its YouTube video in a popup. */
export function VideoStories({ videos, title = "Hear It From Them" }: { videos: VideoStory[]; title?: string }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: "center", loop: videos.length > 3 });
  const { selected, count, scrollTo } = useEmblaDots(embla);
  const [playing, setPlaying] = useState<VideoStory | null>(null);
  const [loaded, setLoaded] = useState(false);
  return (
    <section aria-labelledby="videos-title" className={tgSection}>
      <div className={cn(tgContainer, "flex flex-col gap-6 lg:gap-10")}>
        <h2 id="videos-title" className={tgH2}>
          {title}
        </h2>
        <div ref={viewportRef} className="-mx-4 overflow-hidden px-4 py-6" role="region" aria-roledescription="carousel" aria-label="Video stories">
          <ul className="flex">
            {videos.map((v, i) => (
              <li key={v.title} className="min-w-0 flex-[0_0_83%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] lg:px-4">
                <div className={cn("rounded-[10px] lg:rounded-[16px]", focusSlide(i === selected))}>
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let people open YouTube in a new tab
                    e.preventDefault();
                    setLoaded(true);
                    setPlaying(v);
                  }}
                  className="group relative block aspect-[500/256] overflow-hidden rounded-[10px] border-2 border-(--tg-line) bg-(--tg-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tg-teal-text) lg:rounded-[16px]"
                >
                  <Image src={v.thumb.src} alt="" fill sizes="(min-width: 1024px) 500px, 83vw" className={cn("object-cover", hoverZoom)} />
                  <span aria-hidden className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/25" />
                  <span aria-hidden className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full bg-white/90 text-(--tg-teal-text) shadow-lg transition-[scale] duration-200 motion-safe:group-hover:scale-110 lg:size-16">
                    <Play className="ml-1 size-6 fill-current" />
                  </span>
                  <span className="sr-only">Play video: {v.title}</span>
                </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Dots count={count} selected={selected} onSelect={scrollTo} label="Video" />
      </div>
      {loaded ? <VideoDialog video={playing} onClose={() => setPlaying(null)} /> : null}
    </section>
  );
}
