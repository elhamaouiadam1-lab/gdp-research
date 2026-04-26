import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Macroeconomic Determinants Dashboard",
  description: "Econometrics Research & GDP Growth Analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      {/* We use a very dark, rich background color as the base */}
      <body className="bg-[#0A0A0C] text-gray-200 font-sans antialiased selection:bg-emerald-500/30">
        <div className="min-h-screen relative">
          {/* Subtle global background glow */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
          
          <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 max-w-6xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
