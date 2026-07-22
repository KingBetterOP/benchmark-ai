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
  metadataBase: new URL("https://benchmark-ai-indol.vercel.app"),

  title: {
    default: "Benchmark AI - AI YouTube Competitor Analysis Platform",
    template: "%s | Benchmark AI",
  },

  description:
  "Analyze YouTube competitors, discover viral content ideas, predict high-performing videos, and grow your channel faster with AI.",

  keywords: [
  "YouTube AI",
  "YouTube Analytics",
  "YouTube Competitor Analysis",
  "YouTube SEO",
  "YouTube Growth",
  "AI YouTube Tool",
  "Content Strategy",
  "Video Analytics",
  "Thumbnail Analysis",
  "Viral Videos",
  "Benchmark AI",
],

  authors: [
  {
    name: "Benchmark AI",
  },
],

robots: {
  index: true,
  follow: true,
},

category: "Technology",

icons: {
  icon: "/favicon.ico",
},
verification: {
  google: "ZqUw3XijKLfCyff-rXTlLD9YDoKYfL0FO5aR20uJ7Ko",
},
openGraph: {
    title: "Benchmark AI",
    description:
      "Analyze YouTube competitors with AI and discover what actually works.",
    url: "https://benchmark-ai-indol.vercel.app",
    siteName: "Benchmark AI",
    locale: "en_US",
    type: "website",
    images: [
  {
    url: "/og-image.png",
    width: 1200,
    height: 630,
    alt: "Benchmark AI",
  },
],
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