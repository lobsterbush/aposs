import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'APOSS - Asian Politics Online Seminar Series',
    template: '%s | APOSS',
  },
  description:
    'The Asian Politics Online Seminar Series is an online seminar series for political scientists working in, on, or adjacent to Asia.',
  keywords: ['APOSS', 'Asian politics', 'seminar', 'political science', 'research'],
  openGraph: {
    type: 'website',
    siteName: 'APOSS',
    title: 'APOSS - Asian Politics Online Seminar Series',
    description:
      'A global venue for sharing research on Asian politics. Elegant, inclusive, and collaborative.',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APOSS - Asian Politics Online Seminar Series',
    description:
      'A global venue for sharing research on Asian politics. Elegant, inclusive, and collaborative.',
    images: ['/twitter-image'],
  },
  icons: {
    icon: [{ url: '/icon' }],
    apple: [{ url: '/apple-icon' }],
  },
  manifest: '/site.webmanifest',
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
     >
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
