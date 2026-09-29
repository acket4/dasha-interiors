"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.45);
  }

  return (
    <motion.a
      ref={ref}
      href="#contact"
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#E8CC7B] via-[#D4AF37] to-[#C5A880] px-7 py-4 font-body text-sm font-semibold text-[#0F1013] shadow-[0_0_0_0_rgba(212,175,55,0.5)] transition-shadow duration-500 hover:shadow-[0_0_38px_6px_rgba(212,175,55,0.35)]"
    >
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}

function GhostButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a href={href} className="group relative inline-flex items-center gap-2 py-4 font-body text-sm text-[#EFE9DD]">
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-[#D4AF37]/60">
        <Play className="h-3.5 w-3.5 translate-x-[1px]" />
      </span>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
      </span>
    </a>
  );
}

export default function Hero() {
  return (
    <section className="relative" style={{ height: "170vh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <PhotoPlaceholder label="Фон: главное фото" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%]"
          style={{
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            maskImage: "linear-gradient(to top, black 0%, transparent 92%)",
            WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 92%)",
            background:
              "linear-gradient(to top, rgba(9,9,11,0.85), rgba(9,9,11,0.2) 92%)",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[100svh] items-start justify-between px-6 pt-28 font-mono text-[11px] uppercase tracking-[0.22em] text-[#EFE9DD]/85 sm:flex sm:px-10 lg:px-16"
        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
      >
        <span>[ Дизайн интерьера ]</span>
        <span>[ Вся Россия ]</span>
      </div>

      <div className="absolute inset-x-0 top-0 flex h-[100svh] flex-col justify-end px-6 pb-16 sm:px-10 lg:px-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-7xl"
        >
          <motion.h1
            variants={item}
            style={{ textShadow: "0 4px 28px rgba(0,0,0,0.75), 0 2px 10px rgba(0,0,0,0.6)" }}
            className="text-balance max-w-3xl break-words font-display text-[10.5vw] font-medium leading-[0.92] tracking-[-0.035em] text-[#F5F1E8] hyphens-none sm:text-6xl lg:text-[4.4rem]"
          >
            Пространство,
            <br />
            где живёт <span className="text-gradient-gold-onphoto">роскошь</span> тишины
          </motion.h1>

          <motion.p
            variants={item}
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-[#EFE9DD]/90"
          >
            Проектирую интерьеры квартир и домов&nbsp;по&nbsp;всей России
            для тех, кто различает хороший вкус
            от&nbsp;навязанного тренда.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <MagneticButton>Обсудить проект</MagneticButton>
            <GhostButton href="#gallery">Смотреть портфолио</GhostButton>
          </motion.div>

          <motion.p
            variants={item}
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.6)" }}
            className="mt-4 font-mono text-[12px] uppercase tracking-[0.08em] text-[#EFE9DD]/75"
          >
            Отвечаю лично, обычно в течение суток
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
