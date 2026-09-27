"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Aperture, ArrowRight, Play, Video, X } from "lucide-react";
import PhotoFrame from "@/components/PhotoFrame";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

type MediaType = "photo" | "video" | null;
type ZoomTarget = { src: string; alt: string; w: number; h: number } | null;

const PHOTOS = [
  { src: "/photos/razdevalka.png", alt: "Раздевалка, спа-клуб", w: 2412, h: 2564 },
  { src: "/photos/kuhnya-gostinaya.png", alt: "Кухня-гостиная", w: 1127, h: 1396 },
  { src: "/photos/kuhnya-s-ostrovom.png", alt: "Кухня с островом", w: 2412, h: 2522 },
  { src: "/photos/kuhnya-zelenaya.png", alt: "Кухня в зелёных оттенках", w: 1206, h: 1502 },
  { src: "/photos/vannaya.png", alt: "Ванная комната", w: 2412, h: 2524 },
  { src: "/photos/garderobnaya.png", alt: "Гардеробная", w: 2412, h: 2546 },
  { src: "/photos/komnata-na-dvoih.png", alt: "Комната на двоих", w: 2410, h: 2502 },
];

const panelItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function ZoomView({ target, onClose }: { target: ZoomTarget; onClose: () => void }) {
  if (!target) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[#0F1013]/98 p-6 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-[28px] border border-white/10"
      >
        <Image
          src={target.src}
          alt={target.alt}
          width={target.w}
          height={target.h}
          sizes="(max-width: 672px) 90vw, 672px"
          className="max-h-[85vh] w-full object-contain"
        />
        <span className="absolute bottom-5 left-5 z-10 font-display text-xl text-[#EFE9DD]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.7)" }}>
          {target.alt}
        </span>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-[#EFE9DD] transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
        aria-label="Закрыть"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function PhotoLightbox({ onClose }: { onClose: () => void }) {
  const [zoomed, setZoomed] = useState<ZoomTarget>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-[#0F1013]/95 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="mx-auto flex h-full max-w-6xl flex-col px-6 py-10 sm:px-10"
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">Все фото</p>
              <h3 className="mt-2 font-display text-3xl text-[#EFE9DD]">Коллекция фотографий</h3>
            </div>
            <button
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#EFE9DD] transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-8 overflow-y-auto pb-6">
            {PHOTOS.map((item) => (
              <button
                key={item.src}
                onClick={() => setZoomed(item)}
                className="group relative shrink-0 overflow-hidden rounded-2xl border border-white/10 light:border-[#18140f]/10 bg-white/[0.02] light:bg-[#18140f]/[0.02] text-left"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.w}
                  height={item.h}
                  sizes="(max-width: 768px) 90vw, 720px"
                  style={{ aspectRatio: `${item.w} / ${item.h}` }}
                  className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="font-display text-lg text-[#EFE9DD] light:text-[#18140f]">{item.alt}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#a49d8c] light:text-[#8f8874]">
                    Открыть
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {zoomed && <ZoomView target={zoomed} onClose={() => setZoomed(null)} />}
      </AnimatePresence>
    </>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState<MediaType>(null);

  return (
    <section id="gallery" className="px-6 pb-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">Работы</p>
          <h2 className="text-balance mt-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] hyphens-none text-[#EFE9DD] light:text-[#18140f] sm:text-5xl">
            Фото и <span className="text-gradient-gold">видео</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[14px] text-[#a49d8c] light:text-[#5c5648]">
            Здесь <span className="font-display text-[#EFE9DD] light:text-[#18140f]">лишь малая часть</span>
            работ. Вся коллекция значительно больше и продолжает расти с каждым проектом.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-5 lg:grid-cols-2"
        >
          {/* Photo panel */}
          <motion.button
            variants={panelItem}
            onClick={() => setOpen("photo")}
            className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/8 light:border-[#18140f]/8 text-left sm:aspect-[3/4]"
          >
            <PhotoFrame src={PHOTOS[0].src} alt={PHOTOS[0].alt} sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0F1013] via-[#0F1013]/10 to-transparent" />

            <span className="absolute left-6 top-6 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0F1013]/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#EFE9DD] backdrop-blur-md">
              <Aperture className="h-3 w-3 text-[#D4AF37]" />
              Фото
            </span>

            <div className="absolute inset-x-6 bottom-6 z-10 flex items-end justify-between gap-4">
              <span className="font-display text-2xl text-[#EFE9DD]">{PHOTOS[0].alt}</span>
              <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#0F1013]/50 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[#EFE9DD] backdrop-blur-md transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#0F1013]">
                Все фото
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.button>

          {/* Video panel */}
          <motion.div
            variants={panelItem}
            className="group relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/8 light:border-[#18140f]/8 text-left sm:aspect-[3/4]"
          >
            <PhotoPlaceholder label="Видео-обзор" />
            <div className="absolute inset-0 bg-[#0F1013]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1013] via-transparent to-transparent" />

            <span className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0F1013]/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#EFE9DD] backdrop-blur-md">
              <Video className="h-3 w-3 text-[#D4AF37]" />
              Видео
            </span>

            <span className="absolute inset-0 flex items-center justify-center">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#0F1013]/60 text-[#D4AF37] backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                <span className="absolute inset-0 rounded-full border border-[#D4AF37]/30 motion-safe:animate-ping" />
                <Play className="h-5 w-5 translate-x-[2px]" />
              </span>
            </span>

            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
              <span className="font-display text-2xl text-[#EFE9DD]">Обзор проекта</span>
              <span className="flex shrink-0 items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#0F1013]/50 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-[#EFE9DD] backdrop-blur-md transition-colors group-hover:bg-[#D4AF37] group-hover:text-[#0F1013]">
                Все видео
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open === "photo" && <PhotoLightbox onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}
