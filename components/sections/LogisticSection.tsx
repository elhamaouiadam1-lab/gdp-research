"use client";

import { motion } from "framer-motion";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { Section, SectionHeader, Card, Badge, Stat, SignificanceDot } from "../ui";
import { logisticCoefficients, logisticStats } from "../../lib/data";

const radarData = logisticCoefficients
  .filter((c) => c.significant)
  .map((c) => ({
    variable: c.variable.split(" ")[0],
    odds: c.odds > 1 ? c.odds : 1 / c.odds,
    rawOdds: c.odds,
  }));

export default function LogisticSection() {
  return (
    <Section id="logistic" className="border-t border-ink-800/40">
      <SectionHeader
        label="Task 2 — Logistic"
        number="03"
        title="Logistic Regression"
        description="A binary logistic model predicts the probability that GDP growth exceeds the sample mean. The outcome variable is coded 1 (high growth) or 0 (low growth), transforming the regression into a classification problem."
      />

      {/* Binary framing card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card-base p-6 mb-10 border-l-2 border-academic-gold/40"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <span className="section-label block mb-2">Binary Outcome</span>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-950/50 border border-emerald-800/40 rounded-lg">
                <span className="font-mono text-lg font-medium text-emerald-400">1</span>
                <span className="font-mono text-xs text-emerald-600">High growth<br/>gdp &gt; mean</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-red-950/50 border border-red-800/40 rounded-lg">
                <span className="font-mono text-lg font-medium text-red-400">0</span>
                <span className="font-mono text-xs text-red-600">Low growth<br/>gdp ≤ mean</span>
              </div>
            </div>
          </div>

          <div>
            <span className="section-label block mb-2">Link Function</span>
            <div className="px-4 py-3 bg-ink-900/60 border border-ink-700/40 rounded-lg">
              <code className="font-mono text-sm text-academic-gold">
                P(Y=1) = 1 / (1 + e<sup>−(β₀ + β₁X₁ + ···)</sup>)
              </code>
            </div>
          </div>

          <div>
            <span className="section-label block mb-2">Interpretation</span>
            <p className="text-xs text-ink-400 leading-relaxed">
              Coefficients are expressed as log-odds. Odds ratios greater than 1 increase the
              probability of high GDP growth; below 1 decrease it.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Performance metrics */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10 p-6 card-base"
      >
        <Stat label="Accuracy" value="87.6%" accent />
        <Stat label="AUC-ROC" value="0.921" accent />
        <Stat label="Sensitivity" value="88.3%" />
        <Stat label="Specificity" value="86.7%" />
        <Stat label="AIC" value="178.4" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Coefficient table with odds ratios */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-base overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-ink-800/60">
            <h3 className="font-sans font-medium text-ink-200 text-sm">Logistic Coefficients & Odds Ratios</h3>
            <p className="font-mono text-xs text-ink-600 mt-0.5">OR &gt; 1 increases probability of high growth</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-800/40">
                {["Variable", "Log-Odds", "Odds Ratio", "Sig."].map((h) => (
                  <th key={h} className="px-4 py-3 text-right first:text-left font-mono text-[10px] uppercase tracking-widest text-ink-600">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logisticCoefficients.map((row, i) => (
                <motion.tr
                  key={row.variable}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`border-b border-ink-800/30 hover:bg-ink-800/20 transition-colors ${!row.significant ? "opacity-45" : ""}`}
                >
                  <td className="px-4 py-3 font-mono text-xs text-ink-300">{row.variable}</td>
                  <td className={`px-4 py-3 text-right font-mono text-xs tabular-nums ${
                    row.coef >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {row.coef > 0 ? "+" : ""}{row.coef.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono text-xs tabular-nums px-2 py-0.5 rounded ${
                      row.odds > 1
                        ? "bg-emerald-950/60 text-emerald-400"
                        : "bg-red-950/60 text-red-400"
                    }`}>
                      {row.odds.toFixed(3)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <SignificanceDot pValue={row.pValue} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Odds ratio visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-base p-6"
        >
          <h3 className="font-sans font-medium text-ink-200 text-sm mb-1">Odds Ratio Profile</h3>
          <p className="font-mono text-xs text-ink-600 mb-4">Significant predictors only · Radar shows relative strength</p>

          <div className="space-y-3">
            {logisticCoefficients.filter(c => c.significant).map((c, i) => {
              const isPositive = c.odds > 1;
              const pct = isPositive
                ? ((c.odds - 1) / 1.5) * 100
                : ((1 - c.odds) / 1) * 100;

              return (
                <div key={c.variable} className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-ink-500 w-28 shrink-0 truncate">
                    {c.variable.split(" ")[0]}
                  </span>
                  <div className="flex-1 h-1.5 bg-ink-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(pct, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.08 }}
                      className={`h-full rounded-full ${isPositive ? "bg-emerald-500/80" : "bg-red-400/80"}`}
                    />
                  </div>
                  <span className={`font-mono text-xs tabular-nums w-10 text-right ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                    {c.odds.toFixed(2)}
                  </span>
                  <span className="font-mono text-[10px] text-ink-600 w-6">OR</span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-ink-800/40 grid grid-cols-2 gap-4">
            <div className="p-3 bg-emerald-950/30 border border-emerald-800/30 rounded-lg">
              <p className="font-mono text-[10px] text-emerald-600 uppercase tracking-wider mb-1">Highest Odds Ratio</p>
              <p className="font-sans font-medium text-emerald-400 text-sm">Exchange Rate</p>
              <p className="font-mono text-xs text-emerald-600 mt-0.5">OR = 2.505</p>
            </div>
            <div className="p-3 bg-red-950/30 border border-red-800/30 rounded-lg">
              <p className="font-mono text-[10px] text-red-600 uppercase tracking-wider mb-1">Lowest Odds Ratio</p>
              <p className="font-sans font-medium text-red-400 text-sm">Unemployment</p>
              <p className="font-mono text-xs text-red-600 mt-0.5">OR = 0.288</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key insight */}
      <Card className="border-l-2 border-academic-gold/40 flex gap-4 items-start">
        <span className="text-academic-gold text-lg mt-0.5">◆</span>
        <div>
          <h4 className="font-sans font-medium text-ink-100 mb-2">
            Model Accuracy: 87.6% — AUC of 0.921
          </h4>
          <p className="text-sm text-ink-400 leading-relaxed">
            The logistic model correctly classifies high- and low-growth periods with strong discrimination.
            An AUC of 0.921 indicates the model's predicted probabilities are highly consistent with actual
            outcomes. The same variables flagged as insignificant in OLS (interest rate, imports) are
            eliminated here as well, confirming their limited explanatory power.
          </p>
        </div>
      </Card>
    </Section>
  );
}
