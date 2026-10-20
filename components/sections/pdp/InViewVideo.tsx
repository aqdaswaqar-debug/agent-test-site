"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type InViewVideoProps = {
  src: string;
  poster: string;
  /** Empty = decorative (hidden from screen readers). */
  label?: string;
  className?: string;
  /** Where the pause/play button sits; "none" hides it (only for clips that never loop past 5s). */
  control?: "corner" | "center" | "none";
  /** Called when playback state changes (lets a parent restyle around it). */
  onPlayingChange?: (playing: boolean) => void;
};

/**
 * Muted looping video that only plays while it is on screen and only downloads when it gets close.
 * Reduced motion → stays on the poster until the visitor presses play.
 * Every autoplaying clip has a pause button (WCAG 2.2.2 for moving content longer than 5 s).
 */
export function InViewVideo({ src, poster, label, className, control = "corner", onPlayingChange }: InViewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const userPausedRef = useRef(false);
  userPausedRef.current = userPaused;

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setUserPaused(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (video.preload !== "auto") video.preload = "auto";
          if (!userPausedRef.current) video.play().catch(() => setPlaying(false));
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => onPlayingChange?.(playing), [playing, onPlayingChange]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      setUserPaused(false);
      video.play().catch(() => setPlaying(false));
    } else {
      setUserPaused(true);
      video.pause();
    }
  };

  const decorative = !label;

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
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : label}
        tabIndex={-1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {control !== "none" ? (
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? "Pause" : "Play"} ${label || "background video"}`}
          className={cn(
            "absolute grid place-items-center rounded-full bg-white/90 text-(--pdp-accent-strong) shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-[opacity,scale] duration-200 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--pdp-accent) active:scale-95",
            control === "center"
              ? "top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/2"
              : "right-3 bottom-3 size-9 opacity-80 [@media(hover:hover)]:hover:opacity-100",
            control === "center" && playing && "opacity-0 [@media(hover:hover)]:group-hover:opacity-100",
          )}
        >
          {playing ? <Pause aria-hidden size={control === "center" ? 22 : 16} /> : <Play aria-hidden size={control === "center" ? 22 : 16} className="translate-x-px" />}
        </button>
      ) : null}
    </>
  );
}
