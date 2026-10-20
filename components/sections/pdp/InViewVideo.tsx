"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type InViewVideoProps = {
  src: string;
  poster: string;
  /** Empty = decorative (the video is hidden from screen readers; the pause button still gets a label). */
  label?: string;
  className?: string;
  /** Where the pause/play button sits. Every looping clip keeps a pause button (WCAG 2.2.2). */
  control?: "corner" | "center";
  /** Extra classes for the button, e.g. a z-index when the video sits behind other content. */
  buttonClassName?: string;
};

/**
 * Muted looping video that only plays while it is on screen and only downloads when it gets close.
 * Reduced motion → stays on the poster until the visitor presses play.
 */
export function InViewVideo({ src, poster, label, className, control = "corner", buttonClassName }: InViewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) userPaused.current = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (video.preload !== "auto") video.preload = "auto";
          if (!userPaused.current) video.play().catch(() => setPlaying(false));
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  const name = label || "background video";
  const iconSize = control === "center" ? 22 : 16;

  return (
    <>
      <video
        ref={ref}
        className={cn("size-full object-cover", className)}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden={label ? undefined : true}
        aria-label={label || undefined}
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} ${name}`}
        className={cn(
          "absolute grid place-items-center rounded-full bg-white/90 text-(--pdp-accent-strong) shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-[opacity,scale] duration-200 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) active:scale-95",
          control === "center"
            ? "top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/2"
            : "right-3 bottom-3 size-9 opacity-80 hover:opacity-100",
          control === "center" && playing && "opacity-0 group-hover:opacity-100",
          buttonClassName,
        )}
      >
        {playing ? <Pause aria-hidden size={iconSize} /> : <Play aria-hidden size={iconSize} className="translate-x-px" />}
      </button>
    </>
  );
}
