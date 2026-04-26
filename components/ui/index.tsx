"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { clsx } from "clsx";

// ─── Section wrapper with fade-in animation ──────────────────────────────────
interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={clsx("relative py-20 md:py-28 section-padding", className)}
    >
      {children}
    </section>
  );
}

// ─── Section header with label + heading ─────────────────────────────────────
interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  description?: string;
  number?: string;
}

export function SectionHeader({ label, title, description, number }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mb-12 md:mb-16"
    >
      <div className="flex items-center gap-4 mb-4">
        {number && (
          <span className="font-mono text-xs text-ink-600">{number}</span>
        )}
        <span className="section-label">{label}</span>
        <div className="flex-1 h-px bg-ink-800/60 max-w-24" />
      </div>
      <h2 className="heading-lg mb-4">{title}</h2>
      {description && (
        <p className="body-text max-w-2xl">{description}</p>
      )}
    </motion.div>
  );
}

// ─── Animated card ────────────────────────────────────────────────────────────
interface CardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function Card({ children, className, delay = 0, hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={clsx("card-base p-6", className)}
    >
      {children}
    </motion.div>
  );
}

// ─── Stat block ───────────────────────────────────────────────────────────────
interface StatProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

export function Stat({ label, value, sub, accent }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] tracking-widest uppercase text-ink-500">{label}</span>
      <span className={clsx("font-mono text-xl font-medium tabular-nums", accent ? "text-academic-gold" : "text-ink-50")}>
        {value}
      </span>
      {sub && <span className="font-mono text-xs text-ink-600">{sub}</span>}
    </div>
  );
}

// ─── Badge / Tag ──────────────────────────────────────────────────────────────
type BadgeVariant = "positive" | "negative" | "neutral" | "gold" | "default";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  positive: "bg-emerald-950/60 text-emerald-400 border border-emerald-800/50",
  negative: "bg-red-950/60 text-red-400 border border-red-800/50",
  neutral: "bg-ink-800/60 text-ink-300 border border-ink-700/50",
  gold: "bg-academic-gold/10 text-academic-gold border border-academic-gold/30",
  default: "bg-academic-blue/20 text-blue-300 border border-academic-blue/30",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={clsx("tag", variantClasses[variant])}>{children}</span>
  );
}

// ─── Horizontal rule with label ───────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-ink-800/60" />
      {label && <span className="font-mono text-xs text-ink-600 uppercase tracking-widest">{label}</span>}
      <div className="flex-1 h-px bg-ink-800/60" />
    </div>
  );
}

// ─── P-value significance dot ─────────────────────────────────────────────────
export function SignificanceDot({ pValue }: { pValue: number }) {
  const level =
    pValue < 0.001 ? "***" : pValue < 0.01 ? "**" : pValue < 0.05 ? "*" : "ns";
  const color =
    pValue < 0.05 ? "text-emerald-400" : "text-ink-500";

  return (
    <span className={clsx("font-mono text-xs", color)}>{level}</span>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export function ProgressBar({ value, max = 1, label, color = "bg-academic-gold" }: ProgressBarProps) {
  const pct = Math.abs(value / max) * 100;

  return (
    <div className="flex items-center gap-3 w-full">
      {label && (
        <span className="font-mono text-xs text-ink-400 w-28 shrink-0 truncate">{label}</span>
      )}
      <div className="flex-1 h-1.5 bg-ink-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className={clsx("h-full rounded-full", color)}
        />
      </div>
      <span className="font-mono text-xs text-ink-400 w-12 text-right shrink-0">
        {value > 0 ? "+" : ""}{value.toFixed(3)}
      </span>
    </div>
  );
}
