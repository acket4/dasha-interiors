"use client";

import { useRef } from "react";
import { easeIn, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import PhotoFrame from "@/components/PhotoFrame";
import Pill from "@/components/Pill";
import { EASE, INTRO, Lines, Reveal } from "@/components/motion";

/** Section height in viewport heights; the dive itself takes (DIVE - 1) screens of scrolling. */
const DIVE = 1.75;

export default function Hero() {
  const reduced = useReducedMotion();
  const base = reduced ? 0 : INTRO - 0.35;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Spring smooths out wheel steps so the zoom glides instead of jumping.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.35 });

  // Ranges always span 0..1 so values hold after their last keyframe.
  // Camera pushes toward the pillows, accelerating like a fall.
  const scale = useTransform(p, [0, 1], [1, 5], { ease: easeIn });
  const blur = useTransform(p, [0, 0.55, 1], ["blur(0px)", "blur(0px)", "blur(10px)"]);
  // The sheets swallow the frame and hand over to the paper-coloured next section.
  const sheet = useTransform(p, [0, 0.7, 0.96, 1], [0, 0, 1, 1]);
  const copyOpacity = useTransform(p, [0, 0.18, 1], [1, 0, 0]);
  const copyY = useTransform(p, [0, 0.18, 1], ["0px", "-80px", "-80px"]);
  const scrims = useTransform(p, [0, 0.25, 1], [1, 0, 0]);

  return (
    <section ref={ref} className="relative bg-ink" style={{ height: reduced ? "100svh" : `${DIVE * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] min-h-[600px] overflow-hidden text-paper">
        <motion.div
          style={reduced ? undefined : { scale, filter: blur }}
          className="absolute inset-0 origin-[48%_70%] will-change-transform md:origin-[50%_64%]"
        >
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

        <motion.div style={reduced ? undefined : { opacity: scrims }} className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/45 to-transparent" />
          <div className="hero-mask absolute inset-x-0 bottom-0 h-[70%]" />
        </motion.div>

        <motion.div
          style={reduced ? undefined : { opacity: copyOpacity, y: copyY }}
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
                  <span key="1">Функционально.</span>,
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

        {!reduced && (
          <motion.div style={{ opacity: sheet }} className="pointer-events-none absolute inset-0 z-20 bg-paper" />
        )}
      </div>
    </section>
  );
}
