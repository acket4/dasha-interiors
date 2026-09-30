"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { EASE, INTRO } from "@/components/motion";

const LINKS = [
  { id: "about", label: "Обо мне" },
  { id: "services", label: "Услуги" },
  { id: "gallery", label: "Работы" },
  { id: "process", label: "Процесс" },
];

export default function Header() {
  const reduced = useReducedMotion();
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Turn solid once the hero dive has faded into the paper-coloured sections.
  useMotionValueEvent(scrollY, "change", (v) => {
    const hero = document.querySelector("main section") as HTMLElement | null;
    const end = hero ? hero.offsetHeight - window.innerHeight : window.innerHeight;
    setSolid(v > end * 0.8);
  });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id || null)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const light = !solid && !open;

  return (
    <>
      <motion.header
        initial={reduced ? false : { opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: reduced ? 0 : INTRO - 0.05 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color] duration-500 ${
          solid && !open
            ? "border-b border-ink/10 bg-paper/85 text-ink backdrop-blur-xl"
            : "border-b border-transparent text-paper"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-10 lg:px-16">
          <a href="#" className="text-lg font-light tracking-[-0.03em]" onClick={() => setOpen(false)}>
            Исакова <span className={light ? "text-sand" : "text-walnut"}>Design</span>
          </a>

          <nav
            className={`hidden items-center gap-1 rounded-full p-1 md:flex ${
              light ? "bg-ink/25 backdrop-blur-md" : "bg-ink/[0.05]"
            }`}
          >
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="relative rounded-full px-4 py-2 text-[14px]">
                {active === l.id && solid && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span
                  className={`relative transition-colors duration-300 ${
                    active === l.id && solid ? "text-paper" : "opacity-75 hover:opacity-100"
                  }`}
                >
                  {l.label}
                </span>
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className={`hidden min-h-11 items-center rounded-full px-5 text-[14px] transition-colors duration-300 md:inline-flex ${
              light ? "bg-paper text-ink hover:bg-sand" : "bg-ink text-paper hover:bg-walnut"
            }`}
          >
            Записаться
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-5 pb-10 pt-24 text-paper md:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <nav className="flex flex-col">
              {[...LINKS, { id: "contact", label: "Контакты" }].map((l, i) => (
                <div key={l.id} className="overflow-hidden border-t border-paper/10">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[2.6rem] font-light leading-none tracking-[-0.04em]"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.06 }}
                  >
                    {l.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <p className="mt-8 text-[13px] text-paper/55">Отвечаю лично, обычно в течение суток</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
