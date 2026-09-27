export default function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 pb-8 pt-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="font-display text-3xl italic tracking-tight text-[#EFE9DD] sm:text-4xl">
          Дарья <span className="text-gradient-gold not-italic">Design</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-6 font-mono text-[11px] uppercase tracking-widest text-[#6b6558]">
          <span>© Зверева Дарья, дизайнер интерьера</span>
          <span>Ангарск / Иркутск и область</span>
        </div>
      </div>
    </footer>
  );
}
