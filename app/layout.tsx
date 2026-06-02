import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Manish - Full Stack Software Developer",
    template: "%s | Portfolio",
  },
  description: "Modern portfolio website showcasing projects, skills, and experience",
  keywords: ["portfolio", "software developer", "full stack", "web development"],
  authors: [{ name: "Manish" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Providers>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
