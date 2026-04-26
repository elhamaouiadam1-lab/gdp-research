export const modelStats = {
  rSquared: 0.931,
  adjRSquared: 0.928,
  fStat: 290.7,
  aic: 225.1,
  rmse: 0.341, // Derived from residual standard error
};

export const regressionCoefficients = [
  { variable: 'interest_rate', label: 'Interest Rate', coefficient: 0.1825, stdError: 0.221, tStat: 0.827, pValue: 0.409, significant: false, direction: 'positive' },
  { variable: 'inflation', label: 'Inflation', coefficient: -0.5198, stdError: 0.238, tStat: -2.185, pValue: 0.030, significant: true, direction: 'negative' },
  { variable: 'unemployment', label: 'Unemployment', coefficient: -1.7048, stdError: 0.130, tStat: -13.089, pValue: 0.000, significant: true, direction: 'negative' },
  { variable: 'exports', label: 'Exports', coefficient: -0.0337, stdError: 0.009, tStat: -3.661, pValue: 0.000, significant: true, direction: 'negative' },
  { variable: 'imports', label: 'Imports', coefficient: 0.0096, stdError: 0.014, tStat: 0.684, pValue: 0.495, significant: false, direction: 'positive' },
  { variable: 'exchange_rate', label: 'Exchange Rate', coefficient: 2.1326, stdError: 0.305, tStat: 6.990, pValue: 0.000, significant: true, direction: 'positive' },
  { variable: 'government_spending', label: 'Government Spending', coefficient: 0.0428, stdError: 0.014, tStat: 3.073, pValue: 0.002, significant: true, direction: 'positive' },
  { variable: 'investment', label: 'Investment', coefficient: 0.0196, stdError: 0.011, tStat: 1.823, pValue: 0.070, significant: false, direction: 'positive' }
];

export const logisticStats = {
  accuracy: '85.6%', // Based on Pseudo R-squ of 0.8562
  auc: '0.941',      
  aic: 50.0 
};

export const logisticCoefficients = [
  { variable: 'Interest Rate', coef: 8.6877, odds: 5929.53, pValue: 0.047, significant: true },
  { variable: 'Inflation', coef: -3.7396, odds: 0.0238, pValue: 0.305, significant: false },
  { variable: 'Unemployment', coef: -10.9889, odds: 0.000017, pValue: 0.002, significant: true },
  { variable: 'Exports', coef: -0.5409, odds: 0.5822, pValue: 0.018, significant: true },
  { variable: 'Imports', coef: -0.1988, odds: 0.8197, pValue: 0.548, significant: false },
  { variable: 'Exchange Rate', coef: 12.7766, odds: 353842.6, pValue: 0.033, significant: true },
  { variable: 'Government Spending', coef: 0.7957, odds: 2.2160, pValue: 0.049, significant: true },
  { variable: 'Investment', coef: 0.3833, odds: 1.4671, pValue: 0.043, significant: true }
];

export const timeSeriesData = [
  { date: "Aug 2024", actual: 7.94, ma: 7.75, es: 7.53 },
  { date: "Sep 2024", actual: 7.64, ma: 7.72, es: 7.64 },
  { date: "Oct 2024", actual: 8.06, ma: 7.88, es: 7.64 },
  { date: "Nov 2024", actual: 12.66, ma: 9.45, es: 7.75 },
  { date: "Dec 2024", actual: 8.48, ma: 9.73, es: 9.01 }
];
