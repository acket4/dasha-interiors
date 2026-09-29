"use client";

import { motion, type Variants } from "framer-motion";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  return (
    <section id="about" className="px-6 pb-28 sm:px-10 lg:px-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20"
      >
        <span
          className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 -rotate-180 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6b6558] light:text-[#8f8874] lg:block"
          style={{ writingMode: "vertical-rl" }}
        >
          Обо мне
        </span>

        <motion.div variants={item} className="relative mx-auto w-full max-w-sm lg:ml-12 lg:max-w-none">
          <div className="absolute -right-3 -top-3 z-0 h-[62%] w-[72%] rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5" />
          <div className="relative z-10 w-full aspect-[4/5] -rotate-3 overflow-hidden rounded-2xl border border-white/8 light:border-[#18140f]/8 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)]">
            <PhotoPlaceholder label="Портрет" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1013]/60 light:from-[#faf8f4]/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        <div>
          <motion.p
            variants={item}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]"
          >
            [ Обо мне ]
          </motion.p>
          <motion.h2
            variants={item}
            className="text-balance mt-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] hyphens-none text-[#EFE9DD] light:text-[#18140f] sm:text-5xl"
          >
            Привет, я{" "}
            <span className="text-gradient-gold ">Исакова Евгения</span>
          </motion.h2>
          <motion.p variants={item} className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#a49d8c] light:text-[#5c5648]">
            Дизайнер интерьера, автор технических и авторских дизайн-проектов
            квартир и домов. Работаю по всей России. Веду каждый
            объект лично, от обмера и планировки до финальной расстановки декора.
          </motion.p>
          <motion.p variants={item} className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#a49d8c] light:text-[#5c5648]">
            В Instagram показываю весь процесс: от чертежа до финального кадра. Это
            и есть портфолио, которое растёт вместе с реализованными проектами.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
            <div className="border-t border-white/10 light:border-[#18140f]/10 pt-3">
              <div className="font-display text-2xl text-[#EFE9DD] light:text-[#18140f]">30+</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#a49d8c] light:text-[#6b6050]">
                чертежей в архиве
              </div>
            </div>
            <div className="border-t border-white/10 light:border-[#18140f]/10 pt-3">
              <div className="font-display text-2xl text-[#EFE9DD] light:text-[#18140f]">4 года</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#a49d8c] light:text-[#6b6050]">
                практики и надзора
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
