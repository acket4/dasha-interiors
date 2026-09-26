"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const CHECKS = [
  "Уже сделали ремонт по моим чертежам",
  "Построили дома по моим планам",
  "Заказали повторно, уже полный дизайн",
];

export default function Testimonial() {
  return (
    <section className="border-y border-white/8 px-6 py-24 sm:px-10 lg:px-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.p variants={item} className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
          Это лишь малая часть отзывов моих заказчиков
        </motion.p>

        <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {CHECKS.map((c) => (
            <span key={c} className="inline-flex items-center gap-2 text-[13px] text-[#c9c2b0]">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D4AF37]" />
              {c}
            </span>
          ))}
        </motion.div>

        <motion.blockquote
          variants={item}
          className="text-balance mt-12 font-display text-2xl leading-[1.15] text-[#EFE9DD] sm:text-3xl"
        >
          «Хочу от души поблагодарить Дарью за её профессионализм, заказывали с
          мужем технический план квартиры и остались очень довольны. Дарья учла
          все наши пожелания и была с нами на связи постоянно. Услуги очень
          упрощают ремонт на начальном этапе, экономят время и нервы. Спасибо
          большое за проделанную работу»
        </motion.blockquote>
        <motion.cite variants={item} className="mt-6 block font-mono text-[11px] not-italic uppercase tracking-widest text-[#6b6558]">
          реальный отзыв клиента / технический план квартиры
        </motion.cite>
      </motion.div>
    </section>
  );
}
