"use client";

import { CloseButton, Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react";
import { PhoneCall, X } from "lucide-react";
import { CallbackForm } from "@/components/ui/site/FooterClient";
import { siteThemeClass } from "@/components/ui/site/site-styles";
import { cn } from "@/lib/utils";
import { tgPoppins } from "./fonts";

/** "Book Consultation" popup: the same lead form as the footer (validation, honeypot, mock API, toasts). */
export function ConsultDialog({ open, onClose, treatment }: { open: boolean; onClose: () => void; treatment?: string }) {
  return (
    <Dialog open={open} onClose={onClose} className={cn(siteThemeClass(), tgPoppins.className, "relative z-60")}>
      <div aria-hidden className="fixed inset-0 bg-black/55" />
      <div className="fixed inset-0 grid place-items-end overflow-y-auto sm:place-items-center sm:p-6">
        <DialogPanel className="w-full max-w-[560px] rounded-t-[20px] bg-(--site-footer) p-5 text-white shadow-2xl sm:rounded-[20px] sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-[12px] bg-(--site-teal-soft) text-(--site-teal-text)">
                <PhoneCall aria-hidden size={18} />
              </span>
              <div>
                <DialogTitle className="text-[18px] font-semibold">Book a Free Consultation</DialogTitle>
                <Description className="text-[13px] text-white/60">Our expert calls you back within 24 hours.</Description>
              </div>
            </div>
            <CloseButton aria-label="Close" className="grid size-10 shrink-0 place-items-center rounded-full bg-white/8 focus-visible:outline-2 focus-visible:outline-(--site-teal) [@media(hover:hover)]:hover:bg-white/15">
              <X aria-hidden size={18} />
            </CloseButton>
          </div>
          <CallbackForm defaultTreatment={treatment} layout="stacked" onSuccess={onClose} />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
