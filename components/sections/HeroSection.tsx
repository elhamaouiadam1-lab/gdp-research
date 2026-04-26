"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const stats = [
  { value: "180", label: "Observations" },
  { value: "8", label: "Predictors" },
  { value: "R² 0.93", label: "Model Fit" },
  { value: "4", label: "Methodologies" },
];

export default function HeroSection() {
  const scrollToDataset = () =>
    document.getElementById("dataset")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col justify-center section-padding overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-100" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-academic-blue/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-academic-gold/10 rounded-full blur-3xl" />

      {/* Decorative lines */}
      <div className="absolute top-0 right-32 w-px h-full bg-gradient-to-b from-transparent via-ink-700/30 to-transparent hidden lg:block" />

      <div className="relative z-10 max-w-5xl">
        {/* Course badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-8 h-px bg-academic-gold/60" />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-academic-gold/80">
            Econometrics — Final Project
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.08] text-ink-50 mb-6"
        >
          Macroeconomic{" "}
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-academic-gold to-academic-gold-light">
            Determinants
          </span>
          <br className="hidden md:block" />
          of GDP Growth
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-ink-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 font-light"
        >
          A multi-method econometric analysis employing Multiple Linear Regression,
          Logistic Regression, Model Selection, and Time Series Forecasting across
          180 quarterly observations of country-level macroeconomic data.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-8 mb-16 pb-16 border-b border-ink-800/60"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-mono text-2xl md:text-3xl font-medium text-ink-50">
                {stat.value}
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-ink-500">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Method tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap gap-2"
        >
          {[
            "Multiple Linear Regression",
            "Logistic Regression",
            "Model Selection (OLS)",
            "Moving Average",
            "Exponential Smoothing",
            "Python · R · Excel",
          ].map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1.5 rounded-full border border-ink-700/60 text-ink-400"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        onClick={scrollToDataset}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-600 hover:text-ink-400 transition-colors group"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Explore</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
