import { ArrowUpRight } from "lucide-react";
import { Lines, Reveal } from "@/components/motion";

const SERVICES = [
  { title: "Дизайн-проект", text: "Планировка, визуализация и вся документация для стройки." },
  { title: "Авторский надзор", text: "Слежу, чтобы стройка не разошлась с проектом." },
  { title: "Подбор мебели", text: "Комплектация под бюджет, с учётом сроков поставки." },
  { title: "Онлайн-консультация", text: "Разбор планировки или подбора цвета за один созвон." },
];

export default function Services() {
  return (
    <section id="services" className="bg-paper-2 px-5 py-28 sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="mb-6 text-[12px] uppercase tracking-[0.16em] text-walnut">Услуги</p>
            </Reveal>
            <Lines
              className="text-[clamp(2.6rem,6vw,6rem)] font-light leading-[0.92] tracking-[-0.045em]"
              lines={["Чем могу", "помочь"]}
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[38ch] text-[15px] leading-[1.6] text-ink/70">
              Можно взять весь цикл под&nbsp;ключ или&nbsp;только то, что нужно сейчас. Состав работ обсудим
              на&nbsp;первом звонке.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} as="li" delay={i * 0.08} y={20}>
                <a
                  href="#contact"
                  className="group relative grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 overflow-hidden border-t border-ink/15 py-8 sm:grid-cols-[1.1fr_1fr_auto] sm:py-10"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-soft group-hover:scale-y-100"
                  />
                  <span className="relative text-[clamp(1.6rem,3.2vw,2.8rem)] font-light leading-none tracking-[-0.035em] transition-[color,transform] duration-[320ms] group-hover:translate-x-4 group-hover:text-paper sm:group-hover:translate-x-6">
                    {s.title}
                  </span>
                  <span className="relative col-span-2 max-w-[42ch] text-[15px] leading-[1.55] text-ink/65 transition-colors duration-[320ms] group-hover:text-paper/70 sm:col-span-1 sm:row-start-1 sm:col-start-2">
                    {s.text}
                  </span>
                  <span className="relative col-start-2 row-start-1 flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition-[border-color,color,transform] duration-[520ms] ease-soft group-hover:rotate-45 group-hover:border-paper/40 group-hover:text-paper sm:col-start-3 sm:mr-6">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.25} />
                  </span>
                </a>
            </Reveal>
          ))}
          <li className="border-t border-ink/15" aria-hidden />
        </ul>
      </div>
    </section>
  );
}
