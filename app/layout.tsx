import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZOJE — Tikuv Mashinalari',
  description: "ZOJE sanoat va uy tikuv mashinalari. O'zbekistonda rasmiy diler.",
  metadataBase: new URL('https://zojeshop.uz'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
