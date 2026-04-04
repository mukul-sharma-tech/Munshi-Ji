import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ConditionalLayout } from "@/components/conditional-layout";
import { MunshiChat } from "@/components/munshi-chat";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MunshiJi — Finance Manager",
  description: "Smart personal finance management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
          try {
            var theme = localStorage.getItem('theme');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (theme === 'dark' || (!theme && prefersDark)) {
              document.documentElement.classList.add('dark');
            }
          } catch(e) {}
        `}} />
      </head>
      <body className="min-h-full">
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
          <MunshiChat />
        </Providers>
      </body>
    </html>
  );
}
