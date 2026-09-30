"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import PhotoFrame from "@/components/PhotoFrame";
import Pill from "@/components/Pill";
import { EASE, INTRO, Lines, Reveal } from "@/components/motion";

export default function Hero() {
  const reduced = useReducedMotion();
  const base = reduced ? 0 : INTRO - 0.35;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-paper">
      <motion.div style={{ y: reduced ? 0 : imageY }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.22 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: base - 0.25 }}
        >
          <PhotoFrame
            src="/photos/bedroom.jpg"
            alt="Спальня с лепным потолком"
            priority
            sizes="100vw"
            cover
            focalPoint="center 35%"
          />
        </motion.div>
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/45 to-transparent" />
      <div className="hero-mask pointer-events-none absolute inset-x-0 bottom-0 h-[70%]" />

      <motion.div
        style={{ y: reduced ? 0 : copyY }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 sm:px-10 sm:pb-12 lg:px-16 lg:pb-14"
      >
        <div className="flex items-end justify-between gap-10">
          <div className="[text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
            <Lines
              as="h1"
              immediate
              delay={base + 0.1}
              stagger={0.1}
              className="text-[clamp(2.7rem,9.5vw,9.5rem)] font-light leading-[0.88] tracking-[-0.05em]"
              lines={[
                "Функционально.",
                <span key="2" className="pl-[0.9em]">С&nbsp;характером.</span>,
                <span key="3" className="text-sand">Для&nbsp;вас.</span>,
              ]}
            />

            <div className="mt-9 flex flex-col gap-7 sm:flex-row sm:items-end sm:gap-12">
              <Reveal immediate delay={base + 0.55}>
                <p className="max-w-[36ch] text-[15px] leading-[1.6] text-paper/80 sm:text-[16px]">
                  Проектирую интерьеры квартир и&nbsp;домов по&nbsp;всей России для&nbsp;тех, кто различает
                  хороший вкус от&nbsp;навязанного тренда.
                </p>
              </Reveal>
              <Reveal immediate delay={base + 0.68}>
                <div className="flex flex-col gap-3">
                  <Pill href="#contact" tone="light">Обсудить проект</Pill>
                  <span className="pl-1 text-[12px] text-paper/60">Отвечаю лично, обычно в&nbsp;течение&nbsp;суток</span>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal immediate delay={base + 0.85} className="hidden shrink-0 lg:block">
            <a href="#gallery" className="group block w-[220px]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-[800ms] ease-soft group-hover:scale-105">
                  <PhotoFrame src="/photos/kitchen.jpg" alt="Кухня-гостиная" sizes="220px" cover />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px] uppercase tracking-[0.16em] text-paper/70">
                <span>Смотреть работы</span>
                <span className="h-px w-8 bg-paper/50 transition-[width] duration-[520ms] ease-soft group-hover:w-14" />
              </div>
            </a>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
