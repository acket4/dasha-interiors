import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import { ImageReveal, Lines, Reveal } from "@/components/motion";

const TIMELINE = [
  { year: "2022", label: "Первый проект под ключ" },
  { year: "2024", label: "Проектирование и надзор в команде" },
  { year: "2025", label: "Самостоятельное проектирование и надзор" },
];

export default function About() {
  return (
    <section id="about" className="bg-paper px-5 py-28 sm:px-10 lg:px-16 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <ImageReveal className="aspect-[4/5] w-full max-w-lg text-ink">
            <PhotoPlaceholder label="Портрет" />
          </ImageReveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <Reveal>
            <p className="mb-6 text-[12px] uppercase tracking-[0.16em] text-walnut">Обо мне</p>
          </Reveal>
          <Lines
            className="text-[clamp(2.6rem,5.5vw,5.5rem)] font-light leading-[0.92] tracking-[-0.045em]"
            lines={["Привет,", "я Евгения", "Исакова"]}
          />

          <Reveal delay={0.15} className="mt-10 grid gap-5 text-[16px] leading-[1.65] text-ink/75 sm:grid-cols-2 sm:gap-8">
            <p className="max-w-[40ch]">
              Дизайнер интерьера, автор технических и&nbsp;авторских дизайн-проектов квартир и&nbsp;домов. Работаю
              по&nbsp;всей России и&nbsp;веду каждый объект лично, от&nbsp;обмера и&nbsp;планировки до&nbsp;финальной
              расстановки декора.
            </p>
            <p className="max-w-[40ch]">
              В&nbsp;Instagram показываю весь процесс, от&nbsp;чертежа до&nbsp;финального кадра. Это и&nbsp;есть
              портфолио, которое растёт вместе с&nbsp;реализованными проектами.
            </p>
          </Reveal>

          <ol className="mt-16">
            {TIMELINE.map((t, i) => (
              <Reveal
                key={t.year}
                as="li"
                delay={0.1 + i * 0.1}
                y={16}
                className="grid grid-cols-[5rem_1fr] items-baseline gap-4 border-t border-ink/15 py-5 last:border-b"
              >
                <span className="text-[14px] tabular-nums text-walnut">{t.year}</span>
                <span className="text-[clamp(1.1rem,1.6vw,1.4rem)] font-light tracking-[-0.02em]">{t.label}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
