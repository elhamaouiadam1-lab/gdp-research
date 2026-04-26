import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Macroeconomic Determinants of GDP Growth",
  description:
    "An econometric analysis using Multiple Linear Regression, Logistic Regression, Model Selection, and Time Series Forecasting on 180 quarterly observations of country-level macroeconomic data.",
  keywords: ["econometrics", "GDP growth", "regression analysis", "time series", "macroeconomics"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} font-sans bg-ink-950 text-ink-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
