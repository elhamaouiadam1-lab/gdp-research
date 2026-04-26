"use client";

import { motion } from "framer-motion";

const tools = [
  {
    name: "Python",
    libs: ["statsmodels", "pandas", "matplotlib", "scikit-learn"],
    use: "OLS estimation, logistic regression, data preprocessing",
  },
  {
    name: "R",
    libs: ["olsrr", "forecast", "ggplot2", "MASS"],
    use: "Model selection (olsrr), time series forecasting, diagnostics",
  },
  {
    name: "Excel",
    libs: ["Data Analysis ToolPak", "Solver"],
    use: "Initial descriptive statistics, correlation matrix, raw data management",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-800/40 section-padding py-16">
      <div className="max-w-5xl">
        {/* Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="section-label block mb-4">Methodology & Tools</span>
          <div className="grid md:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <div key={tool.name} className="card-base p-5">
                <h4 className="font-serif text-lg font-medium text-ink-100 mb-2">{tool.name}</h4>
                <p className="text-xs text-ink-500 mb-3 leading-relaxed">{tool.use}</p>
                <div className="flex flex-wrap gap-1.5">
                  {tool.libs.map((lib) => (
                    <span key={lib} className="font-mono text-[10px] px-2 py-0.5 bg-ink-800/60 border border-ink-700/40 rounded text-ink-500">
                      {lib}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Academic note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 p-5 bg-ink-900/40 border border-ink-800/40 rounded-xl"
        >
          <p className="font-mono text-xs text-ink-500 leading-relaxed">
            <span className="text-ink-400 font-medium">Note:</span>{" "}
            This analysis is conducted for academic purposes as part of an Econometrics course.
            All data transformations, regression specifications, and model selection procedures
            follow standard econometric methodology. Assumptions of OLS (linearity, homoskedasticity,
            no perfect multicollinearity, no autocorrelation) were tested using standard diagnostic
            procedures. Robust standard errors were computed where necessary.
          </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-ink-800/40">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-academic-gold/40 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-academic-gold/70 rounded-sm" />
            </div>
            <span className="font-mono text-xs text-ink-600">
              Macroeconomic Determinants of GDP Growth
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            {["Multiple Linear Regression", "Logistic Regression", "Model Selection", "Time Series"].map((m) => (
              <span key={m} className="font-mono text-[10px] text-ink-700 uppercase tracking-wider">
                {m}
              </span>
            ))}
          </div>
          <span className="font-mono text-[10px] text-ink-700">
            Econometrics Final Project · 2024
          </span>
        </div>
      </div>
    </footer>
  );
}
