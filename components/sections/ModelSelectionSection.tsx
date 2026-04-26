"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { Section, SectionHeader, Card, Badge, Stat } from "../ui";
import { modelSelectionResults } from "../../lib/data";

type Method = "forward" | "backward" | "bestSubset";

const methodMeta: Record<Method, { label: string; description: string; steps: string[] }> = {
  forward: {
    label: "Forward Selection",
    description: "Starts with no variables, adds them one at a time based on AIC improvement.",
    steps: [
      "Step 1 → Add: unemployment (AIC ↓ largest)",
      "Step 2 → Add: exchange_rate",
      "Step 3 → Add: inflation",
      "Step 4 → Add: government_spending",
      "Step 5 → Add: exports",
      "Step 6 → Add: investment",
      "Stop: interest_rate, imports do not improve AIC",
    ],
  },
  backward: {
    label: "Backward Elimination",
    description: "Starts with all 8 variables, removes non-significant ones iteratively.",
    steps: [
      "Start: all 8 variables in model",
      "Step 1 → Remove: imports (p = 0.41)",
      "Step 2 → Remove: interest_rate (p = 0.18)",
      "Stop: all remaining variables significant",
      "Final: 6 variables retained",
    ],
  },
  bestSubset: {
    label: "Best Subset (olsrr)",
    description: "Evaluates all 2⁸ = 256 possible variable combinations; selects by Adjusted R².",
    steps: [
      "Evaluated all 256 subsets",
      "6-variable model maximises Adj. R² = 0.9278",
      "Same variables as forward/backward",
      "Lowest AIC = 412.3 across all methods",
      "Confirms robustness of variable selection",
    ],
  },
};

const allVariables = [
  { name: "unemployment", label: "Unemployment" },
  { name: "exchange_rate", label: "Exchange Rate" },
  { name: "inflation", label: "Inflation" },
  { name: "government_spending", label: "Gov. Spending" },
  { name: "exports", label: "Exports" },
  { name: "investment", label: "Investment" },
  { name: "interest_rate", label: "Interest Rate" },
  { name: "imports", label: "Imports" },
];

