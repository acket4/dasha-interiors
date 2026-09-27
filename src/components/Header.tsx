"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "Обо мне" },
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Процесс" },
  { href: "#gallery", label: "Работы" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 60));

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-3 py-2.5 transition-colors duration-300 sm:px-4 ${
          solid
            ? "border-white/10 bg-[#0F1013]/85 backdrop-blur-xl"
            : "border-white/8 bg-[#0F1013]/30 backdrop-blur-md"
        }`}
      >
        <a
          href="#"
          className="rounded-full border border-white/12 px-4 py-2 font-display text-lg italic tracking-tight text-[#EFE9DD]"
        >
          Дарья <span className="text-gradient-gold not-italic">Design</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm text-[#c9c2b0] transition-colors hover:text-[#EFE9DD]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#E8CC7B] via-[#D4AF37] to-[#C5A880] px-5 py-2.5 font-body text-sm font-semibold text-[#0F1013] transition-shadow duration-500 hover:shadow-[0_0_28px_4px_rgba(212,175,55,0.35)] md:inline-flex"
        >
          Записаться
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0F1013]/40 text-[#EFE9DD] backdrop-blur-md md:hidden"
          aria-label="Меню"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 flex max-w-7xl flex-col gap-1 rounded-[26px] border border-white/8 bg-[#0F1013]/95 px-6 py-5 backdrop-blur-xl md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 font-display text-2xl italic text-[#c9c2b0]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-full bg-gradient-to-r from-[#E8CC7B] via-[#D4AF37] to-[#C5A880] px-5 py-3 text-center font-body text-sm font-semibold text-[#0F1013]"
          >
            Записаться
          </a>
        </div>
      )}
    </motion.header>
  );
}
