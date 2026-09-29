import Image from "next/image";

export default function PhotoFrame({
  src,
  alt,
  className = "",
  sizes,
  priority,
  stretchX,
  cover,
  focalPoint = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Slight horizontal scale on the sharp layer only, to shrink letterbox margins. Not a crop — no pixels are cut. */
  stretchX?: number;
  /** Full-bleed crop instead of contain+blur — for narrow/tall boxes (e.g. mobile hero) where a near-square photo would otherwise leave huge empty margins. */
  cover?: boolean;
  /** object-position for the cover crop, e.g. "center 20%" to keep more of the top in frame. */
  focalPoint?: string;
}) {
  if (cover) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: focalPoint }}
        />
      </div>
    );
  }

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
