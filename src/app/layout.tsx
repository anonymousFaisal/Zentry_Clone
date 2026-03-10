import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const general = localFont({
  src: "../fonts/general.woff2",
  variable: "--font-general",
  display: "swap",
});

const circular = localFont({
  src: "../fonts/circularweb-book.woff2",
  variable: "--font-circular",
  display: "swap",
});

const robertRegular = localFont({
  src: "../fonts/robert-regular.woff2",
  variable: "--font-robert-regular",
  display: "swap",
});

const robertMedium = localFont({
  src: "../fonts/robert-medium.woff2",
  variable: "--font-robert-medium",
  display: "swap",
});

const zentry = localFont({
  src: "../fonts/zentry-regular.woff2",
  variable: "--font-zentry",
  display: "swap",
});

import { LenisProvider } from "@/providers/LenisProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://zentry-clone-nd.vercel.app"),
  title: "aNDnymous | Zentry Clone",
  description:
    "A feature recreation of the award-winning Zentry website, built with Next.js 16, React 19, Tailwind CSS v4, GSAP scroll animations, and Lenis smooth scrolling.",
  keywords: ["Zentry", "Next.js", "GSAP", "Tailwind CSS", "React", "animation", "clone"],
  authors: [{ name: "aNDnymous" }],
  openGraph: {
    title: "aNDnymous | Zentry Clone",
    description: "A premium recreation of the award-winning Zentry website with stunning GSAP animations.",
    type: "website",
    locale: "en_US",
    images: ["/img/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "aNDnymous | Zentry Clone",
    description: "A premium recreation of the award-winning Zentry website with stunning GSAP animations.",
    images: ["/img/og-image.png"],
  },
  other: {
    "theme-color": "#0a0a0a",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const htmlClass = `${general.variable} ${circular.variable} ${robertRegular.variable} ${robertMedium.variable} ${zentry.variable}`;
  return (
    <html lang="en" className={htmlClass}>
      <body className="antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
