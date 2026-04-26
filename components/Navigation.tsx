"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "dataset", label: "Dataset" },
  { id: "regression", label: "Regression" },
  { id: "logistic", label: "Logistic" },
  { id: "model-selection", label: "Model Selection" },
  { id: "timeseries", label: "Time Series" },
  { id: "insights", label: "Insights" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navItems.map((n) => document.getElementById(n.id));
      const scrollPos = window.scrollY + 120;

      let current = "";
      sections.forEach((section) => {
        if (section && section.offsetTop <= scrollPos) {
          current = section.id;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/90 backdrop-blur-md border-b border-ink-800/60"
          : "bg-transparent"
      }`}
    >
      <div className="section-padding flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-6 h-6 border border-academic-gold/60 rounded-sm flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-academic-gold/80 rounded-sm" />
          </div>
          <span className="font-mono text-xs tracking-widest uppercase text-ink-400 group-hover:text-ink-200 transition-colors">
            GDP Research
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-colors ${
                active === item.id
                  ? "text-academic-gold"
                  : "text-ink-400 hover:text-ink-200"
              }`}
            >
              {active === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-academic-gold/10 border border-academic-gold/30 rounded-md"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-ink-400 hover:text-ink-200 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ink-950/95 backdrop-blur-md border-b border-ink-800/60"
          >
            <div className="section-padding py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-3 py-2 font-mono text-xs tracking-wider uppercase rounded-md transition-colors ${
                    active === item.id
                      ? "text-academic-gold bg-academic-gold/10"
                      : "text-ink-400 hover:text-ink-200 hover:bg-ink-800/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
