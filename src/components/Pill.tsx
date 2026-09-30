import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "solid" | "outline";
/** "dark" = placed on paper (ink button); "light" = placed on ink (paper button). */
type Tone = "dark" | "light";

const SKIN: Record<`${Variant}-${Tone}`, { base: string; fill: string; hoverText: string }> = {
  "solid-dark": { base: "bg-ink text-paper", fill: "bg-walnut", hoverText: "" },
  "outline-dark": { base: "border border-ink/25 text-ink", fill: "bg-ink", hoverText: "group-hover:text-paper" },
  "solid-light": { base: "bg-paper text-ink", fill: "bg-sand", hoverText: "" },
  "outline-light": { base: "border border-paper/25 text-paper", fill: "bg-paper", hoverText: "group-hover:text-ink" },
};

export default function Pill({
  children,
  href,
  onClick,
  variant = "solid",
  tone = "dark",
  external = false,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  tone?: Tone;
  external?: boolean;
  className?: string;
}) {
  const skin = SKIN[`${variant}-${tone}`];
  const cls = `group relative inline-flex min-h-11 items-center gap-3 overflow-hidden rounded-full py-3 pl-6 pr-5 text-[15px] ${skin.base} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-soft group-hover:scale-x-100 ${skin.fill}`}
      />
      <span className={`relative transition-colors duration-[320ms] ${skin.hoverText}`}>{children}</span>
      <ArrowUpRight
        className={`relative h-4 w-4 transition-[transform,color] duration-[520ms] ease-soft group-hover:rotate-45 ${skin.hoverText}`}
        strokeWidth={1.5}
      />
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
