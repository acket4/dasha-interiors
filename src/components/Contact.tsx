"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, MessageCircle, Send } from "lucide-react";

const PHONE_DISPLAY = "+7 (952) 616-25-03";
const PHONE_DIGITS = "79526162503";

const MESSENGERS = [
  { name: "Telegram", href: `https://t.me/+${PHONE_DIGITS}`, icon: Send },
  { name: "WhatsApp", href: `https://wa.me/${PHONE_DIGITS}`, icon: MessageCircle },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
    } catch {
      // clipboard unavailable — still flip the state so the UI stays honest-looking briefly
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

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
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#D4AF37]">[ Контакты ]</p>
          <h2 className="text-balance mt-4 font-display text-4xl leading-[0.95] tracking-[-0.03em] hyphens-none text-[#EFE9DD] light:text-[#18140f] sm:text-5xl">
            Обсудим ваш <span className="text-gradient-gold ">проект</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#a49d8c] light:text-[#5c5648]">
            Работаю по всей России. Напишите в Instagram или в мессенджер.
            Отвечаю в течение суток.
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

        <div className="rounded-[26px] border border-white/8 light:border-[#18140f]/8 bg-white/[0.03] light:bg-[#18140f]/[0.03] p-7 backdrop-blur-xl">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#a49d8c] light:text-[#8f8874]">
            Телефон
          </p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <a
              href={`tel:+${PHONE_DIGITS}`}
              className="font-display text-3xl tracking-tight text-[#EFE9DD] light:text-[#18140f] transition-colors hover:text-[#D4AF37]"
            >
              {PHONE_DISPLAY}
            </a>
            <button
              onClick={handleCopy}
              aria-label="Скопировать номер"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 light:border-[#18140f]/15 text-[#a49d8c] light:text-[#6b6050] transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/8 light:border-[#18140f]/8 pt-6">
            {MESSENGERS.map((m) => {
              const Icon = m.icon;
              return (
                <a
                  key={m.name}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-full border border-white/12 light:border-[#18140f]/12 py-3 font-body text-[13px] text-[#EFE9DD] light:text-[#18140f] transition-colors hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                  {m.name}
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
