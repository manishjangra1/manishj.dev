import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  fallback: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://manishj.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Manish Jangra — Full-Stack Software Engineer',
    template: '%s · Manish Jangra',
  },
  description: 'Full-stack software engineer building complete systems, interfaces, and APIs.',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Manish Jangra',
    title: 'Manish Jangra — Full-Stack Software Engineer',
    description: 'Full-stack software engineer building complete systems, interfaces, and APIs.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manish Jangra — Full-Stack Software Engineer',
    description: 'Full-stack software engineer building complete systems, interfaces, and APIs.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark) || (stored === 'system' && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] font-sans antialiased selection:bg-[var(--color-selection-bg)] selection:text-[var(--color-selection-text)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
