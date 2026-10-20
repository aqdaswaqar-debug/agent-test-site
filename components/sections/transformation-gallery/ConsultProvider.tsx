"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

const ConsultDialog = dynamic(() => import("./ConsultDialog").then((m) => m.ConsultDialog), { ssr: false });

type ConsultContextValue = { open: () => void };
const ConsultContext = createContext<ConsultContextValue | null>(null);

/** One lead popup per page; every ConsultLink opens it with the page's treatment preselected. */
export function ConsultProvider({ treatment, children }: { treatment?: string; children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const open = useCallback(() => {
    setLoaded(true);
    setOpen(true);
  }, []);
  const value = useMemo(() => ({ open }), [open]);
  return (
    <ConsultContext.Provider value={value}>
      {children}
      {loaded ? <ConsultDialog open={isOpen} onClose={() => setOpen(false)} treatment={treatment} /> : null}
    </ConsultContext.Provider>
  );
}

export const useConsult = () => useContext(ConsultContext);
