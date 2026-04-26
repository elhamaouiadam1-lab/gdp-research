"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ReferenceLine, ResponsiveContainer, Brush
} from "recharts";
import { Section, SectionHeader, Card, Badge, Stat } from "../ui";
import { timeSeriesData, forecastMetrics } from "../../lib/data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-ink-900 border border-ink-700 rounded-lg p-3 shadow-xl min-w-[180px]">
      <p className="font-mono text-xs text-ink-400 uppercase tracking-wider mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="font-mono text-xs text-ink-400">{p.name}</span>
          </div>
          <span className="font-mono text-xs font-medium" style={{ color: p.color }}>
            {p.value != null ? `${p.value.toFixed(2)}%` : "—"}
          </span>
        </div>
      ))}
    </div>
  );
};

// Thin out x-axis labels for readability
const tickFormatter = (value: string, index: number) => {
  return index % 8 === 0 ? value : "";
};

export default function TimeSeriesSection() {
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const getOpacity = (key: string) => {
    if (!highlighted) return 1;
    return highlighted === key ? 1 : 0.2;
  };

  return (
    <Section id="timeseries" className="border-t border-ink-800/40">
      <SectionHeader
        label="Task 4 — Forecasting"
        number="05"
        title="Time Series Forecasting"
        description="Two smoothing methods are applied to quarterly GDP growth data. Moving Average (3-period) and Exponential Smoothing (α = 0.3) are compared on tracking accuracy. The COVID-19 shock (Q1–Q2 2020) provides a stress test for both methods."
        number="05"
      />

      {/* Method cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <Card
          className="cursor-pointer border-2 transition-all"
          hover={false}
          delay={0}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="section-label block mb-1">Method A</span>
              <h3 className="font-sans font-medium text-ink-100">Moving Average</h3>
              <p className="font-mono text-xs text-ink-600 mt-0.5">Window = 3 periods</p>
            </div>
            <div className="w-3 h-3 rounded-full bg-ink-400/60 mt-1" />
          </div>
          <p className="text-sm text-ink-400 leading-relaxed mb-4">
            A simple average of the three most recent observations. Each forecast
            carries equal weight regardless of recency. Lags during sudden changes.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-ink-800/40">
            <Stat label="MAE" value={forecastMetrics.movingAverage.mae} />
            <Stat label="RMSE" value={forecastMetrics.movingAverage.rmse} />
            <Stat label="MAPE" value={forecastMetrics.movingAverage.mape} />
          </div>
        </Card>

        <Card
          className="cursor-pointer border-2 border-academic-gold/30 bg-academic-gold/5"
          hover={false}
          delay={0.08}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="section-label block mb-1">Method B — Winner</span>
              <h3 className="font-sans font-medium text-ink-100">Exponential Smoothing</h3>
              <p className="font-mono text-xs text-ink-600 mt-0.5">α = 0.30</p>
            </div>
            <Badge variant="gold">Lower Error</Badge>
          </div>
          <p className="text-sm text-ink-400 leading-relaxed mb-4">
            Weights recent observations more heavily, with each prior period discounted
            by factor (1−α). Adapts faster to trend reversals than simple MA.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-ink-800/40">
            <Stat label="MAE" value={forecastMetrics.exponentialSmoothing.mae} accent />
            <Stat label="RMSE" value={forecastMetrics.exponentialSmoothing.rmse} accent />
            <Stat label="MAPE" value={forecastMetrics.exponentialSmoothing.mape} accent />
          </div>
        </Card>
      </div>

      {/* Main time series chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="card-base p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-sans font-medium text-ink-200 text-sm">GDP Growth — Actual vs Forecasts</h3>
            <p className="font-mono text-xs text-ink-600 mt-0.5">Q1 2009 – Q4 2023 · 60 quarterly observations</p>
          </div>
          <div className="flex gap-3">
            {[
              { key: "actual", label: "Actual", color: "#e2e8f0" },
              { key: "ma", label: "Moving Avg", color: "#94a3b8" },
              { key: "es", label: "Exp. Smoothing", color: "#b8962e" },
            ].map((item) => (
              <button
                key={item.key}
                onMouseEnter={() => setHighlighted(item.key)}
                onMouseLeave={() => setHighlighted(null)}
                className="flex items-center gap-1.5 group"
              >
                <div
                  className="w-4 h-0.5 rounded-full transition-opacity"
                  style={{
                    background: item.color,
                    opacity: highlighted && highlighted !== item.key ? 0.3 : 1,
                  }}
                />
                <span className={`font-mono text-[10px] transition-colors ${
                  highlighted === item.key ? "text-ink-200" : "text-ink-600"
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={timeSeriesData} margin={{ top: 8, right: 16, bottom: 8, left: -8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="period"
              tickFormatter={tickFormatter}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              domain={[-12, 8]}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#5c5c6e" strokeWidth={1} strokeDasharray="4 4" />
            {/* COVID annotation */}
            <ReferenceLine
              x="Q1 2020"
              stroke="#ef4444"
              strokeWidth={1}
              strokeDasharray="3 3"
              label={{ value: "COVID-19", position: "insideTopRight", fontSize: 9, fill: "#ef4444" }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#e2e8f0"
              strokeWidth={highlighted === "actual" || !highlighted ? 2 : 0.5}
              dot={false}
              opacity={getOpacity("actual")}
            />
            <Line
              type="monotone"
              dataKey="ma"
              name="Moving Avg"
              stroke="#94a3b8"
              strokeWidth={highlighted === "ma" || !highlighted ? 1.5 : 0.5}
              strokeDasharray="6 3"
              dot={false}
              opacity={getOpacity("ma")}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="es"
              name="Exp. Smoothing"
              stroke="#b8962e"
              strokeWidth={highlighted === "es" || !highlighted ? 2 : 0.5}
              strokeDasharray="4 2"
              dot={false}
              opacity={getOpacity("es")}
              connectNulls
            />
            <Brush
              dataKey="period"
              height={20}
              stroke="#40404c"
              fill="#1a1a22"
              travellerWidth={6}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Performance comparison */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="card-base p-6 mb-8"
      >
        <h3 className="font-sans font-medium text-ink-200 text-sm mb-5">Error Metric Comparison</h3>
        <div className="space-y-6">
          {[
            { metric: "MAE", ma: forecastMetrics.movingAverage.mae, es: forecastMetrics.exponentialSmoothing.mae, unit: "pp" },
            { metric: "RMSE", ma: forecastMetrics.movingAverage.rmse, es: forecastMetrics.exponentialSmoothing.rmse, unit: "pp" },
          ].map(({ metric, ma, es, unit }) => {
            const maxVal = Math.max(ma, es);
            return (
              <div key={metric}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-ink-500 uppercase tracking-widest">{metric}</span>
                  <span className="font-mono text-[10px] text-ink-600">Lower is better</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-ink-500 w-20 shrink-0">Moving Avg</span>
                    <div className="flex-1 h-2 bg-ink-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(ma / maxVal) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className="h-full bg-ink-500/60 rounded-full"
                      />
                    </div>
                    <span className="font-mono text-xs text-ink-400 w-10 text-right">{ma} {unit}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-academic-gold w-20 shrink-0">Exp. Smooth</span>
                    <div className="flex-1 h-2 bg-ink-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(es / maxVal) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                        className="h-full bg-academic-gold/70 rounded-full"
                      />
                    </div>
                    <span className="font-mono text-xs text-academic-gold w-10 text-right">{es} {unit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Insights */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Exp. Smoothing wins on all metrics",
            body: "Lower MAE (0.412 vs 0.741), RMSE (0.623 vs 1.023), and MAPE (11.2% vs 18.4%). The α = 0.3 parameter balances responsiveness with stability.",
          },
          {
            title: "COVID shock reveals MA lag",
            body: "During the Q1–Q2 2020 shock, the moving average failed to capture the -9.1% trough in real time. Exp. smoothing adjusted faster.",
          },
          {
            title: "No strong seasonality detected",
            body: "The series exhibits a clear trend cycle but limited seasonal structure. Quarterly dummies were tested and found insignificant.",
          },
        ].map((card, i) => (
          <Card key={card.title} delay={i * 0.08}>
            <h4 className="font-sans font-medium text-ink-200 text-sm mb-2">{card.title}</h4>
            <p className="text-xs text-ink-400 leading-relaxed">{card.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
