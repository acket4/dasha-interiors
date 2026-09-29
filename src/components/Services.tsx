"use client";

import { useState } from "react";
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
    icon: PenTool,
    title: "Дизайн-проект",
    text: "Планировка, визуализация и вся документация для стройки.",
    span: "col-span-2 row-span-2",
  },
  {
    icon: ShieldCheck,
    title: "Авторский надзор",
    text: "Слежу, чтобы стройка не разошлась с проектом.",
    span: "col-span-1 sm:col-span-2 row-span-1",
  },
  {
    icon: Sofa,
    title: "Подбор мебели",
    text: "Комплектация под бюджет, с учётом сроков поставки.",
    span: "col-span-1 sm:col-span-2 row-span-1",
  },
  {
    icon: MessageCircle,
    title: "Онлайн-консультация",
    text: "Разбор планировки или подбора цвета за один созвон.",
    span: "col-span-2 sm:col-span-4 row-span-1",
  },
];

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = s.icon;

  return (
    <motion.div
      variants={item}
      className={`flip-card ${s.span} ${flipped ? "is-flipped" : ""}`}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${s.title}: ${s.text}`}
    >
      <div className="flip-inner cursor-pointer">
        <div className="flip-face flip-face-front flex flex-col items-center justify-center gap-4 rounded-[20px] border border-white/8 light:border-[#18140f]/8 bg-white/[0.02] light:bg-[#18140f]/[0.02] p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37]">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h3 className="font-display text-2xl text-[#EFE9DD] light:text-[#18140f]">{s.title}</h3>
        </div>

        <div className="flip-face flip-face-back flex flex-col items-center justify-center gap-3 rounded-[20px] border border-[#D4AF37]/30 bg-gradient-to-br from-[#D4AF37]/12 to-[#D4AF37]/[0.03] p-6 text-center">
          <Icon className="h-7 w-7 text-[#D4AF37]" strokeWidth={1.5} />
          <h3 className="font-display text-2xl text-[#EFE9DD] light:text-[#18140f]">{s.title}</h3>
          <p className="max-w-[26ch] text-[15px] leading-relaxed text-[#c9c2b0] light:text-[#5c5648]">{s.text}</p>
        </div>
      </div>
    </motion.div>
  );
}

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
          className="grid grid-cols-2 gap-4 [grid-auto-rows:160px] sm:grid-cols-4 sm:[grid-auto-rows:170px]"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
