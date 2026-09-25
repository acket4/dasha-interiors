"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const SERVICES = [
  { n: "I", title: "Дизайн-проект", text: "Планировка, визуализация и вся документация для стройки." },
  { n: "II", title: "Авторский надзор", text: "Слежу, чтобы стройка не разошлась с проектом." },
  { n: "III", title: "Подбор мебели", text: "Комплектация под бюджет, с учётом сроков поставки." },
  { n: "IV", title: "Онлайн-консультация", text: "Разбор планировки или подбора цвета за один созвон." },
];

export default function Services() {
  return (
    <section id="services" className="px-6 pb-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">Услуги</p>
          <h2 className="mt-4 font-display text-4xl text-[#EFE9DD] sm:text-5xl">
            Чем могу <span className="text-gradient-gold italic">помочь</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.n}
              variants={item}
              className="rounded-[26px] border border-white/8 bg-white/[0.03] p-7 backdrop-blur-xl transition-colors hover:border-[#D4AF37]/25"
            >
              <div className="font-display text-2xl italic text-[#D4AF37]">{s.n}</div>
              <h3 className="mt-5 font-body text-[15px] font-semibold text-[#EFE9DD]">{s.title}</h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-[#a49d8c]">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
