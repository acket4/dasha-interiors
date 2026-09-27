import { ImageIcon } from "lucide-react";

export default function PhotoPlaceholder({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 border border-dashed border-white/10 bg-white/[0.03] ${className}`}
    >
      <ImageIcon className="h-6 w-6 text-white/15" strokeWidth={1.5} />
      {label && (
        <span className="px-4 text-center font-mono text-[10px] uppercase tracking-widest text-white/20">
          {label}
        </span>
      )}
    </div>
  );
}
