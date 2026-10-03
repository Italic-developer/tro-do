import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { TodoProvider } from "@/components/TodoProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tro-do.vercel.app'),
  title: {
    default: 'Tro-Do — Streamlined Task Management',
    template: '%s | Tro-Do',
  },
  description: 'Organize your work, track daily tasks, and boost your productivity effortlessly with Tro-Do.',
  keywords: ['todo app', 'task manager', 'productivity tool', 'tro-do', 'daily organizer', 'workflow'],
  authors: [{ name: 'Tro-Do Team' }],
  creator: 'Tro-Do',
  publisher: 'Tro-Do',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Open Graph / Facebook / LinkedIn
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tro-do.vercel.app',
    title: 'Tro-Do — Streamlined Task Management',
    description: 'Organize your work, track daily tasks, and boost your productivity effortlessly with Tro-Do.',
    siteName: 'Tro-Do',
    images: [
      {
        url: '/og-image.png', // Save your logo/banner image in public/og-image.png
        width: 1200,
        height: 630,
        alt: 'Tro-Do Logo and Dashboard Preview',
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Tro-Do — Streamlined Task Management',
    description: 'Organize your work, track daily tasks, and boost your productivity effortlessly with Tro-Do.',
    images: ['/og-image.png'],
  },

  // Icons and PWA App Icons
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // Search Engine Crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TodoProvider>{children}</TodoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
