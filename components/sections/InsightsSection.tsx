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
    category: "Forecasting",
    title: "Exponential smoothing outperforms moving average across all error metrics",
    body: "By weighting recent observations more heavily (α = 0.3), exponential smoothing achieves 44% lower MAE and 39% lower RMSE than the 3-period moving average. The COVID-19 shock in 2020 illustrates this advantage — the moving average lagged significantly behind the actual path.",
    color: "border-academic-gold/30",
  },
];

export default function InsightsSection() {
  return (
    <Section id="insights" className="border-t border-ink-800/40">
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
            className={`card-base p-6 border-l-2 ${f.color} hover:bg-ink-800/30 transition-colors`}
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
        className="mt-12 p-8 bg-gradient-to-r from-academic-blue/20 to-transparent border border-academic-blue/30 rounded-xl"
      >
        <p className="font-serif text-xl text-ink-100 leading-relaxed mb-3">
          "The evidence consistently points to labor market conditions and exchange rate dynamics
          as the primary drivers of short-run GDP growth in this sample."
        </p>
        <p className="font-mono text-xs text-ink-500">
          — Derived from OLS, Logistic, and Model Selection results · Confirmed by all three variable selection methods
        </p>
      </motion.div>
    </Section>
  );
}
