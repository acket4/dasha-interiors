"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        "a, button, [role='button'], input, textarea"
      );
      setHovering(!!target);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ left: x, top: y }}
        animate={{ scale: pressed ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="pointer-events-none fixed z-[999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]"
      />
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          opacity: hovering ? 1 : 0.55,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]"
      />
    </>
  );
}
