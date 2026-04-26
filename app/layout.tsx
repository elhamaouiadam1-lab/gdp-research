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
      {/* Added overflow-x-hidden to prevent horizontal scrolling from the glows */}
      <body className="bg-[#0A0A0C] text-gray-200 font-sans antialiased selection:bg-emerald-500/30 overflow-x-hidden">
        
        {/* Changed to flex flex-col to push footer to the bottom */}
        <div className="min-h-screen flex flex-col relative">
          
          {/* CHANGED: 'absolute' to 'fixed' and added '-z-10' so they don't stretch the page height */}
          <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          {/* Added flex-grow so the main content fills available space, pushing the footer down */}
          <main className="relative z-10 container mx-auto px-4 py-12 md:py-24 max-w-6xl flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
