import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import ScrollManager from "@/components/ScrollManager";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Исакова Design — дизайнер интерьера",
  description: "Дизайн-проекты квартир и домов под ключ по всей России.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${onest.variable} antialiased`}>
      <body>
        <ScrollManager />
        <Preloader />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
