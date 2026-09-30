"use client";

import { motion, type Variants } from "framer-motion";
import { Quote } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Testimonial() {
  return (
    <section className="border-y border-white/8 light:border-[#18140f]/8 px-6 py-24 sm:px-10 lg:px-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.p variants={item} className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">
          [ Отзывы ]
        </motion.p>

        <motion.figure variants={item} className="mt-10 flex flex-col items-center gap-6">
          <Quote className="h-6 w-6 text-[#D4AF37]" strokeWidth={1.5} />
          <blockquote className="max-w-2xl text-pretty font-display text-2xl leading-snug text-[#EFE9DD] light:text-[#18140f] sm:text-[1.7rem]">
            Квартира у нас мансардная, потолки скошенные, и я честно думала, что нормально там ничего
            не сделать. Женя всё расчертила заранее, каждую полку и розетку, поэтому на стройке почти
            ничего не переделывали. Пару раз она приезжала смотреть, как мастера кладут плитку, и один
            косяк поймали сразу, а не когда всё уже закрыли. Ванная получилась именно такая, как
            хотели. Спасибо ей за терпение, я мнение меняла раз пять.
          </blockquote>
          <figcaption className="font-mono text-[11px] uppercase tracking-widest text-[#a49d8c] light:text-[#6b6050]">
            Марина К., ремонт мансардной квартиры
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  );
}
