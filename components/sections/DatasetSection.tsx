"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, Card, Badge } from "../ui";
import { datasetVariables, datasetPreview } from "../../lib/data";

const numericKeys = [
  "gdp_growth","interest_rate","inflation","unemployment",
  "exports","imports","exchange_rate","government_spending","investment"
];

export default function DatasetSection() {
  return (
    <Section id="dataset" className="border-t border-ink-800/40">
      <SectionHeader
        label="Task 0 — Data"
        number="01"
        title="Dataset Overview"
        description="180 quarterly observations of country-level macroeconomic indicators. The dataset spans the 2009–2023 period, covering two major economic shocks: the 2008 financial crisis aftermath and the COVID-19 recession."
      />

      {/* Variable cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {datasetVariables.map((v, i) => (
          <Card key={v.name} delay={i * 0.05} hover>
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="font-mono text-xs text-ink-500 uppercase tracking-wider">{v.unit}</span>
                <h3 className="font-sans font-medium text-ink-100 mt-0.5">{v.label}</h3>
              </div>
              <Badge variant={v.type === "Dependent" ? "gold" : "neutral"}>
                {v.type === "Dependent" ? "Y" : "X"}
              </Badge>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed">{v.description}</p>
            <div className="mt-3 pt-3 border-t border-ink-800/60">
              <code className="font-mono text-[11px] text-ink-600">{v.name}</code>
            </div>
          </Card>
        ))}
      </div>

      {/* Data preview table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="card-base overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-ink-800/60 flex items-center justify-between">
          <div>
            <h3 className="font-sans font-medium text-ink-200 text-sm">Sample Observations</h3>
            <p className="font-mono text-xs text-ink-600 mt-0.5">Showing 7 of 180 rows</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
            <span className="font-mono text-xs text-ink-500">Balanced Panel</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-ink-800/60">
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-ink-500">Year</th>
                {numericKeys.map((k) => (
                  <th key={k} className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-widest text-ink-500">
                    {k.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datasetPreview.map((row, i) => (
                <motion.tr
                  key={row.year}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="border-b border-ink-800/30 hover:bg-ink-800/20 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-ink-400">{row.year}</td>
                  {numericKeys.map((k) => {
                    const val = row[k as keyof typeof row] as number;
                    const isGDP = k === "gdp_growth";
                    return (
                      <td key={k} className={`px-4 py-3 text-right font-mono text-xs tabular-nums ${
                        isGDP
                          ? val >= 0 ? "text-emerald-400" : "text-red-400"
                          : "text-ink-300"
                      }`}>
                        {val.toFixed(1)}
                        {isGDP && "%"}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 bg-ink-900/30 flex items-center gap-6">
          <span className="font-mono text-[10px] text-ink-600 uppercase tracking-wider">Summary stats</span>
          <div className="flex gap-6">
            {[
              { label: "N", val: "180" },
              { label: "Period", val: "Q1 2009 – Q4 2023" },
              { label: "Frequency", val: "Quarterly" },
              { label: "Coverage", val: "Single country" },
            ].map((s) => (
              <div key={s.label} className="flex gap-2">
                <span className="font-mono text-[10px] text-ink-600 uppercase">{s.label}:</span>
                <span className="font-mono text-[10px] text-ink-400">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
