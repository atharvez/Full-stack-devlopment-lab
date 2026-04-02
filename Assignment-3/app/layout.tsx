import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Portfolio",
  description: "A modern, Nike-inspired personal portfolio built with Next.js and Tailwind CSS."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
