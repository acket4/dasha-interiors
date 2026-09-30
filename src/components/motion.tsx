"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Seconds the preloader holds the page before the hero starts entering. */
export const INTRO = 1.6;

function useShow(immediate: boolean) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return [ref, immediate || inView] as const;
}

/** Each line rises out of its own mask. Pass lines already broken by hand. */
export function Lines({
  lines,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const [ref, show] = useShow(immediate);
  const reduced = useReducedMotion();
  const Tag = as;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <motion.span
            className="block"
            initial={reduced ? false : { y: "115%" }}
            animate={show ? { y: "0%" } : undefined}
            transition={{ duration: 1.15, ease: EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade + lift + blur entrance for body copy and small groups. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  immediate = false,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
  y?: number;
  as?: "div" | "li";
}) {
  const [ref, show] = useShow(immediate);
  const reduced = useReducedMotion();
  const Comp = as === "li" ? motion.li : motion.div;

  return (
    <Comp
      ref={ref as React.Ref<never>}
      className={className}
      initial={reduced ? false : { opacity: 0, y, filter: "blur(14px)" }}
      animate={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Photo wipes up from the bottom edge while the frame settles from a slight zoom. Size it with className. */
export function ImageReveal({
  children,
  className = "",
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const [ref, show] = useShow(immediate);
  const reduced = useReducedMotion();

  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.25, ease: EASE, delay }}
      >
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.25 }}
          animate={show ? { scale: 1 } : undefined}
          transition={{ duration: 1.8, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Counts up once when scrolled into view. */
export function Counter({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, { duration: 1.8, ease: EASE, onUpdate: (n) => setValue(Math.round(n)) });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {(reduced ? to : value).toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}

/** Words brighten one by one as the paragraph scrolls through the viewport. Join words that must not break with  . */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const reduced = useReducedMotion();
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity: reduced ? 1 : opacity }}>{children}</motion.span>{" "}
    </>
  );
}
