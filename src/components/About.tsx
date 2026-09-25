"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
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
        className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20"
      >
        <motion.div
          variants={item}
          className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/8 bg-white/[0.03] backdrop-blur-xl"
        >
          <div className="absolute inset-0 flex items-center justify-center p-8 text-center font-mono text-[11px] uppercase tracking-widest text-[#6b6558]">
            портрет · фото появится здесь
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0F1013] via-transparent to-transparent" />
        </motion.div>

        <div>
          <motion.p
            variants={item}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]"
          >
            Обо мне
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-4 font-display text-4xl leading-tight text-[#EFE9DD] sm:text-5xl"
          >
            Привет, я{" "}
            <span className="text-gradient-gold ">Зверева Дарья</span>
          </motion.h2>
          <motion.p variants={item} className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#a49d8c]">
            Дизайнер интерьера, автор технических и авторских дизайн-проектов
            квартир и домов в Ангарске, Иркутске и ближайших районах. Веду каждый
            объект лично, от обмера и планировки до финальной расстановки декора.
          </motion.p>
          <motion.p variants={item} className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#a49d8c]">
            В Instagram показываю весь процесс: от чертежа до финального кадра. Это
            и есть портфолио, которое растёт вместе с реализованными проектами.
          </motion.p>

          <motion.div variants={item} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-4">
            {[
              { n: "120+", l: "чертежей в архиве" },
              { n: "14", l: "городов" },
              { n: "4.9", l: "рейтинг клиентов" },
              { icon: true, l: "человек года · дизайнер" },
            ].map((s) => (
              <div key={s.l} className="bg-[#0F1013] px-4 py-5">
                {s.icon ? (
                  <Award className="h-6 w-6 text-[#D4AF37]" />
                ) : (
                  <div className="font-display text-2xl text-[#EFE9DD]">{s.n}</div>
                )}
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#a49d8c]">
                  {s.l}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