export default function ModelSelectionSection() {
  const [active, setActive] = useState<Method>("bestSubset");

  const selected = modelSelectionResults.selected;
  const removed = modelSelectionResults.removed;

  return (
    <Section id="model-selection" className="border-t border-ink-800/40">
      <SectionHeader
        label="Task 3 — Model Selection"
        number="04"
        title="Variable Selection Methods"
        description="Three selection strategies — forward stepwise, backward elimination, and best subset — are compared using AIC and Adjusted R². All three converge on the same parsimonious 6-variable model."
        number="04"
      />

      {/* Consensus result */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 p-6 card-base border-l-2 border-academic-gold/50"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="section-label">Consensus Result</span>
          <Badge variant="gold">All 3 methods agree</Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-3">Retained Variables (6)</p>
            <div className="space-y-2">
              {allVariables.filter(v => selected.includes(v.name)).map((v, i) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 py-1.5 px-3 bg-emerald-950/20 border border-emerald-800/30 rounded-lg"
                >
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span className="font-mono text-xs text-emerald-300">{v.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-500 mb-3">Excluded Variables (2)</p>
            <div className="space-y-2">
              {allVariables.filter(v => removed.includes(v.name)).map((v, i) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 + 0.2 }}
                  className="flex items-center gap-3 py-1.5 px-3 bg-ink-800/40 border border-ink-700/40 rounded-lg"
                >
                  <XCircle size={14} className="text-ink-500 shrink-0" />
                  <span className="font-mono text-xs text-ink-500">{v.label}</span>
                  <Badge variant="neutral">non-significant</Badge>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 p-4 bg-academic-gold/5 border border-academic-gold/20 rounded-lg">
              <p className="font-mono text-xs text-academic-gold/80 leading-relaxed">
                → Removing 2 variables does not reduce model accuracy — it actually improves Adj. R² by eliminating noise.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Method tabs */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(methodMeta) as Method[]).map((m) => (
            <button
              key={m}
              onClick={() => setActive(m)}
              className={`relative px-4 py-2 font-mono text-xs tracking-wider rounded-lg border transition-all ${
                active === m
                  ? "bg-academic-gold/10 border-academic-gold/40 text-academic-gold"
                  : "bg-transparent border-ink-700/40 text-ink-500 hover:border-ink-600 hover:text-ink-300"
              }`}
            >
              {methodMeta[m].label}
            </button>
          ))}
        </div>
      </div>

      {/* Method detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="card-base p-6 mb-10"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-sans font-medium text-ink-100 mb-1">{methodMeta[active].label}</h3>
              <p className="text-sm text-ink-400 leading-relaxed mb-5">{methodMeta[active].description}</p>

              <div className="space-y-2">
                {methodMeta[active].steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <span className="font-mono text-[10px] text-ink-600 mt-0.5 w-4 shrink-0">{i + 1}.</span>
                    <span className="font-mono text-xs text-ink-400 leading-relaxed">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-ink-900/60 border border-ink-700/40 rounded-lg">
                <p className="font-mono text-[10px] text-ink-500 uppercase tracking-widest mb-3">Method Results</p>
                <div className="grid grid-cols-2 gap-4">
                  <Stat
                    label="Final Adj. R²"
                    value={active === "bestSubset"
                      ? modelSelectionResults.bestSubset.adjR2
                      : modelSelectionResults.forward.adjR2}
                    accent
                  />
                  <Stat
                    label="AIC"
                    value={active === "bestSubset"
                      ? modelSelectionResults.bestSubset.aic
                      : modelSelectionResults.forward.aic}
                  />
                </div>
              </div>

              {/* Variable visual */}
              <div>
                <p className="font-mono text-[10px] text-ink-500 uppercase tracking-widest mb-2">Variable Status</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {allVariables.map((v) => {
                    const isIn = selected.includes(v.name);
                    return (
                      <div
                        key={v.name}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md ${
                          isIn
                            ? "bg-emerald-950/30 border border-emerald-800/30"
                            : "bg-ink-800/30 border border-ink-700/30 opacity-50"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${isIn ? "bg-emerald-400" : "bg-ink-600"}`} />
                        <span className={`font-mono text-[10px] ${isIn ? "text-emerald-400" : "text-ink-500"}`}>
                          {v.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Comparison table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card-base overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-ink-800/60">
          <h3 className="font-sans font-medium text-ink-200 text-sm">Method Comparison</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-ink-800/40">
              {["Method", "Variables", "Adj. R²", "AIC", "Verdict"].map((h) => (
                <th key={h} className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-ink-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { method: "Forward Selection", vars: 6, adjR2: "0.9261", aic: "418.6", verdict: "Good", star: false },
              { method: "Backward Elimination", vars: 6, adjR2: "0.9261", aic: "418.6", verdict: "Good", star: false },
              { method: "Best Subset (olsrr)", vars: 6, adjR2: "0.9278", aic: "412.3", verdict: "Best", star: true },
            ].map((row) => (
              <tr key={row.method} className={`border-b border-ink-800/30 hover:bg-ink-800/20 transition-colors ${row.star ? "bg-academic-gold/5" : ""}`}>
                <td className="px-5 py-3 font-mono text-xs text-ink-300 flex items-center gap-2">
                  {row.star && <span className="text-academic-gold">★</span>}
                  {row.method}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-ink-400">{row.vars}</td>
                <td className={`px-5 py-3 font-mono text-xs tabular-nums ${row.star ? "text-academic-gold" : "text-ink-400"}`}>{row.adjR2}</td>
                <td className={`px-5 py-3 font-mono text-xs tabular-nums ${row.star ? "text-academic-gold" : "text-ink-400"}`}>{row.aic}</td>
                <td className="px-5 py-3">
                  <Badge variant={row.star ? "gold" : "neutral"}>{row.verdict}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </Section>
  );
}
