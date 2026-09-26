"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const REASONS = [
  {
    n: "I",
    title: "Продуманный план навсегда",
    text: "У вас будет чёткий план по стенам, мебели и электрике: документ, которым вы сможете пользоваться в любой момент ремонта, хоть через год, хоть через десять лет.",
  },
  {
    n: "II",
    title: "Экономия на консультации",
    text: "На консультации по дизайну я даю чёткие рекомендации по вашему техническому проекту: как реализовать ремонт выгоднее и какие цветовые решения по стенам и мебели подойдут под ваш бюджет и предпочтения.",
  },
];

export default function WhyTechProject() {
  return (
    <section className="border-y border-white/8 px-6 py-28 sm:px-10 lg:px-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
      >
        <div>
          <motion.p variants={item} className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
            Технический проект
          </motion.p>
          <motion.h2 variants={item} className="text-balance mt-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] hyphens-none text-[#EFE9DD] sm:text-5xl">
            Почему стоит начать с{" "}
            <span className="text-gradient-gold ">техпроекта</span>
          </motion.h2>
          <motion.p variants={item} className="mt-6 max-w-md text-[15px] leading-relaxed text-[#a49d8c]">
            Это база любого ремонта, ещё до того, как в квартире появится хоть
            одна плитка или розетка.
          </motion.p>

          <motion.div variants={item} className="relative mt-8 rounded-[24px] bg-[#D4AF37]/[0.06] p-6 before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-[#D4AF37]/30">
            <p className="font-display text-lg text-[#EFE9DD]">Как сэкономить</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#a49d8c]">
              Правки на этапе чертежа стоят часов работы. Правки на этапе
              стройки стоят стен, штробы и нервов.
            </p>
            <a
              href="#contact"
              className="group mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#D4AF37]"
            >
              Обсудить технический проект
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="flex flex-col gap-4">
          {REASONS.map((r) => (
            <motion.div
              key={r.n}
              variants={item}
              className="rounded-[26px] border border-white/8 bg-white/[0.03] p-7 backdrop-blur-xl transition-colors hover:border-[#D4AF37]/25"
            >
              <div className="font-display text-2xl text-[#D4AF37]">{r.n}</div>
              <h3 className="mt-4 font-body text-[16px] font-semibold text-[#EFE9DD]">{r.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#a49d8c]">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
