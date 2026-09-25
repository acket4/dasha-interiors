import type { Metadata } from "next";
import { Unbounded, Manrope, IBM_Plex_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Зверева Дарья, дизайнер интерьера",
  description:
    "Дизайн-проекты квартир и домов под ключ в Ангарске, Иркутске и области.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${display.variable} ${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0F1013] text-[#EFE9DD]">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
