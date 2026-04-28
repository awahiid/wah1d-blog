import type { Metadata } from "next";
import "../styles/global.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Reddit_Sans } from "next/font/google";
import React from 'react';
import '@/lib/server.api.config'
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "WAH1D Blog.",
  description: "A developer blog.",
  authors: { name: "Abdel Wahed Mahfoud Mouhandizi" },
  icons: "/icons/w1-icon-neutral.svg",
};

const reddit = Reddit_Sans({ subsets: ["latin-ext"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={reddit.className + " bg-surface relative"}>
        <div className={'absolute inset-0 pattern-grid-neutral/40 pattern-size-36 pattern-thickness-2 -z-10'}></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white to-transparent" />
        <Navbar />
        {children}
        <Footer />
        <SpeedInsights/>
      </body>
    </html>
  );
}
