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

        <motion.div
          variants={item}
          className="mt-10 flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-white/12 light:border-[#18140f]/12 px-6 py-12"
        >
          <Quote className="h-6 w-6 text-white/15 light:text-[#18140f]/20" strokeWidth={1.5} />
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/25 light:text-[#18140f]/30">
            Отзыв клиента скоро появится здесь
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
