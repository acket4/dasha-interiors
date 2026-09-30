import { ImageIcon } from "lucide-react";

export default function PhotoPlaceholder({ label, className = "" }: { label?: string; className?: string }) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-current/15 bg-current/[0.04] ${className}`}
    >
      <ImageIcon className="h-6 w-6 opacity-25" strokeWidth={1.5} />
      {label && <span className="px-4 text-center text-[11px] uppercase tracking-[0.18em] opacity-40">{label}</span>}
    </div>
  );
}
