"use client";

import { motion } from "framer-motion";
import PhotoWheel from "@/components/PhotoWheel";

export default function Manifesto() {
  return (
    <section className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-5xl items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-[#6b6558]">
        <span>[ Обо мне</span>
        <span>Проекты ]</span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="text-balance mx-auto mt-8 max-w-4xl text-center font-display text-4xl leading-[0.98] tracking-[-0.02em] hyphens-none text-[#EFE9DD] sm:text-6xl lg:text-7xl"
      >
        Мы проектируем интерьеры,&nbsp;которые остаются точными и&nbsp;через
        десять&nbsp;лет после&nbsp;ремонта
      </motion.h2>

      <PhotoWheel />
    </section>
  );
}
