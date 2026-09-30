"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import PhotoFrame from "@/components/PhotoFrame";
import Pill from "@/components/Pill";
import { EASE, ImageReveal, Lines, Reveal } from "@/components/motion";

const FEATURED = [
  { src: "/photos/bedroom.jpg", label: "Спальня" },
  { src: "/photos/kitchen.jpg", label: "Кухня-гостиная" },
  { src: "/photos/stone-ensuite.jpg", label: "Санузел в камне" },
  { src: "/photos/closet.jpg", label: "Гардеробная" },
  { src: "/photos/hero-bath.jpg", label: "Ванная с панорамным окном" },
  { src: "/photos/living-room.jpg", label: "Гостиная" },
  { src: "/photos/guest-ensuite.jpg", label: "Гостевой санузел" },
];

const ALL = [
  ...FEATURED,
  { src: "/photos/bathroom.jpg", label: "Ванная комната" },
  { src: "/photos/bathtub.jpg", label: "Ванная" },
  { src: "/photos/shower.jpg", label: "Душевая" },
  { src: "/photos/vanity-detail.jpg", label: "Деталь интерьера" },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <section id="gallery" className="bg-ink px-5 py-28 text-paper sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-6 text-[12px] uppercase tracking-[0.16em] text-sand">Работы</p>
            </Reveal>
            <Lines
              className="text-[clamp(2.6rem,6vw,6rem)] font-light leading-[0.92] tracking-[-0.045em]"
              lines={["Интерьеры,", "в которых живут"]}
            />
          </div>
          <Reveal delay={0.15} className="flex flex-col items-start gap-6 lg:col-span-4 lg:col-start-9">
            <p className="max-w-[40ch] text-[15px] leading-[1.6] text-paper/70">
              Галерея пополняется по&nbsp;мере того, как завершаются новые проекты. Заходите время от&nbsp;времени,
              здесь будет появляться что-то новое.
            </p>
            <Pill onClick={() => setOpen(true)} variant="outline" tone="light">
              Смотреть все фото
            </Pill>
          </Reveal>
        </div>

        {/* Desktop: hovered photo widens, the rest step back. */}
        <div className="mt-16 hidden h-[72vh] min-h-[480px] gap-2 md:flex">
          {FEATURED.map((p, i) => {
            const on = active === i;
            return (
              <button
                key={p.src}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setOpen(true)}
                aria-label={`${p.label}, открыть все фото`}
                style={{ flexGrow: on ? 6 : 1 }}
                className="relative min-w-0 basis-0 overflow-hidden text-left transition-[flex-grow] duration-[900ms] ease-soft"
              >
                <ImageReveal className="h-full w-full" delay={i * 0.07}>
                  <div
                    className={`absolute inset-0 transition-[transform,filter] duration-[900ms] ease-soft ${
                      on ? "scale-100 grayscale-0" : "scale-110 grayscale-[35%]"
                    }`}
                  >
                    <PhotoFrame src={p.src} alt={p.label} sizes="(min-width: 768px) 60vw, 1px" cover />
                  </div>
                </ImageReveal>
                <div
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/70 to-transparent transition-opacity duration-700 ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span
                  className={`absolute bottom-6 left-6 whitespace-nowrap text-[22px] font-light tracking-[-0.02em] transition-[opacity,transform] duration-700 ease-soft ${
                    on ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0"
                  }`}
                >
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile: swipeable strip. */}
        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 md:hidden">
          {FEATURED.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(true)}
              className="w-[78vw] shrink-0 snap-start text-left"
            >
              <ImageReveal className="aspect-[3/4] w-full" delay={i * 0.07}>
                <PhotoFrame src={p.src} alt={p.label} sizes="78vw" cover />
              </ImageReveal>
              <span className="mt-3 block text-[15px] font-light">{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <Lightbox onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
}

function Lightbox({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Все фото"
      className="fixed inset-0 z-[100] overflow-y-auto bg-paper text-ink"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between bg-paper/85 px-5 py-4 backdrop-blur-xl sm:px-10 lg:px-16">
        <p className="text-lg font-light tracking-[-0.03em]">Все фото</p>
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          <X className="h-4 w-4 transition-transform duration-[520ms] ease-soft group-hover:rotate-90" strokeWidth={1.5} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-10 px-5 pb-16 pt-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-3 lg:px-16">
        {ALL.map((p, i) => (
          <motion.figure
            key={p.src}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.05 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <PhotoFrame src={p.src} alt={p.label} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" cover />
            </div>
            <figcaption className="mt-3 text-[12px] uppercase tracking-[0.16em] text-ink/60">{p.label}</figcaption>
          </motion.figure>
        ))}
      </div>
    </motion.div>
  );
}
