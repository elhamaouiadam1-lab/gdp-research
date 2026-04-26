# Macroeconomic Determinants of GDP Growth
## Econometrics Research Dashboard

A modern academic website presenting an econometric analysis of GDP growth determinants, built with Next.js 14 and Tailwind CSS.

---

## 🏗️ Project Structure

```
gdp-research/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main page (assembles all sections)
│   └── globals.css         # Global styles & Tailwind config
├── components/
│   ├── Navigation.tsx      # Fixed top nav with active-section tracking
│   ├── Footer.tsx          # Methodology & tools footer
│   ├── ui/
│   │   └── index.tsx       # Reusable UI primitives (Card, Badge, Stat, etc.)
│   └── sections/
│       ├── HeroSection.tsx
│       ├── DatasetSection.tsx
│       ├── RegressionSection.tsx
│       ├── LogisticSection.tsx
│       ├── ModelSelectionSection.tsx
│       ├── TimeSeriesSection.tsx
│       └── InsightsSection.tsx
├── lib/
│   └── data.ts             # All embedded research data (no backend needed)
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
open http://localhost:3000
```

---

## ☁️ Deploy on Vercel

### Option A — Vercel CLI (fastest)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel

# Follow prompts:
# - Link to your Vercel account
# - Accept defaults for Next.js detection
# - Deploy!
```

### Option B — GitHub + Vercel Dashboard

1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: GDP Research Dashboard"
   git remote add origin https://github.com/YOUR_USERNAME/gdp-research.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **New Project**

3. Import your GitHub repository

4. Vercel auto-detects Next.js — click **Deploy**

5. Your site is live at `https://gdp-research.vercel.app` (or custom domain)

### Environment Variables
None required — all data is embedded in `lib/data.ts`.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--font-playfair` | Playfair Display | Headings, serif display |
| `--font-dm-sans` | DM Sans | Body text, UI labels |
| `--font-dm-mono` | DM Mono | Stats, code, badges |
| `academic-blue` | `#1e3a5f` | Primary brand |
| `academic-gold` | `#b8962e` | Accent, highlights |
| `ink-950` | `#1a1a22` | Background |

---

## 📊 Sections

| # | Section | Task |
|---|---------|------|
| 0 | Hero | Project overview |
| 1 | Dataset | Variable descriptions, data preview |
| 2 | Regression | OLS coefficients, R², F-stat, charts |
| 3 | Logistic | Binary classification, odds ratios |
| 4 | Model Selection | Forward/Backward/Best Subset comparison |
| 5 | Time Series | MA vs Exp. Smoothing, error metrics |
| 6 | Key Insights | Academic conclusions |
| 7 | Footer | Methodology, tools |

---

## 🔧 Customization

### Updating Data
All data lives in `lib/data.ts`. Replace the placeholder arrays with your actual results:
- `regressionCoefficients` — OLS output
- `logisticCoefficients` — Logistic output
- `modelStats` — Model fit statistics
- `timeSeriesData` — Actual + MA + ES values
- `datasetPreview` — Sample data rows

### Adding Real Charts from R/Python
Export your model results as JSON and import them in `lib/data.ts`.

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next` | Framework |
| `react` | UI library |
| `tailwindcss` | Styling |
| `framer-motion` | Animations |
| `recharts` | Charts |
| `lucide-react` | Icons |
| `clsx` | Conditional classnames |

---

*Built for academic presentation · Econometrics Final Project · 2024*
