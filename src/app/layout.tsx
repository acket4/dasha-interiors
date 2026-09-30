import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from "next/font/google";
import Cursor from "@/components/Cursor";
import ScrollManager from "@/components/ScrollManager";
import ThemeInit from "@/components/ThemeInit";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const manrope = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Исакова Design — дизайнер интерьера",
  description:
    "Дизайн-проекты квартир и домов под ключ по всей России.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${display.variable} ${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <ThemeInit />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <ScrollManager />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
