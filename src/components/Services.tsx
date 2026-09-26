"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const SERVICES = [
  { n: "01", title: "Дизайн-проект", text: "Планировка, визуализация и вся документация для стройки." },
  { n: "02", title: "Авторский надзор", text: "Слежу, чтобы стройка не разошлась с проектом." },
  { n: "03", title: "Подбор мебели", text: "Комплектация под бюджет, с учётом сроков поставки." },
  { n: "04", title: "Онлайн-консультация", text: "Разбор планировки или подбора цвета за один созвон." },
];

export default function Services() {
  return (
    <section id="services" className="px-6 pb-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance mb-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] hyphens-none text-[#EFE9DD] sm:text-5xl"
        >
          Чем могу <span className="text-gradient-gold">помочь</span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 divide-y divide-white/8 border-t border-white/8"
        >
          {SERVICES.map((s) => (
            <motion.a
              key={s.n}
              href="#contact"
              variants={item}
              className="group grid grid-cols-[3rem_1fr_auto] items-center gap-6 py-7 transition-colors hover:bg-white/[0.02] sm:grid-cols-[4rem_1fr_auto_2rem]"
            >
              <span className="font-mono text-[13px] text-[#D4AF37]">{s.n}</span>
              <span>
                <span className="block font-body text-lg font-semibold text-[#EFE9DD] sm:text-xl">
                  {s.title}
                </span>
                <span className="mt-1 block max-w-md text-[13px] leading-relaxed text-[#a49d8c] sm:text-sm">
                  {s.text}
                </span>
              </span>
              <span className="hidden font-mono text-[10px] uppercase tracking-widest text-[#6b6558] sm:block">
                обсудить
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 justify-self-end text-[#a49d8c] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#D4AF37]" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
