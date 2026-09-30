"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import Pill from "@/components/Pill";
import { Lines, Reveal } from "@/components/motion";

const PHONE_DISPLAY = "+7 (902) 769-33-88";
const PHONE_DIGITS = "79027693388";

const MESSENGERS = [
  { name: "Telegram", href: `https://t.me/+${PHONE_DIGITS}` },
  { name: "WhatsApp", href: `https://wa.me/${PHONE_DIGITS}` },
  { name: "MAX", href: "https://max.ru" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(PHONE_DISPLAY);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard blocked: the number is still selectable text.
    }
  }

  return (
    <section id="contact" className="bg-paper px-5 py-28 sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-6 text-[12px] uppercase tracking-[0.16em] text-walnut">Контакты</p>
          </Reveal>
          <Lines
            className="text-[clamp(3rem,8vw,8.5rem)] font-light leading-[0.88] tracking-[-0.05em]"
            lines={["Обсудим", "ваш проект"]}
          />
          <Reveal delay={0.2} className="mt-10 flex flex-col items-start gap-3">
            <Pill href="https://www.instagram.com/evgeniya_isakova90" external>
              Написать в&nbsp;Instagram
            </Pill>
            <span className="pl-1 text-[13px] text-ink/55">Работаю по&nbsp;всей России, отвечаю в&nbsp;течение суток</span>
          </Reveal>
        </div>

        <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.1} className="border-t border-ink/15 pt-6">
            <p className="text-[12px] uppercase tracking-[0.16em] text-ink/55">Телефон</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <a
                href={`tel:+${PHONE_DIGITS}`}
                className="text-[clamp(1.6rem,2.6vw,2.4rem)] font-light tracking-[-0.03em] transition-colors duration-300 hover:text-walnut"
              >
                {PHONE_DISPLAY}
              </a>
              <button
                onClick={handleCopy}
                aria-label="Скопировать номер"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                {copied ? <Check className="h-4 w-4" strokeWidth={1.5} /> : <Copy className="h-4 w-4" strokeWidth={1.5} />}
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 border-t border-ink/15 pt-6">
            <p className="text-[12px] uppercase tracking-[0.16em] text-ink/55">Мессенджеры на&nbsp;этом номере</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {MESSENGERS.map((m) => (
                <Pill key={m.name} href={m.href} external variant="outline">
                  {m.name}
                </Pill>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
