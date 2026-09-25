"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const STEPS = [
  { n: "01", title: "Бриф", text: "Обмер и разговор о привычках" },
  { n: "02", title: "Концепция", text: "Планировка и 3D-визуализация" },
  { n: "03", title: "Чертежи", text: "Документация для подрядчиков" },
  { n: "04", title: "Стройка", text: "Авторский надзор на объекте" },
  { n: "05", title: "Декор", text: "Расстановка и фотосъёмка" },
];

export default function Process() {
  return (
    <section id="process" className="px-6 pb-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl text-[#EFE9DD] sm:text-5xl"
        >
          Как проходит <span className="text-gradient-gold">проект</span>
        </motion.h2>

        <div className="relative mt-16">
          <div className="absolute left-[13px] top-0 h-full w-px bg-white/10 sm:left-0 sm:right-0 sm:top-[13px] sm:h-px sm:w-auto" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-10 sm:grid-cols-5"
          >
            {STEPS.map((s) => (
              <motion.div key={s.n} variants={item} className="relative pl-11 sm:pl-0">
                <div className="absolute left-0 top-0 z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#0F1013] font-mono text-[10px] text-[#D4AF37] sm:static">
                  {s.n}
                </div>
                <h4 className="mt-0 font-body text-[14px] font-semibold text-[#EFE9DD] sm:mt-5">
                  {s.title}
                </h4>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#a49d8c]">{s.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
