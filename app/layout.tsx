import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Health Platform",
  description: "AI Powered Cardiovascular Risk Detection System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-black dark:via-gray-900 dark:to-gray-950 transition-colors duration-500`}
      >
        <Navbar />

        <main className="pt-24 px-6 md:px-10 lg:px-20">
          {children}
        </main>

        <footer className="mt-24 border-t border-white/20 bg-white/60 dark:bg-black/50 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            
            <p>
              © 2026 AI Health Platform
            </p>

            <p className="mt-4 md:mt-0">
              Built with Next.js • AI • Machine Learning
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}