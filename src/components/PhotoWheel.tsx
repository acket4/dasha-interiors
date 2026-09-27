"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

const CARDS = [
  "Кухня-гостиная",
  "Спальня",
  "Ванная комната",
  "Гардеробная",
  "Прихожая",
  "Детская",
];

const N = CARDS.length;
const ANGLE_STEP = 9;
const X_STEP = 128;
const Y_STEP = 34;
const DRAG_THRESHOLD = 60;

function wrap(i: number) {
  return ((i % N) + N) % N;
}

function shortestOffset(index: number, active: number) {
  let d = index - active;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

export default function PhotoWheel() {
  const [active, setActive] = useState(0);
  const start = useRef({ x: 0, y: 0 });
  const intent = useRef<"none" | "horizontal" | "vertical">("none");

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    start.current = { x: e.clientX, y: e.clientY };
    intent.current = "none";

    function onMove(ev: PointerEvent) {
      if (intent.current === "vertical") return;
      const dx = ev.clientX - start.current.x;
      const dy = ev.clientY - start.current.y;
      if (intent.current === "none") {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        intent.current = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
        if (intent.current === "vertical") {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
        }
      }
    }

    function onUp(ev: PointerEvent) {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (intent.current !== "horizontal") return;
      const delta = ev.clientX - start.current.x;
      if (delta > DRAG_THRESHOLD) setActive((a) => wrap(a - 1));
      else if (delta < -DRAG_THRESHOLD) setActive((a) => wrap(a + 1));
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  return (
    <div
      onPointerDown={handlePointerDown}
      className="relative mx-auto mt-16 h-[420px] w-full max-w-3xl touch-pan-y select-none sm:h-[480px]"
      style={{ perspective: 1200 }}
    >
      {CARDS.map((label, i) => {
        const d = shortestOffset(i, active);
        const isActive = d === 0;
        const visible = Math.abs(d) <= 2;

        return (
          <motion.div
            key={label}
            onClick={() => setActive(i)}
            animate={{
              x: d * X_STEP,
              y: Math.abs(d) * Y_STEP,
              rotate: d * ANGLE_STEP,
              scale: 1 - Math.abs(d) * 0.1,
              opacity: visible ? 1 - Math.abs(d) * 0.3 : 0,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            style={{ zIndex: 10 - Math.abs(d), pointerEvents: visible ? "auto" : "none" }}
            className="absolute left-1/2 top-0 aspect-[4/5] w-[220px] -translate-x-1/2 touch-pan-y cursor-grab overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] active:cursor-grabbing sm:w-[260px]"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <ImageIcon className="h-7 w-7 text-white/15" strokeWidth={1.5} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">
                скоро
              </span>
            </div>
            {isActive && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1013] via-[#0F1013]/70 to-transparent px-5 pb-5 pt-10 font-display text-xl text-[#EFE9DD]"
              >
                {label}
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
