import Image from "next/image";

export default function PhotoFrame({
  src,
  alt,
  className = "",
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
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
      />
    </div>
  );
}
