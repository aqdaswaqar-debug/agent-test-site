"use client";

import { CloseButton, Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { BookingForm } from "@/components/ui/site/BookingForm";
import { siteThemeClass } from "@/components/ui/site/site-styles";
import { cn } from "@/lib/utils";
import { tgPoppins } from "./fonts";

/** "Book A Consultation Now!" popup, matching the berkowits.com booking modal (blurred backdrop, white card). */
export function ConsultDialog({ open, onClose, treatment }: { open: boolean; onClose: () => void; treatment?: string }) {
  return (
    <Dialog open={open} onClose={onClose} className={cn(siteThemeClass(), tgPoppins.className, "relative z-60")}>
      <div aria-hidden className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="fixed inset-0 grid place-items-center overflow-y-auto p-3 sm:p-6">
        <DialogPanel className="w-full max-w-[512px] rounded-[24px] bg-white shadow-2xl">
          <div className="flex items-start justify-between gap-4 px-5 pt-6 pb-4 sm:px-6">
            <div className="flex flex-col gap-2">
              <DialogTitle className="text-[24px] leading-tight font-bold tracking-[-0.02em] text-(--site-ink) sm:text-[30px]">Book A Consultation Now!</DialogTitle>
              <Description className="text-[14px] leading-[1.6] text-(--site-body) sm:text-[15px]">
                Free, no-obligation consultation with a Berkowits hair &amp; skin expert. Takes less than a minute.
              </Description>
            </div>
            <CloseButton aria-label="Close" className="-mt-1 -mr-2 grid size-10 shrink-0 place-items-center rounded-full text-(--site-subtle) focus-visible:outline-2 focus-visible:outline-(--site-accent) [@media(hover:hover)]:hover:bg-(--site-tint)">
              <X aria-hidden size={20} />
            </CloseButton>
          </div>
          <BookingForm treatment={treatment} onSuccess={onClose} />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
