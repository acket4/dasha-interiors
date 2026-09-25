"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Award, Play } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
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
      whileTap={{ scale: 0.96 }}
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

function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20, mass: 0.5 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 14);
    rx.set(-py * 14);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
    >
      <Image
        src="/hero-interior.webp"
        alt="Пример интерьера в стиле, близком к проектам Дарьи"
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 40vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1013] via-transparent to-transparent" />

      <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#0F1013]/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#EFE9DD] backdrop-blur-md">
        пример интерьера
      </span>

      <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0F1013]/55 px-4 py-3 backdrop-blur-md">
        <span className="font-display text-[15px] italic text-[#EFE9DD]">Гостиная-кухня</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#a49d8c]">референс стиля</span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero-interior.webp"
          alt=""
          fill
          priority
          aria-hidden
          className="object-cover opacity-25 blur-sm motion-safe:animate-[kenburns_26s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1013] via-[#0F1013]/92 to-[#0F1013]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1013] via-transparent to-[#0F1013]/40" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-14 sm:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-16">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#c9c2b0]">
                Зверева Дарья · дизайнер интерьера
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
            className="font-display text-[13vw] leading-[0.98] tracking-[-0.01em] sm:text-6xl lg:text-[4.6rem] xl:text-[5rem]"
          >
            Пространство,
            <br />
            где живёт{" "}
            <span className="text-gradient-gold font-display italic">роскошь</span>
            <br />
            тишины
          </motion.h1>

          <motion.p variants={item} className="mt-7 max-w-md text-[15px] leading-relaxed text-[#a49d8c]">
            Проектирую интерьеры квартир и домов в Ангарске, Иркутске и ближайших
            районах — для тех, кто различает хороший вкус от навязанного тренда.
            Полный цикл — от планировки до авторского надзора на стройке.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-4">
            <MagneticButton>Обсудить проект</MagneticButton>
            <GhostButton href="#gallery">Смотреть портфолио</GhostButton>
          </motion.div>

          <motion.div variants={item} className="mt-14 flex items-center gap-8 border-t border-white/8 pt-7">
            <div>
              <div className="font-display text-2xl text-[#EFE9DD]">50K+</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#a49d8c]">
                в Instagram
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="font-display text-2xl text-[#EFE9DD]">8 лет</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#a49d8c]">
                практики
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <div className="font-display text-2xl text-[#EFE9DD]">60+</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#a49d8c]">
                проектов
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        >
          <TiltCard />
        </motion.div>
      </div>
    </section>
  );
}
