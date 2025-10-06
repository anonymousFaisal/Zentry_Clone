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

export const metadata: Metadata = {
  title: "Zentry Clone",
  description: "Built with Next.js + Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const htmlClass = `${general.variable} ${circular.variable} ${robertRegular.variable} ${robertMedium.variable} ${zentry.variable}`;
  return (
    <html lang="en" className={htmlClass}>
      <body className= "antialiased">
        {children}
      </body>
    </html>
  );
}
