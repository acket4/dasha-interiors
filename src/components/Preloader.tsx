"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, INTRO } from "@/components/motion";

export default function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const t = setTimeout(() => (root.style.overflow = ""), INTRO * 1000);
    return () => {
      clearTimeout(t);
      root.style.overflow = "";
    };
  }, [reduced]);

  if (done || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[200] flex flex-col justify-end bg-ink px-5 pb-8 text-paper motion-reduce:hidden sm:px-10 sm:pb-12 lg:px-16"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 1, ease: EASE, delay: INTRO - 0.5 }}
      onAnimationComplete={() => setDone(true)}
    >
      <div className="flex items-end justify-between gap-6">
        <div className="overflow-hidden pb-[0.1em]">
          <p className="pl-rise text-[clamp(2.6rem,10vw,9rem)] font-light leading-[0.9] tracking-[-0.045em]">
            Исакова
          </p>
        </div>
        <div className="overflow-hidden">
          <p className="pl-rise-late pb-2 text-[12px] uppercase tracking-[0.18em] text-paper/60">Дизайн интерьера</p>
        </div>
      </div>
      <div className="mt-6 h-px w-full bg-paper/15">
        <div className="pl-grow h-full bg-paper" />
      </div>
    </motion.div>
  );
}
