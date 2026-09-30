"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Lines, Reveal } from "@/components/motion";

const STEPS = [
  { title: "Бриф", text: "Обмер и разговор о привычках" },
  { title: "Концепция", text: "Планировка и 3D-визуализация" },
  { title: "Чертежи", text: "Документация для подрядчиков" },
  { title: "Стройка", text: "Авторский надзор на объекте" },
  { title: "Декор", text: "Расстановка и фотосъёмка" },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] });
  const progress = useTransform(scrollYProgress, (v) => (reduced ? 1 : v));

  return (
    <section id="process" className="bg-ink px-5 py-28 text-paper sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="mb-6 text-[12px] uppercase tracking-[0.16em] text-sand">Процесс</p>
        </Reveal>
        <Lines
          className="text-[clamp(2.6rem,6vw,6rem)] font-light leading-[0.92] tracking-[-0.045em]"
          lines={["Как проходит", "проект"]}
        />

        <div ref={ref} className="relative mt-20 lg:mt-28">
          <div className="absolute bottom-0 left-[5px] top-0 w-px bg-paper/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[5px] lg:h-px lg:w-auto">
            <motion.div
              style={{ scaleY: progress }}
              className="h-full w-full origin-top bg-sand lg:hidden"
            />
            <motion.div
              style={{ scaleX: progress }}
              className="hidden h-full w-full origin-left bg-sand lg:block"
            />
          </div>

          <ol className="grid gap-12 lg:grid-cols-5 lg:gap-8">
            {STEPS.map((s, i) => (
              <Step key={s.title} index={i} step={s} progress={progress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  index,
  step,
  progress,
}: {
  index: number;
  step: (typeof STEPS)[number];
  progress: MotionValue<number>;
}) {
  const at = index / (STEPS.length - 1);
  const lit = useTransform(progress, [Math.max(0, at - 0.12), at], [0, 1]);
  const opacity = useTransform(lit, [0, 1], [0.3, 1]);
  const y = useTransform(lit, [0, 1], [18, 0]);

  return (
    <li className="relative pl-10 lg:pl-0 lg:pt-12">
      <motion.span
        style={{ scale: lit }}
        className="absolute left-0 top-1 h-[11px] w-[11px] rounded-full bg-sand lg:top-0"
      />
      <span className="absolute left-0 top-1 h-[11px] w-[11px] rounded-full border border-paper/30 lg:top-0" />
      <motion.div style={{ opacity, y }}>
        <span className="text-[13px] tabular-nums text-sand">0{index + 1}</span>
        <h3 className="mt-3 text-[clamp(1.6rem,2.4vw,2.2rem)] font-light leading-none tracking-[-0.035em]">
          {step.title}
        </h3>
        <p className="mt-3 max-w-[24ch] text-[15px] leading-[1.55] text-paper/65">{step.text}</p>
      </motion.div>
    </li>
  );
}
