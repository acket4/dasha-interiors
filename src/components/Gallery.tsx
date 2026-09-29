"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Aperture, ArrowRight, Play, Video, X } from "lucide-react";
import PhotoFrame from "@/components/PhotoFrame";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

type MediaType = "photo" | "video" | null;

const PHOTOS = [
  { src: "/photos/bathtub.jpg", alt: "Ванная комната с ванной" },
  { src: "/photos/guest-ensuite.jpg", alt: "Гостевой санузел" },
  { src: "/photos/living-room.jpg", alt: "Гостиная" },
  { src: "/photos/shower.jpg", alt: "Душевая" },
  { src: "/photos/vanity-detail.jpg", alt: "Деталь интерьера" },
];

const panelItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function GalleryCard({ photo }: { photo: (typeof PHOTOS)[number] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/8 light:border-[#18140f]/8">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <PhotoFrame src={photo.src} alt={photo.alt} sizes="(min-width: 640px) 33vw, 50vw" cover />
      </div>
    </div>
  );
}

function PhotoLightbox({ onClose }: { onClose: () => void }) {
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

        <div className="grid flex-1 grid-cols-2 items-start gap-4 overflow-y-auto pb-6 sm:grid-cols-3">
          {PHOTOS.map((photo) => (
            <GalleryCard key={photo.src} photo={photo} />
          ))}
        </div>
      </motion.div>
    </motion.div>
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
            Галерея пополняется по мере того, как завершаются новые проекты —
            заходите время от времени, здесь будет появляться что-то новое.
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
            <PhotoFrame src="/photos/bedroom.jpg" alt="Спальня" sizes="(min-width: 1024px) 50vw, 100vw" cover />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0F1013] via-[#0F1013]/10 to-transparent" />

            <span className="absolute left-6 top-6 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0F1013]/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#EFE9DD] backdrop-blur-md">
              <Aperture className="h-3 w-3 text-[#D4AF37]" />
              Фото
            </span>

            <div className="absolute inset-x-6 bottom-6 z-10 flex items-end justify-between gap-4">
              <span className="font-display text-2xl text-[#EFE9DD]">Спальня</span>
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
