import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "optional",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GearGrit",
    template: "%s | GearGrit",
  },
  description:
    "Expert reviews and buying guides for badminton and trekking gear. Find the best equipment for your game and adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
