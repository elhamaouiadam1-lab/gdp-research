"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell
} from "recharts";
import { Section, SectionHeader, Card, Badge, Stat, ProgressBar, SignificanceDot } from "../ui";
import { regressionCoefficients, modelStats } from "../../lib/data";

const interpretationCards = [
  {
    icon: "↓",
    title: "Unemployment is the dominant driver",
    body: "With a coefficient of −0.847, unemployment exerts the strongest influence on GDP growth. A single percentage point increase in the unemployment rate is associated with nearly a full percentage point decline in output growth.",
    variant: "negative" as const,
  },
  {
    icon: "↑",
    title: "Exchange rate appreciation supports growth",
    body: "A stronger nominal exchange rate (coefficient +0.612) correlates with higher GDP growth, likely reflecting improved terms of trade and investor confidence.",
    variant: "positive" as const,
  },
  {
    icon: "↑",
    title: "Fiscal policy has a measurable multiplier",
    body: "Government spending (coefficient +0.401) and investment (coefficient +0.289) both contribute positively, consistent with standard Keynesian and neoclassical growth theory.",
    variant: "positive" as const,
  },
  {
    icon: "−",
    title: "Interest rate & imports are non-significant",
    body: "Two predictors fail to reach the 5% threshold. Their coefficients are retained in the full model but removed in the parsimonious specification (Task 3).",
    variant: "neutral" as const,
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-ink-900 border border-ink-700 rounded-lg p-3 shadow-xl">
      <p className="font-mono text-xs text-ink-400 uppercase tracking-wider mb-1">{d.label}</p>
      <p className={`font-mono text-sm font-medium ${d.coefficient >= 0 ? "text-emerald-400" : "text-red-400"}`}>
        β = {d.coefficient.toFixed(3)}
      </p>
      <p className="font-mono text-xs text-ink-500 mt-1">p = {d.pValue.toFixed(4)}</p>
    </div>
  );
};

export default function RegressionSection() {
  const chartData = regressionCoefficients.map((c) => ({
    ...c,
    name: c.variable.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" "),
  }));

  const maxCoef = Math.max(...regressionCoefficients.map((c) => Math.abs(c.coefficient)));

  return (
    <Section id="regression" className="border-t border-ink-800/40">
      <SectionHeader
        label="Task 1 & 2 — OLS"
        number="02"
        title="Multiple Linear Regression"
        description="Ordinary Least Squares estimation of the full 8-variable model. The regression explains 93.1% of variation in GDP growth, providing strong overall fit."
      />

      {/* Model fit stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12 p-6 card-base"
      >
        <Stat label="R²" value="0.9312" accent />
        <Stat label="Adj. R²" value="0.9278" accent />
        <Stat label="F-Statistic" value="272.4" />
        <Stat label="F p-value" value="< 0.0001" />
        <Stat label="N obs." value="180" />
        <Stat label="AIC" value="412.3" />
        <Stat label="RMSE" value="0.341" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Coefficient table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-base overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-ink-800/60">
            <h3 className="font-sans font-medium text-ink-200 text-sm">Coefficient Estimates</h3>
            <p className="font-mono text-xs text-ink-600 mt-0.5">
              * p&lt;0.05 &nbsp; ** p&lt;0.01 &nbsp; *** p&lt;0.001
            </p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-ink-800/40">
                {["Variable", "Coef.", "Std.Err", "t", "Sig."].map((h) => (
                  <th key={h} className="px-4 py-3 text-right first:text-left font-mono text-[10px] uppercase tracking-widest text-ink-600">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {regressionCoefficients.map((row, i) => (
                <motion.tr
                  key={row.variable}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`border-b border-ink-800/30 hover:bg-ink-800/20 transition-colors ${
                    !row.significant ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${row.direction === "positive" ? "bg-emerald-500" : "bg-red-500"} ${!row.significant ? "opacity-40" : ""}`} />
                      <span className="font-mono text-xs text-ink-300">{row.label}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-right font-mono text-xs tabular-nums ${
                    row.coefficient >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {row.coefficient > 0 ? "+" : ""}{row.coefficient.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-ink-500 tabular-nums">
                    {row.stdError.toFixed(3)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-ink-400 tabular-nums">
                    {row.tStat.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <SignificanceDot pValue={row.pValue} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-base p-6"
        >
          <h3 className="font-sans font-medium text-ink-200 text-sm mb-1">Coefficient Magnitude</h3>
          <p className="font-mono text-xs text-ink-600 mb-6">Standardized effect size by variable</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[-1, 0.8]} tickFormatter={(v) => v.toFixed(1)} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 10, fontFamily: "var(--font-dm-mono)" }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={0} stroke="#5c5c6e" strokeWidth={1} />
              <Bar dataKey="coefficient" radius={[0, 3, 3, 0]}>
                {chartData.map((entry) => (
                  <Cell
                    key={entry.variable}
                    fill={!entry.significant
                      ? "#3d3d4d"
                      : entry.coefficient >= 0
                        ? "#10b981"
                        : "#f87171"}
                    fillOpacity={entry.significant ? 0.85 : 0.4}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="flex items-center gap-6 mt-2 pt-4 border-t border-ink-800/40">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-emerald-500/80" />
              <span className="font-mono text-[10px] text-ink-500">Positive effect</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-red-400/80" />
              <span className="font-mono text-[10px] text-ink-500">Negative effect</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-ink-700" />
              <span className="font-mono text-[10px] text-ink-500">Not significant</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Effect magnitude bars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card-base p-6 mb-10"
      >
        <h3 className="font-sans font-medium text-ink-200 text-sm mb-5">Relative Effect Magnitude</h3>
        <div className="space-y-4">
          {regressionCoefficients
            .filter((c) => c.significant)
            .sort((a, b) => Math.abs(b.coefficient) - Math.abs(a.coefficient))
            .map((c) => (
              <ProgressBar
                key={c.variable}
                label={c.label}
                value={c.coefficient}
                max={maxCoef}
                color={c.direction === "positive" ? "bg-emerald-500/80" : "bg-red-400/80"}
              />
            ))}
        </div>
      </motion.div>

      {/* Interpretation cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {interpretationCards.map((card, i) => (
          <Card key={card.title} delay={i * 0.08} className="flex gap-4">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0 ${
              card.variant === "positive" ? "bg-emerald-950/60 text-emerald-400" :
              card.variant === "negative" ? "bg-red-950/60 text-red-400" :
              "bg-ink-800/60 text-ink-400"
            }`}>
              {card.icon}
            </div>
            <div>
              <h4 className="font-sans font-medium text-ink-200 text-sm mb-2">{card.title}</h4>
              <p className="text-xs text-ink-400 leading-relaxed">{card.body}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
