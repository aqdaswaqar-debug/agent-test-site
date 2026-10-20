"use client";

import { CloseButton, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { tgPoppins } from "./fonts";
import type { VideoStory } from "./types";

/** Popup YouTube player (privacy-enhanced embed, autoplay on open, stops when closed). Loaded on first use. */
export function VideoDialog({ video, onClose }: { video: VideoStory | null; onClose: () => void }) {
  return (
    <Dialog open={!!video} onClose={onClose} className={cn(tgPoppins.className, "relative z-60")}>
      <div aria-hidden className="fixed inset-0 bg-black/80" />
      <div className="fixed inset-0 grid place-items-center p-3 sm:p-8">
        <DialogPanel className="relative w-full max-w-[1100px]">
          <div className="mb-2 flex items-center justify-between gap-4 text-white">
            <DialogTitle className="line-clamp-1 text-[14px] font-medium sm:text-[16px]">{video?.title}</DialogTitle>
            <CloseButton aria-label="Close video" className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 focus-visible:outline-2 focus-visible:outline-white [@media(hover:hover)]:hover:bg-white/20">
              <X aria-hidden size={20} />
            </CloseButton>
          </div>
          {video ? (
            <div className="aspect-video overflow-hidden rounded-[12px] bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="size-full"
              />
            </div>
          ) : null}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
