import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['500', '600'],
});

export const metadata: Metadata = {
  title: {
    default: 'Hai Velyu — Solusi Album Digital Premium untuk Fotografer',
    template: '%s | Hai Velyu',
  },
  description:
    'Tingkatkan nilai jual Anda lewat galeri album digital interaktif yang elegan. Tanpa langganan bulanan.',
  openGraph: {
    title: 'Hai Velyu — Solusi Album Digital Premium untuk Fotografer',
    description:
      'Album interaktif berkualitas tinggi yang langsung meningkatkan profesionalisme.',
    images: [
      {
        url: '/images/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Hai Velyu Studio',
      },
    ],
    type: 'website',
    locale: 'id_ID',
    siteName: 'Hai Velyu Studio',
  },
  metadataBase: new URL('https://haivelyu.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} ${playfair.variable}`}>
        {children}
      </body>
    </html>
  );
}