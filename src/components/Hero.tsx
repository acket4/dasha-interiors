"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Award, Play } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero-interior.webp"
          alt="Интерьер из портфолио Дарьи"
          fill
          priority
          sizes="100vw"
          className="object-cover motion-safe:animate-[kenburns_28s_ease-in-out_infinite_alternate]"
          style={{ objectPosition: "72% 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1013] via-[#0F1013]/88 to-[#0F1013]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1013] via-transparent to-[#0F1013]/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-20 sm:px-10 lg:px-16">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div variants={item} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#c9c2b0]">
                Зверева Дарья, дизайнер интерьера
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
              <Award className="h-3 w-3 shrink-0 text-[#D4AF37]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#c9c2b0]">
                Человек года в номинации «Дизайнер»
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="break-words font-display text-[10.5vw] font-medium leading-[1.05] tracking-[-0.01em] sm:text-6xl lg:text-[4.4rem]"
          >
            Пространство,
            <br />
            где живёт <span className="text-gradient-gold">роскошь</span> тишины
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-md text-[15px] leading-relaxed text-[#c9c2b0]">
            Проектирую интерьеры квартир и домов в Ангарске, Иркутске и ближайших
            районах для тех, кто различает хороший вкус от навязанного тренда.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-4">
            <MagneticButton>Обсудить проект</MagneticButton>
            <GhostButton href="#gallery">Смотреть портфолио</GhostButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
