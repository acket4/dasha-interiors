"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const WITHOUT = [
  "Правки прямо на стройке — сорванные сроки",
  "Штробление уже готовых стен",
  "Мебель «на глаз», без точных размеров",
];

const WITH = [
  "Документ на годы вперёд — под любой ремонт",
  "Все правки — ещё на этапе чертежа",
  "Точный бюджет на мебель и материалы",
];

export default function WhyTechProject() {
  return (
    <section className="border-y border-white/8 light:border-[#18140f]/8 px-6 py-28 sm:px-10 lg:px-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-6xl"
      >
        <motion.p variants={item} className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
          [ Технический проект ]
        </motion.p>
        <motion.h2 variants={item} className="text-balance mt-4 max-w-xl font-display text-4xl leading-[0.95] tracking-[-0.03em] hyphens-none text-[#EFE9DD] light:text-[#18140f] sm:text-5xl">
          Почему стоит начать с{" "}
          <span className="text-gradient-gold ">техпроекта</span>
        </motion.h2>
        <motion.p variants={item} className="mt-6 max-w-md text-[15px] leading-relaxed text-[#a49d8c] light:text-[#5c5648]">
          Это база любого ремонта, ещё до того, как в квартире появится хоть
          одна плитка или розетка.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 grid overflow-hidden rounded-[20px] border border-white/8 light:border-[#18140f]/8 sm:grid-cols-2"
        >
          <div className="bg-white/[0.015] light:bg-[#18140f]/[0.015] p-7 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6b6558] light:text-[#8f8874]">
              Без техпроекта
            </p>
            <ul className="mt-4 flex flex-col gap-3.5">
              {WITHOUT.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[#a49d8c] light:text-[#5c5648]">
                  <X className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#8a6a5a]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/8 light:border-[#18140f]/8 bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-7 sm:border-l sm:border-t-0 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#D4AF37]">
              С техпроектом
            </p>
            <ul className="mt-4 flex flex-col gap-3.5">
              {WITH.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[#a49d8c] light:text-[#5c5648]">
                  <Check className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#D4AF37]" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.a
          variants={item}
          href="#contact"
          className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#D4AF37]"
        >
          Обсудить технический проект
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      </motion.div>
    </section>
  );
}
