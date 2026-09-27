"use client";

import { useEffect, useRef, useState } from "react";
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
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const start = useRef({ x: 0, y: 0 });
  const intent = useRef<"none" | "horizontal" | "vertical">("none");

  useEffect(() => {
    function measure() {
      if (containerRef.current) setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const cardWidth = Math.min(460, Math.max(220, containerWidth * 0.32));
  const cardHeight = cardWidth * 1.25;
  const xStep = cardWidth * 0.62;
  const yStep = cardWidth * 0.15;
  const containerHeight = cardHeight + yStep * 2 + 40;

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
      ref={containerRef}
      onPointerDown={handlePointerDown}
      className="relative mx-auto mt-16 w-full touch-pan-y select-none"
      style={{ perspective: 1200, height: containerHeight || undefined }}
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
              x: d * xStep,
              y: Math.abs(d) * yStep,
              rotate: d * ANGLE_STEP,
              scale: 1 - Math.abs(d) * 0.1,
              opacity: visible ? 1 - Math.abs(d) * 0.3 : 0,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            style={{
              zIndex: 10 - Math.abs(d),
              pointerEvents: visible ? "auto" : "none",
              width: cardWidth,
              height: cardHeight,
            }}
            className="absolute left-1/2 top-0 -translate-x-1/2 touch-pan-y cursor-grab overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] active:cursor-grabbing"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <ImageIcon className="h-8 w-8 text-white/15" strokeWidth={1.5} />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">
                скоро
              </span>
            </div>
            {isActive && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F1013] via-[#0F1013]/70 to-transparent px-6 pb-6 pt-14 font-display text-2xl text-[#EFE9DD] sm:text-3xl"
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
