import Image from "next/image";

export default function PhotoFrame({
  src,
  alt,
  className = "",
  sizes,
  priority,
  stretchX,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Slight horizontal scale on the sharp layer only, to shrink letterbox margins. Not a crop — no pixels are cut. */
  stretchX?: number;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        aria-hidden
        sizes={sizes}
        className="scale-110 object-cover object-center opacity-60 blur-2xl"
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain object-center"
        style={stretchX ? { transform: `scaleX(${stretchX})` } : undefined}
      />
    </div>
  );
}
