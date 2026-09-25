"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "Обо мне" },
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Процесс" },
  { href: "#gallery", label: "Работы" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 border-b border-white/8 bg-[#0F1013]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <a href="#" className="font-display text-2xl italic text-[#EFE9DD]">
          Зверева
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-sm text-[#a49d8c] transition-colors hover:text-[#EFE9DD]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-[#D4AF37]/50 px-5 py-2 font-body text-sm text-[#EFE9DD] transition-colors hover:bg-[#D4AF37] hover:text-[#0F1013] md:inline-block"
        >
          Написать
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#EFE9DD] md:hidden"
          aria-label="Меню"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-white/8 px-6 pb-6 pt-2 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 font-body text-[15px] text-[#c9c2b0]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full border border-[#D4AF37]/50 px-5 py-2.5 text-center font-body text-sm text-[#EFE9DD]"
          >
            Написать
          </a>
        </div>
      )}
    </motion.header>
  );
}
