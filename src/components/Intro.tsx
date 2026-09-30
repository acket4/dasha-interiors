import PhotoFrame from "@/components/PhotoFrame";
import { Counter, ImageReveal, Reveal, ScrubText } from "@/components/motion";

const NUMBERS = [
  { to: 10, suffix: "+", label: "реализованных проектов" },
  { to: 30, suffix: "+", label: "чертежей в архиве" },
  { to: 4, suffix: "", label: "года практики и надзора" },
  { to: 2000, suffix: "+", label: "подписчиков в Instagram" },
];

export default function Intro() {
  return (
    <section className="bg-paper px-5 py-28 sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <ImageReveal className="aspect-[4/5] w-full max-w-md">
            <PhotoFrame src="/photos/living-room.jpg" alt="Гостиная" sizes="(min-width: 1024px) 33vw, 100vw" cover />
          </ImageReveal>
          <Reveal delay={0.3}>
            <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-ink/55">Гостиная, реализованный проект</p>
          </Reveal>
        </div>

        <div className="flex flex-col justify-between gap-20 lg:col-span-7 lg:col-start-6 lg:pt-10">
          <div>
            <Reveal>
              <p className="mb-8 text-[12px] uppercase tracking-[0.16em] text-walnut">Подход</p>
            </Reveal>
            <ScrubText
              className="text-[clamp(1.75rem,3.4vw,3.25rem)] font-light leading-[1.08] tracking-[-0.03em]"
              text={
                "Проектирую интерьеры, которые остаются точными и через десять лет после ремонта. Каждую розетку, полку и шов продумываю ещё на чертеже, чтобы на стройке не пришлось импровизировать."
              }
            />
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <Reveal key={n.label} delay={i * 0.08} className="border-t border-ink/15 pt-4">
                <dt className="text-[clamp(2.4rem,4vw,3.6rem)] font-light leading-none tracking-[-0.04em]">
                  <Counter to={n.to} suffix={n.suffix} />
                </dt>
                <dd className="mt-3 max-w-[16ch] text-[13px] leading-snug text-ink/60">{n.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
