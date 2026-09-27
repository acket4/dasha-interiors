"use client";

import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring, type Variants } from "framer-motion";
import { AtSign } from "lucide-react";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const TIMELINE = [
  { year: "2018", label: "Первый проект под ключ" },
  { year: "2021", label: "Авторский надзор на 20+ объектах" },
  { year: "2026", label: "Студия полного цикла" },
];

const MOSAIC_COUNT = 6;

function TiltCard({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 220, damping: 22, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22, mass: 0.5 });
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}% ${my}%, rgba(212,175,55,0.18), transparent 70%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 8);
    mx.set(px * 100);
    my.set(py * 100);
  }

  function handleLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      variants={item}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      className={`group relative overflow-hidden rounded-[26px] border border-white/8 bg-white/[0.03] backdrop-blur-xl transition-colors hover:border-[#D4AF37]/25 ${className}`}
    >
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="px-6 pb-28 sm:px-10 lg:px-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-3 sm:grid-rows-2"
      >
        {/* Cell 1 — real photo, audience caption */}
        <TiltCard className="sm:col-span-2 sm:row-span-2">
          <div className="absolute inset-0">
            <PhotoPlaceholder label="Фото интерьера" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1013] via-[#0F1013]/55 to-[#0F1013]/10" />
          </div>

          <div className="relative flex h-full min-h-[320px] flex-col justify-between p-7">
            <a
              href="https://www.instagram.com/darya_zver"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-[#0F1013]/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#EFE9DD] backdrop-blur-md transition-colors hover:border-[#D4AF37]/50"
            >
              <AtSign className="h-3 w-3 text-[#D4AF37]" />
              darya_zver
            </a>

            <div>
              <div className="font-display text-6xl text-[#EFE9DD] sm:text-7xl">
                50K<span className="text-gradient-gold">+</span>
              </div>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#EFE9DD]/85">
                Почти 50 000 человек в Instagram следят за тем, как рождается
                каждый проект: от первого эскиза до финального кадра.
              </p>
            </div>
          </div>
        </TiltCard>

        {/* Cell 2 — years, timeline */}
        <TiltCard className="flex flex-col p-7 sm:col-start-3 sm:row-start-1">
          <div className="font-display text-4xl text-[#EFE9DD]">8 лет</div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#a49d8c]">
            практики и надзора
          </div>
          <div className="mt-6 flex flex-1 flex-col justify-between">
            {TIMELINE.map((t) => (
              <div key={t.year} className="flex gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                <div>
                  <div className="font-mono text-[10px] text-[#D4AF37]">{t.year}</div>
                  <div className="text-[13px] leading-snug text-[#c9c2b0]">{t.label}</div>
                </div>
              </div>
            ))}
          </div>
        </TiltCard>

        {/* Cell 3 — projects, micro previews */}
        <TiltCard className="p-7 sm:col-start-3 sm:row-start-2">
          <div className="font-display text-4xl text-[#EFE9DD]">60+</div>
          <div className="mt-1 mb-5 font-mono text-[10px] uppercase tracking-widest text-[#a49d8c]">
            реализованных проектов
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: MOSAIC_COUNT }).map((_, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                <PhotoPlaceholder />
              </div>
            ))}
          </div>
          <div className="mt-3 font-mono text-[9px] uppercase tracking-wider text-[#6b6558]">
            превью появятся по мере съёмок
          </div>
        </TiltCard>
      </motion.div>
    </section>
  );
}
