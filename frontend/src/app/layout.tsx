import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LayoutWrapper } from "@/components/layout/layout-wrapper"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voice SM - Voice Assistant for Financial Market Insights",
  description:
    "AI-powered voice assistant providing financial market insights and analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
