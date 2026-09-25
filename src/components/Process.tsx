"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const STEPS = [
  { n: "I", title: "Бриф", text: "Обмер и разговор о привычках" },
  { n: "II", title: "Концепция", text: "Планировка и 3D-визуализация" },
  { n: "III", title: "Чертежи", text: "Документация для подрядчиков" },
  { n: "IV", title: "Стройка", text: "Авторский надзор на объекте" },
  { n: "V", title: "Декор", text: "Расстановка и фотосъёмка" },
];

export default function Process() {
  return (
    <section id="process" className="px-6 pb-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">Процесс</p>
          <h2 className="mt-4 font-display text-4xl text-[#EFE9DD] sm:text-5xl">
            Как проходит <span className="text-gradient-gold italic">проект</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {STEPS.map((s) => (
            <motion.div key={s.n} variants={item} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 font-display text-sm italic text-[#D4AF37]">
                {s.n}
              </div>
              <h4 className="mt-5 font-body text-[14px] font-semibold text-[#EFE9DD]">{s.title}</h4>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#a49d8c]">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
