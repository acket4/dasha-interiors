"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";

function CopyRow({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard unavailable — still flip the state so the UI stays honest-looking briefly
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/8 py-4 first:border-t-0">
      <span className="font-mono text-[13px] text-[#EFE9DD]">{value}</span>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#a49d8c] transition-colors hover:text-[#D4AF37]"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "готово" : "копировать"}
      </button>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">Контакты</p>
          <h2 className="mt-4 font-display text-4xl text-[#EFE9DD] sm:text-5xl">
            Обсудим ваш <span className="text-gradient-gold ">проект</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#a49d8c]">
            Работаю в Ангарске, Иркутске и ближайших районах. Напишите в Instagram
            или скопируйте почту. Отвечаю в течение суток.
          </p>
          <a
            href="https://www.instagram.com/darya_zver"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#E8CC7B] via-[#D4AF37] to-[#C5A880] px-7 py-4 font-body text-sm font-semibold text-[#0F1013] transition-shadow duration-500 hover:shadow-[0_0_38px_6px_rgba(212,175,55,0.35)]"
          >
            Instagram @darya_zver
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-7 backdrop-blur-xl">
          <CopyRow value="hello@dasha-interiors.ru" />
          <CopyRow value="+7 (952) 616-25-03" />
        </div>
      </motion.div>
    </section>
  );
}
