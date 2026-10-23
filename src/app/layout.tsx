import type { Metadata, Viewport } from "next";
import { Courier_Prime, DM_Serif_Display, Karla } from "next/font/google";

import { bar } from "@/data/bar";

import "./globals.css";

// High-contrast serif for the old supper-club menu look the brief asks for.
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

// Typewriter labels, like a handwritten-then-typed nightly menu card.
const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const title = `${bar.name} | ${bar.tagline} in ${bar.neighborhood}, Atlanta`;

export const metadata: Metadata = {
  title,
  description: bar.description,
  // Demo build, shared only with Whoopsie's: keep it out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description: bar.description,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#120c09",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${courier.variable} ${karla.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
