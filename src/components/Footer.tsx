import { Lines } from "@/components/motion";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink px-5 pb-8 pt-24 text-paper sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1440px]">
        <Lines
          as="p"
          className="text-[clamp(3.5rem,15vw,15rem)] font-light leading-[0.85] tracking-[-0.06em]"
          lines={["Исакова", <span key="d" className="text-sand">Design</span>]}
        />
        <div className="mt-14 flex flex-col gap-3 border-t border-paper/15 pt-6 text-[13px] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <span>© Исакова Евгения, дизайнер интерьера</span>
          <span>Работаю по&nbsp;всей России</span>
          <a href="#" className="transition-colors duration-300 hover:text-paper">
            Наверх
          </a>
        </div>
      </div>
    </footer>
  );
}
