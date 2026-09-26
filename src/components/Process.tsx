"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const STEPS = [
  { title: "Бриф", text: "Обмер и разговор о привычках" },
  { title: "Концепция", text: "Планировка и 3D-визуализация" },
  { title: "Чертежи", text: "Документация для подрядчиков" },
  { title: "Стройка", text: "Авторский надзор на объекте" },
  { title: "Декор", text: "Расстановка и фотосъёмка" },
];

const N = STEPS.length;

export default function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);

  function stepToX(i: number) {
    const width = trackRef.current?.getBoundingClientRect().width ?? 0;
    return (i / (N - 1)) * width;
  }

  function goTo(i: number, animated = true) {
    setActive(i);
    const target = stepToX(i);
    if (animated) {
      animate(x, target, { type: "spring", stiffness: 380, damping: 34 });
    } else {
      x.set(target);
    }
  }

  function handleDrag() {
    const width = trackRef.current?.getBoundingClientRect().width ?? 1;
    const pct = Math.min(1, Math.max(0, x.get() / width));
    const idx = Math.round(pct * (N - 1));
    setActive((prev) => (prev === idx ? prev : idx));
  }

  useEffect(() => {
    x.set(0);
    const onResize = () => goTo(active, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="process" className="px-6 pb-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance font-display text-4xl leading-[0.95] tracking-[-0.03em] hyphens-none text-[#EFE9DD] sm:text-5xl"
        >
          Как проходит <span className="text-gradient-gold">проект</span>
        </motion.h2>

        <div className="mt-24 rounded-[24px] border border-white/10 bg-white/[0.03] px-6 py-6 backdrop-blur-xl sm:px-9 sm:py-8">
          <div className="mb-8 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#a49d8c]">
              Этап{" "}
              <span className="font-body text-lg font-semibold normal-case tracking-normal text-[#EFE9DD]">
                {STEPS[active].title}
              </span>
            </span>
            <span className="font-mono text-[11px] text-[#6b6558]">
              0{active + 1} / 0{N}
            </span>
          </div>

          <div ref={trackRef} className="relative h-[3px] rounded-full bg-white/10">
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                onClick={() => goTo(i)}
                aria-label={s.title}
                style={{ left: `${(i / (N - 1)) * 100}%` }}
                className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                    active === i ? "bg-[#0F1013]" : "bg-white/25 hover:bg-white/45"
                  }`}
                />
              </button>
            ))}

            <motion.div
              drag="x"
              dragConstraints={trackRef}
              dragElastic={0}
              dragMomentum={false}
              onDrag={handleDrag}
              onDragEnd={() => goTo(active)}
              style={{ x }}
              className="absolute left-0 top-1/2 z-10 h-6 w-6 -translate-y-1/2 cursor-grab touch-none rounded-full bg-[#D4AF37] shadow-[0_2px_12px_rgba(212,175,55,0.45)] active:cursor-grabbing"
            />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-5">
          {STEPS.map((s, i) => (
            <button key={s.title} onClick={() => goTo(i)} className="text-left">
              <span className="font-mono text-xs text-[#D4AF37]">0{i + 1}</span>
              <h4
                className={`mt-2 font-body font-semibold text-[#EFE9DD] transition-all duration-300 ${
                  active === i ? "text-2xl opacity-100" : "text-base opacity-35"
                }`}
              >
                {s.title}
              </h4>
              <p
                className={`mt-1.5 text-sm leading-relaxed text-[#a49d8c] transition-opacity duration-300 ${
                  active === i ? "opacity-100" : "opacity-0 sm:opacity-35"
                }`}
              >
                {s.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
