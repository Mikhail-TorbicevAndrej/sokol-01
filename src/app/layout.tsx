import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "СОКОЛ 0→1 — Найди идею за один день",
  description: "Игра-тренажёр для поиска бизнес-идеи. Расстреляй слабые идеи, собери критерии хорошего продукта.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
