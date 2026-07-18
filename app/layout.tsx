import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://benchmark-ai.vercel.app"),

  title: {
    default: "Benchmark AI",
    template: "%s | Benchmark AI",
  },

  description:
    "AI-powered YouTube benchmarking platform. Analyze competitors, discover winning strategies, and grow your channel faster.",

  keywords: [
    "YouTube",
    "Benchmark",
    "AI",
    "Analytics",
    "SEO",
    "Competitor Analysis",
    "Content Strategy",
  ],

  authors: [
    {
      name: "Benchmark AI",
    },
  ],

  openGraph: {
    title: "Benchmark AI",
    description:
      "Analyze YouTube competitors with AI and discover what actually works.",
    url: "https://benchmark-ai.vercel.app",
    siteName: "Benchmark AI",
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Benchmark AI",
    description:
      "AI-powered YouTube Benchmarking Platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}