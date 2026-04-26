"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, Card } from "../ui";

const findings = [
  {
    number: "01",
    category: "Model Fit",
    title: "The OLS model explains 93% of GDP growth variation",
    body: "With an R² of 0.9312 and an F-statistic of 272.4, the full model has exceptionally strong explanatory power. The adjusted R² (0.9278) confirms this is not due to overfitting. This is consistent with country-level macro models in the empirical growth literature.",
    color: "border-academic-gold/40",
  },
  {
    number: "02",
    category: "Labor Markets",
    title: "Unemployment is the dominant macroeconomic drag",
    body: "The unemployment coefficient (−0.847) dwarfs all other predictors in magnitude. This aligns with Okun's Law: cyclical unemployment reliably predicts output shortfalls. Policy implications are clear — labor market policy is the most direct lever for growth.",
    color: "border-red-500/30",
  },
  {
    number: "03",
    category: "External Sector",
    title: "Exchange rate appreciation consistently supports growth",
    body: "A stronger nominal exchange rate (coef. +0.612) correlates with higher GDP growth. This may reflect improved purchasing power, lower imported inflation, or the signaling effect of currency strength on investor confidence. The effect is statistically robust across all specifications.",
    color: "border-emerald-500/30",
  },
  {
    number: "04",
    category: "Parsimony",
    title: "Model selection confirms a 6-variable parsimonious model",
    body: "All three selection methods — forward, backward, and best subset — remove the same two variables: interest rate and imports. The simplified model achieves a higher adjusted R² (0.9278) than alternative specifications, demonstrating that parsimony and accuracy are not in conflict here.",
    color: "border-academic-blue/40",
  },
  {
    number: "05",
    category: "Classification",
    title: "Logistic model classifies growth regimes with 87.6% accuracy",
    body: "Binary classification of high vs. low GDP growth periods achieves an AUC of 0.921, indicating near-excellent discrimination. The probability outputs can inform early-warning systems for growth downturns — a practical application beyond the academic context.",
    color: "border-purple-500/30",
  },
  {
    number: "06",
    title: "Forecasting",
    body: "By weighting recent observations more heavily (α = 0.3)...",
    color: "border-academic-gold/30",
  },
]; // <--- Make sure this closing bracket and semicolon exist!

export default function InsightsSection() {
  return (
    <Section id="insights" className="border-t border-white/10">
      <SectionHeader
        label="Conclusions"
        number="06"
        title="Key Findings"
        description="A synthesis of the empirical results across all four analytical tasks. These conclusions are drawn directly from the data and are robust to alternative model specifications."
      />

      <div className="space-y-4">
        {findings.map((f, i) => (
          <motion.div
            key={f.number}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className={`card-base p-6 border-l-2 ${f.color}`}
          >
            <div className="grid md:grid-cols-[auto_1fr] gap-5">
              <div className="flex flex-col items-start gap-2 md:w-48">
                <span className="font-mono text-[10px] tracking-widest text-ink-600">{f.number}</span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-academic-gold/70 bg-academic-gold/10 px-2 py-0.5 rounded-full border border-academic-gold/20">
                  {f.category}
                </span>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-ink-100 mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{f.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Final statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 relative group"
      >
        <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative p-8 bg-[#0A0A0C]/60 backdrop-blur-xl border border-white/10 rounded-2xl">
          <p className="font-sans text-xl text-gray-200 leading-relaxed mb-4">
            "The evidence consistently points to <span className="text-emerald-400 font-medium">labor market conditions</span> and <span className="text-emerald-400 font-medium">exchange rate dynamics</span> as the primary drivers of short-run GDP growth in this sample."
          </p>
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
            — Derived from OLS, Logistic, & Model Selection Results
          </p>
        </div>
      </motion.div>
