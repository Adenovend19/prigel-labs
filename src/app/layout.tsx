import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Prigel Labs Limited | Solusi Digital untuk UMKM Indonesia",
  description: "Prigel Labs Studio mengembangkan ekosistem aplikasi digital untuk membantu UMKM mengelola bisnis dengan lebih mudah, efisien, dan terintegrasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container studio-grid antialiased">
        {children}
      </body>
    </html>
  );
}
