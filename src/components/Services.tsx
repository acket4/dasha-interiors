"use client";

import { motion, type Variants } from "framer-motion";
import { MessageCircle, PenTool, ShieldCheck, Sofa } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const SERVICES = [
  {
    n: "01",
    icon: PenTool,
    title: "Дизайн-проект",
    text: "Планировка, визуализация и вся документация для стройки.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "Авторский надзор",
    text: "Слежу, чтобы стройка не разошлась с проектом.",
  },
  {
    n: "03",
    icon: Sofa,
    title: "Подбор мебели",
    text: "Комплектация под бюджет, с учётом сроков поставки.",
  },
  {
    n: "04",
    icon: MessageCircle,
    title: "Онлайн-консультация",
    text: "Разбор планировки или подбора цвета за один созвон.",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 pb-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]"
        >
          [ Услуги ]
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance mb-14 font-display text-4xl leading-[0.95] tracking-[-0.03em] hyphens-none text-[#EFE9DD] light:text-[#18140f] sm:text-5xl"
        >
          Чем могу <span className="text-gradient-gold">помочь</span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 divide-y divide-white/8 light:divide-[#18140f]/8 rounded-[24px] border border-white/8 light:border-[#18140f]/8 sm:grid-cols-2 sm:divide-x sm:divide-y-0"
        >
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                variants={item}
                className="group relative flex flex-col gap-5 p-8 transition-colors hover:bg-white/[0.02] light:hover:bg-[#18140f]/[0.02] sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] transition-colors duration-300 group-hover:border-[#D4AF37]/60 group-hover:bg-[#D4AF37]/10">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="font-mono text-xs text-[#6b6558] light:text-[#8f8874]">{s.n}</span>
                </div>
                <div>
                  <h3 className="font-body text-xl font-semibold text-[#EFE9DD] light:text-[#18140f]">{s.title}</h3>
                  <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-[#a49d8c] light:text-[#5c5648]">{s.text}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
