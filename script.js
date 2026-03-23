const screens = [...document.querySelectorAll('.panel')];
const loginForm = document.getElementById('login-form');
const questionnaireForm = document.getElementById('questionnaire-form');
const analysisForm = document.getElementById('analysis-form');
const starterOutput = document.getElementById('starter-output');
const analysisOutput = document.getElementById('analysis-output');

const ETF_METADATA = {
  VOO: {
    name: 'Vanguard S&P 500 ETF',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: {
      Technology: 0.32,
      Financials: 0.13,
      Healthcare: 0.12,
      ConsumerDiscretionary: 0.1,
      Industrials: 0.08,
      CommunicationServices: 0.09,
      ConsumerStaples: 0.06,
      Energy: 0.04,
      Utilities: 0.03,
      Materials: 0.02,
      RealEstate: 0.01,
    },
    tags: ['broad-us-etf', 'all-equity-broad-market'],
    strategyGroup: 'us-large-cap-index',
  },
  SPY: {
    name: 'SPDR S&P 500 ETF',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: {
      Technology: 0.32,
      Financials: 0.13,
      Healthcare: 0.12,
      ConsumerDiscretionary: 0.1,
      Industrials: 0.08,
      CommunicationServices: 0.09,
      ConsumerStaples: 0.06,
      Energy: 0.04,
      Utilities: 0.03,
      Materials: 0.02,
      RealEstate: 0.01,
    },
    tags: ['broad-us-etf', 'all-equity-broad-market'],
    strategyGroup: 'us-large-cap-index',
  },
  IVV: {
    name: 'iShares Core S&P 500 ETF',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: {
      Technology: 0.32,
      Financials: 0.13,
      Healthcare: 0.12,
      ConsumerDiscretionary: 0.1,
      Industrials: 0.08,
      CommunicationServices: 0.09,
      ConsumerStaples: 0.06,
      Energy: 0.04,
      Utilities: 0.03,
      Materials: 0.02,
      RealEstate: 0.01,
    },
    tags: ['broad-us-etf', 'all-equity-broad-market'],
    strategyGroup: 'us-large-cap-index',
  },
  VTI: {
    name: 'Vanguard Total Stock Market ETF',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: {
      Technology: 0.3,
      Financials: 0.13,
      Healthcare: 0.11,
      ConsumerDiscretionary: 0.1,
      Industrials: 0.1,
      CommunicationServices: 0.08,
      ConsumerStaples: 0.06,
      Energy: 0.04,
      Utilities: 0.03,
      Materials: 0.03,
      RealEstate: 0.02,
    },
    tags: ['broad-us-etf', 'all-equity-broad-market'],
    strategyGroup: 'us-total-market',
  },
  ITOT: {
    name: 'iShares Core S&P Total U.S. Stock Market ETF',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: {
      Technology: 0.3,
      Financials: 0.13,
      Healthcare: 0.11,
      ConsumerDiscretionary: 0.1,
      Industrials: 0.1,
      CommunicationServices: 0.08,
      ConsumerStaples: 0.06,
      Energy: 0.04,
      Utilities: 0.03,
      Materials: 0.03,
      RealEstate: 0.02,
    },
    tags: ['broad-us-etf', 'all-equity-broad-market'],
    strategyGroup: 'us-total-market',
  },
  SCHD: {
    name: 'Schwab U.S. Dividend Equity ETF',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.97, International: 0.03 },
    sector: {
      Financials: 0.19,
      Healthcare: 0.16,
      Technology: 0.14,
      Industrials: 0.13,
      ConsumerStaples: 0.11,
      Energy: 0.09,
      ConsumerDiscretionary: 0.07,
      CommunicationServices: 0.04,
      Utilities: 0.03,
      Materials: 0.02,
      RealEstate: 0.02,
    },
    tags: ['broad-us-etf'],
    strategyGroup: 'us-dividend-equity',
  },
  QQQ: {
    name: 'Invesco QQQ Trust',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.95, International: 0.05 },
    sector: {
      Technology: 0.5,
      CommunicationServices: 0.16,
      ConsumerDiscretionary: 0.14,
      Healthcare: 0.06,
      Industrials: 0.05,
      ConsumerStaples: 0.03,
      Utilities: 0.02,
      Financials: 0.02,
      Materials: 0.01,
      Energy: 0.01,
    },
    tags: [],
    strategyGroup: 'nasdaq-growth',
  },
  VT: {
    name: 'Vanguard Total World Stock ETF',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.62, International: 0.38 },
    sector: {
      Technology: 0.24,
      Financials: 0.16,
      Industrials: 0.11,
      ConsumerDiscretionary: 0.1,
      Healthcare: 0.1,
      CommunicationServices: 0.08,
      ConsumerStaples: 0.07,
      Energy: 0.05,
      Materials: 0.04,
      Utilities: 0.03,
      RealEstate: 0.02,
    },
    tags: ['all-equity-broad-market'],
    strategyGroup: 'global-total-market',
  },
  VXUS: {
    name: 'Vanguard Total International Stock ETF',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { International: 0.98, 'United States': 0.02 },
    sector: {
      Financials: 0.2,
      Industrials: 0.14,
      Technology: 0.13,
      ConsumerDiscretionary: 0.12,
      Healthcare: 0.09,
      Materials: 0.09,
      ConsumerStaples: 0.08,
      Energy: 0.06,
      CommunicationServices: 0.04,
      Utilities: 0.03,
      RealEstate: 0.02,
    },
    tags: [],
    strategyGroup: 'international-total-market',
  },
  BND: {
    name: 'Vanguard Total Bond Market ETF',
    type: 'etf',
    assetClass: { bonds: 1 },
    geography: { 'United States': 0.9, International: 0.1 },
    sector: { Bonds: 1 },
    tags: [],
    strategyGroup: 'core-bonds',
  },
  AGG: {
    name: 'iShares Core U.S. Aggregate Bond ETF',
    type: 'etf',
    assetClass: { bonds: 1 },
    geography: { 'United States': 0.9, International: 0.1 },
    sector: { Bonds: 1 },
    tags: [],
    strategyGroup: 'core-bonds',
  },
  XLK: {
    name: 'Technology Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { Technology: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'technology-sector',
  },
  XLF: {
    name: 'Financial Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { Financials: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'financials-sector',
  },
  XLV: {
    name: 'Health Care Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { Healthcare: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'healthcare-sector',
  },
  XLE: {
    name: 'Energy Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { Energy: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'energy-sector',
  },
  XLI: {
    name: 'Industrial Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { Industrials: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'industrials-sector',
  },
  XLY: {
    name: 'Consumer Discretionary Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { ConsumerDiscretionary: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'consumer-discretionary-sector',
  },
  XLP: {
    name: 'Consumer Staples Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { ConsumerStaples: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'consumer-staples-sector',
  },
  XLC: {
    name: 'Communication Services Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { CommunicationServices: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'communication-sector',
  },
  XLU: {
    name: 'Utilities Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { Utilities: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'utilities-sector',
  },
  XLB: {
    name: 'Materials Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { Materials: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'materials-sector',
  },
  XLRE: {
    name: 'Real Estate Select Sector SPDR Fund',
    type: 'etf',
    assetClass: { equities: 1 },
    geography: { 'United States': 0.99, International: 0.01 },
    sector: { RealEstate: 1 },
    tags: ['sector-etf'],
    strategyGroup: 'real-estate-sector',
  },
  CASH: {
    name: 'Cash',
    type: 'cash',
    assetClass: { cash: 1 },
    geography: { 'United States': 1 },
    sector: { Cash: 1 },
    tags: [],
    strategyGroup: 'cash',
  },
};

const STOCK_METADATA = {
  AAPL: { name: 'Apple', sector: 'Technology', geography: 'United States' },
  MSFT: { name: 'Microsoft', sector: 'Technology', geography: 'United States' },
  NVDA: { name: 'NVIDIA', sector: 'Technology', geography: 'United States' },
  AMD: { name: 'AMD', sector: 'Technology', geography: 'United States' },
  INTC: { name: 'Intel', sector: 'Technology', geography: 'United States' },
  ORCL: { name: 'Oracle', sector: 'Technology', geography: 'United States' },
  CRM: { name: 'Salesforce', sector: 'Technology', geography: 'United States' },
  ADBE: { name: 'Adobe', sector: 'Technology', geography: 'United States' },
  CSCO: { name: 'Cisco', sector: 'Technology', geography: 'United States' },
  IBM: { name: 'IBM', sector: 'Technology', geography: 'United States' },
  AMZN: { name: 'Amazon', sector: 'ConsumerDiscretionary', geography: 'United States' },
  TSLA: { name: 'Tesla', sector: 'ConsumerDiscretionary', geography: 'United States' },
  HD: { name: 'Home Depot', sector: 'ConsumerDiscretionary', geography: 'United States' },
  MCD: { name: 'McDonald\'s', sector: 'ConsumerDiscretionary', geography: 'United States' },
  NKE: { name: 'Nike', sector: 'ConsumerDiscretionary', geography: 'United States' },
  SBUX: { name: 'Starbucks', sector: 'ConsumerDiscretionary', geography: 'United States' },
  WMT: { name: 'Walmart', sector: 'ConsumerStaples', geography: 'United States' },
  COST: { name: 'Costco', sector: 'ConsumerStaples', geography: 'United States' },
  KO: { name: 'Coca-Cola', sector: 'ConsumerStaples', geography: 'United States' },
  PEP: { name: 'PepsiCo', sector: 'ConsumerStaples', geography: 'United States' },
  PG: { name: 'Procter & Gamble', sector: 'ConsumerStaples', geography: 'United States' },
  PM: { name: 'Philip Morris', sector: 'ConsumerStaples', geography: 'United States' },
  GOOGL: { name: 'Alphabet', sector: 'CommunicationServices', geography: 'United States' },
  GOOG: { name: 'Alphabet', sector: 'CommunicationServices', geography: 'United States' },
  META: { name: 'Meta', sector: 'CommunicationServices', geography: 'United States' },
  NFLX: { name: 'Netflix', sector: 'CommunicationServices', geography: 'United States' },
  DIS: { name: 'Disney', sector: 'CommunicationServices', geography: 'United States' },
  T: { name: 'AT&T', sector: 'CommunicationServices', geography: 'United States' },
  VZ: { name: 'Verizon', sector: 'CommunicationServices', geography: 'United States' },
  'BRK.B': { name: 'Berkshire Hathaway', sector: 'Financials', geography: 'United States' },
  JPM: { name: 'JPMorgan Chase', sector: 'Financials', geography: 'United States' },
  BAC: { name: 'Bank of America', sector: 'Financials', geography: 'United States' },
  WFC: { name: 'Wells Fargo', sector: 'Financials', geography: 'United States' },
  GS: { name: 'Goldman Sachs', sector: 'Financials', geography: 'United States' },
  MS: { name: 'Morgan Stanley', sector: 'Financials', geography: 'United States' },
  V: { name: 'Visa', sector: 'Financials', geography: 'United States' },
  MA: { name: 'Mastercard', sector: 'Financials', geography: 'United States' },
  JNJ: { name: 'Johnson & Johnson', sector: 'Healthcare', geography: 'United States' },
  UNH: { name: 'UnitedHealth Group', sector: 'Healthcare', geography: 'United States' },
  MRK: { name: 'Merck', sector: 'Healthcare', geography: 'United States' },
  ABBV: { name: 'AbbVie', sector: 'Healthcare', geography: 'United States' },
  PFE: { name: 'Pfizer', sector: 'Healthcare', geography: 'United States' },
  LLY: { name: 'Eli Lilly', sector: 'Healthcare', geography: 'United States' },
  XOM: { name: 'Exxon Mobil', sector: 'Energy', geography: 'United States' },
  CVX: { name: 'Chevron', sector: 'Energy', geography: 'United States' },
  SLB: { name: 'Schlumberger', sector: 'Energy', geography: 'United States' },
  COP: { name: 'ConocoPhillips', sector: 'Energy', geography: 'United States' },
  CAT: { name: 'Caterpillar', sector: 'Industrials', geography: 'United States' },
  GE: { name: 'GE Aerospace', sector: 'Industrials', geography: 'United States' },
  DE: { name: 'Deere', sector: 'Industrials', geography: 'United States' },
  HON: { name: 'Honeywell', sector: 'Industrials', geography: 'United States' },
  UPS: { name: 'UPS', sector: 'Industrials', geography: 'United States' },
  LIN: { name: 'Linde', sector: 'Materials', geography: 'United States' },
  SHW: { name: 'Sherwin-Williams', sector: 'Materials', geography: 'United States' },
  NEM: { name: 'Newmont', sector: 'Materials', geography: 'United States' },
  APD: { name: 'Air Products', sector: 'Materials', geography: 'United States' },
  PLD: { name: 'Prologis', sector: 'RealEstate', geography: 'United States' },
  AMT: { name: 'American Tower', sector: 'RealEstate', geography: 'United States' },
  O: { name: 'Realty Income', sector: 'RealEstate', geography: 'United States' },
  NEE: { name: 'NextEra Energy', sector: 'Utilities', geography: 'United States' },
  DUK: { name: 'Duke Energy', sector: 'Utilities', geography: 'United States' },
  SO: { name: 'Southern Company', sector: 'Utilities', geography: 'United States' },
};

const SEVERITY_STYLES = {
  high: 'severity-high',
  'medium/high': 'severity-medium-high',
  medium: 'severity-medium',
  'low/medium': 'severity-low-medium',
  useful: 'severity-useful',
};

const SEVERITY_PENALTIES = {
  high: 14,
  'medium/high': 10,
  medium: 7,
  'low/medium': 5,
  useful: 3,
};

const state = {
  login: null,
  questionnaire: null,
  portfolio: null,
};

function showScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle('active', screen.id === screenId);
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildStarterPlanSummary(answers) {
  const cash = Number(answers.currentCash);
  const monthly = Number(answers.monthlyAmount);
  const experienceDetail =
    answers.experience === 'beginner'
      ? 'You are just getting started, so a simple diversified approach and steady habits matter more than trying to pick winners.'
      : answers.experience === 'some experience'
        ? 'You already have some investing experience, which means you can build on what you know while still keeping your plan disciplined.'
        : 'You have advanced investing experience, so your plan can handle more nuance while staying aligned to your goals.';

  const riskDetail =
    answers.riskTolerance === 'low'
      ? 'Because your risk tolerance is low, stability and diversification should be front and center.'
      : answers.riskTolerance === 'medium'
        ? 'Because your risk tolerance is medium, a balanced mix of growth and stability likely fits you best.'
        : 'Because your risk tolerance is high, you may be comfortable with more volatility in pursuit of stronger long-term growth.';

  return `At age ${answers.age} in ${answers.country}, you are investing for ${answers.mainGoal} with a ${answers.timeHorizon} time horizon. ${experienceDetail} ${riskDetail} With ${formatCurrency(monthly)} available to invest each month and ${formatCurrency(cash)} ready to put to work now, your starter plan should focus on broad diversification, consistent contributions, and avoiding the concern you flagged most: ${answers.worry}. Start with a simple core portfolio, add money on a regular schedule, and review it periodically so your investments stay matched to your goals.`;
}

function parseHoldings(holdingsText) {
  return holdingsText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(.+?)\s*[—-]\s*([$\d,\.]+)$/);
      if (!match) {
        return {
          raw: line,
          symbol: '',
          amount: Number.NaN,
        };
      }

      return {
        raw: line,
        symbol: match[1].trim().toUpperCase(),
        amount: Number(match[2].replace(/[$,]/g, '').trim()),
      };
    });
}

function getHoldingMetadata(symbol) {
  const normalizedSymbol = symbol.toUpperCase();

  if (ETF_METADATA[normalizedSymbol]) {
    return ETF_METADATA[normalizedSymbol];
  }

  const stock = STOCK_METADATA[normalizedSymbol] || {
    name: normalizedSymbol,
    sector: 'Unknown',
    geography: 'United States',
  };

  return {
    name: stock.name,
    type: 'stock',
    assetClass: { equities: 1 },
    geography: { [stock.geography]: 1 },
    sector: { [stock.sector]: 1 },
    tags: ['single-stock'],
    strategyGroup: `single-stock-${normalizedSymbol}`,
  };
}

function accumulateWeightedBreakdown(target, weights, value) {
  Object.entries(weights).forEach(([key, weight]) => {
    target[key] = (target[key] || 0) + value * weight;
  });
}

function normalizeTotals(totals, totalValue) {
  return Object.entries(totals)
    .map(([name, value]) => ({
      name,
      value,
      weight: totalValue ? value / totalValue : 0,
    }))
    .sort((left, right) => right.value - left.value);
}

function primaryBucket(items) {
  return items[0]?.name || 'Unknown';
}

function analyzePortfolio(holdings, questionnaire) {
  const enrichedHoldings = holdings.map((holding) => {
    const metadata = getHoldingMetadata(holding.symbol);
    return {
      ...holding,
      metadata,
      isSingleStock: metadata.type === 'stock',
      isBroadUsEtf: metadata.tags.includes('broad-us-etf'),
      isAllEquityBroadMarketEtf: metadata.tags.includes('all-equity-broad-market'),
      primarySector: primaryBucket(normalizeTotals(metadata.sector, 1)),
      primaryGeography: primaryBucket(normalizeTotals(metadata.geography, 1)),
    };
  });

  const totalValue = enrichedHoldings.reduce((sum, holding) => sum + holding.amount, 0);
  const weightedHoldings = enrichedHoldings
    .map((holding) => ({
      ...holding,
      weight: totalValue ? holding.amount / totalValue : 0,
    }))
    .sort((left, right) => right.amount - left.amount);

  const assetClassTotals = {};
  const geographyTotals = {};
  const sectorTotals = {};
  const strategyExposure = {};

  weightedHoldings.forEach((holding) => {
    accumulateWeightedBreakdown(assetClassTotals, holding.metadata.assetClass, holding.amount);
    accumulateWeightedBreakdown(geographyTotals, holding.metadata.geography, holding.amount);
    accumulateWeightedBreakdown(sectorTotals, holding.metadata.sector, holding.amount);
    strategyExposure[holding.metadata.strategyGroup] =
      (strategyExposure[holding.metadata.strategyGroup] || 0) + holding.amount;
  });

  const summary = {
    totalValue,
    holdings: weightedHoldings,
    assetClassTotals: normalizeTotals(assetClassTotals, totalValue),
    geographyTotals: normalizeTotals(geographyTotals, totalValue),
    sectorTotals: normalizeTotals(sectorTotals, totalValue),
    strategyExposure: normalizeTotals(strategyExposure, totalValue),
  };

  const rules = generateRules(summary, questionnaire);
  const positives = generatePositiveSignals(summary, questionnaire);
  const health = computePortfolioHealth(rules);
  const fitSummary = buildFitSummary(summary, questionnaire, rules, positives);

  return {
    ...summary,
    rules,
    positives,
    health,
    fitSummary,
  };
}

function createRule(severity, priorityScore, title, detail, recommendation) {
  return {
    severity,
    priorityScore,
    title,
    detail,
    recommendation,
  };
}

function pushRule(rules, condition, rule) {
  if (condition) {
    rules.push(rule);
  }
}

function getAllocationWeight(items, name) {
  return items.find((item) => item.name === name)?.weight || 0;
}

function generateRules(portfolio, questionnaire) {
  const rules = [];
  const answers = questionnaire || {};
  const age = Number(answers.age || 0);
  const monthlyContribution = Number(answers.monthlyAmount || 0);
  const currentCashAvailable = Number(answers.currentCash || 0);
  const largestHolding = portfolio.holdings[0];
  const topGeography = portfolio.geographyTotals[0];
  const topSector = portfolio.sectorTotals[0];
  const equitiesWeight = getAllocationWeight(portfolio.assetClassTotals, 'equities');
  const bondsWeight = getAllocationWeight(portfolio.assetClassTotals, 'bonds');
  const cashWeight = getAllocationWeight(portfolio.assetClassTotals, 'cash');
  const cashAndBondsWeight = cashWeight + bondsWeight;
  const holdingCount = portfolio.holdings.length;
  const broadUsEtfCount = portfolio.holdings.filter((holding) => holding.isBroadUsEtf).length;
  const allEquityBroadMarketCount = portfolio.holdings.filter((holding) => holding.isAllEquityBroadMarketEtf).length;
  const singleStockHoldings = portfolio.holdings.filter((holding) => holding.isSingleStock);
  const singleStockCount = singleStockHoldings.length;
  const onlySingleStocks = singleStockCount === holdingCount;
  const hasBroadEtf = portfolio.holdings.some((holding) => holding.isBroadUsEtf || holding.isAllEquityBroadMarketEtf);
  const duplicateStrategies = portfolio.strategyExposure.filter((item) => item.weight >= 0.2).length >= 2;
  const horizon = answers.timeHorizon;
  const risk = answers.riskTolerance;
  const goal = answers.mainGoal;
  const topTwoHoldings = portfolio.holdings.slice(0, 2);
  const topTwoSameSector =
    topTwoHoldings.length === 2 && topTwoHoldings[0].primarySector === topTwoHoldings[1].primarySector;
  const broadEtfPlusIndexedStocks =
    portfolio.holdings.some((holding) => holding.isBroadUsEtf) &&
    singleStockHoldings.filter((holding) => holding.primaryGeography === 'United States').length >= 2;

  if (largestHolding) {
    pushRule(
      rules,
      holdingCount === 1,
      createRule(
        'high',
        97,
        'Single holding concentration is very high',
        `Your portfolio has only one holding, so ${largestHolding.symbol} represents ${formatPercent(largestHolding.weight)} of the account.`,
        'Add at least a few diversified building blocks so one position is not responsible for nearly all of your outcome.'
      )
    );

    pushRule(
      rules,
      holdingCount >= 2 && holdingCount <= 3,
      createRule(
        'medium',
        74,
        'Portfolio breadth is still limited',
        `You currently hold only ${holdingCount} positions, which can leave the portfolio more exposed to company- or fund-specific surprises.`,
        'Broaden the mix with a core diversified ETF or a few complementary holdings so the portfolio is less dependent on a short list.'
      )
    );

    pushRule(
      rules,
      largestHolding.weight > 0.4,
      createRule(
        'high',
        94,
        'Largest holding is above 40%',
        `${largestHolding.symbol} makes up ${formatPercent(largestHolding.weight)} of the portfolio, which is a high concentration risk.`,
        `Trim ${largestHolding.symbol} gradually or build other positions around it until no single holding dominates the account.`
      )
    );

    pushRule(
      rules,
      largestHolding.weight > 0.25 && largestHolding.weight <= 0.4,
      createRule(
        'medium',
        82,
        'Largest holding is above 25%',
        `${largestHolding.symbol} represents ${formatPercent(largestHolding.weight)}, so one position is driving a lot of the outcome.`,
        'Consider redirecting new money toward underweight areas or trimming this position so outcomes are spread across more holdings.'
      )
    );

    pushRule(
      rules,
      largestHolding.weight > 0.15 && largestHolding.isSingleStock,
      createRule(
        'low/medium',
        65,
        'A single stock is over 15%',
        `${largestHolding.symbol} is an individual stock at ${formatPercent(largestHolding.weight)}, which can be a meaningful stock-specific bet.`,
        'Keep single-stock positions as satellites around a diversified core unless you intentionally want outsized company-specific risk.'
      )
    );
  }

  pushRule(
    rules,
    holdingCount > 30,
    createRule(
      'medium',
      68,
      'Portfolio may be spread across too many holdings',
      `You hold ${holdingCount} positions, which can make the portfolio harder to monitor and may dilute conviction without improving diversification much.`,
      'Consolidate overlapping positions into fewer core funds or your highest-conviction holdings so the portfolio is simpler to maintain.'
    )
  );

  pushRule(
    rules,
    holdingCount > 20 && holdingCount <= 30,
    createRule(
      'low/medium',
      56,
      'You may have more holdings than you need',
      `At ${holdingCount} holdings, the portfolio may already be diversified enough and could be getting harder to manage.`,
      'Review overlap and ask whether each position plays a distinct role before adding more names.'
    )
  );

  pushRule(
    rules,
    holdingCount <= 2 && holdingCount > 0 && singleStockCount === holdingCount,
    createRule(
      'high',
      92,
      'One or two single stocks create a fragile portfolio',
      'A portfolio built entirely from one or two individual stocks can swing sharply based on company-specific news.',
      'Add a broad market ETF first, then decide how much room you still want for single-stock ideas.'
    )
  );

  if (topGeography) {
    pushRule(
      rules,
      topGeography.weight > 0.8,
      createRule(
        'high',
        91,
        'Geography exposure is heavily concentrated',
        `${topGeography.name} accounts for ${formatPercent(topGeography.weight)} of the portfolio.`,
        'If that concentration is unintentional, add exposure to other regions through a broad international ETF or other geographic diversifiers.'
      )
    );

    pushRule(
      rules,
      topGeography.weight > 0.65 && topGeography.weight <= 0.8,
      createRule(
        'medium',
        78,
        'Geography exposure is somewhat concentrated',
        `${topGeography.name} is ${formatPercent(topGeography.weight)} of the portfolio, so regional diversification could improve.`,
        'Consider balancing the portfolio with exposure outside the dominant region if your goal is a broader all-market mix.'
      )
    );
  }

  if (topSector) {
    pushRule(
      rules,
      topSector.weight > 0.5 && topTwoSameSector,
      createRule(
        'high',
        89,
        'Your portfolio is heavily tied to one theme',
        `${topSector.name} is ${formatPercent(topSector.weight)} of the portfolio and your top two holdings are both in that same sector.`,
        'Reduce the theme concentration by adding other sectors or trimming the overlapping top holdings.'
      )
    );

    pushRule(
      rules,
      topSector.weight > 0.5,
      createRule(
        'high',
        88,
        'Sector exposure is above 50%',
        `${topSector.name} makes up ${formatPercent(topSector.weight)} of the portfolio, creating a high sector bet.`,
        'Add positions in other sectors or use a broader fund so one market theme does not dominate the whole portfolio.'
      )
    );

    pushRule(
      rules,
      topSector.weight > 0.35 && topSector.weight <= 0.5,
      createRule(
        'medium/high',
        76,
        'Sector exposure is above 35%',
        `${topSector.name} is ${formatPercent(topSector.weight)} of the portfolio, so returns may be driven by one part of the market.`,
        'Review whether this tilt is intentional. If not, redirect future purchases to underrepresented sectors.'
      )
    );
  }

  pushRule(
    rules,
    onlySingleStocks && !hasBroadEtf,
    createRule(
      'medium/high',
      79,
      'Portfolio relies only on single stocks',
      'All current holdings are individual stocks and there is no broad ETF anchor to spread risk across more companies.',
      'Use a broad ETF as the foundation and keep individual stocks as smaller satellite positions around that core.'
    )
  );

  pushRule(
    rules,
    broadEtfPlusIndexedStocks,
    createRule(
      'medium',
      72,
      'You may have redundant exposure',
      'You own a broad U.S. ETF and also multiple individual U.S. stocks that are likely already inside that index.',
      'Decide whether the single stocks are intentional overweights; otherwise, simplify by leaning more on the ETF or trimming the overlapping stock picks.'
    )
  );

  pushRule(
    rules,
    broadUsEtfCount >= 2,
    createRule(
      'useful',
      58,
      'You hold multiple broad U.S. ETFs',
      'Owning two or more broad U.S. equity ETFs can create overlap without adding much diversification.',
      'If the funds serve the same role, simplify into the one you prefer on cost, tax, or platform convenience.'
    )
  );

  pushRule(
    rules,
    allEquityBroadMarketCount >= 2,
    createRule(
      'useful',
      62,
      'Multiple all-equity broad market ETFs overlap',
      'Two or more all-equity broad market ETFs often duplicate the same underlying exposure.',
      'Keeping one main all-equity fund usually makes the portfolio easier to understand and maintain.'
    )
  );

  pushRule(
    rules,
    duplicateStrategies,
    createRule(
      'useful',
      55,
      'Strategy exposure appears duplicated',
      'Several holdings point to similar strategy buckets, so simplifying the lineup may make the portfolio easier to manage.',
      'Look for holdings that play nearly the same role and consider consolidating them.'
    )
  );

  pushRule(
    rules,
    equitiesWeight >= 0.995 && risk === 'low',
    createRule(
      'high',
      90,
      '100% equities looks too aggressive for a low-risk profile',
      `Your portfolio is effectively all equities, but your questionnaire says your risk tolerance is low.`,
      'Add stabilizers such as bonds or cash reserves so the portfolio better matches the amount of volatility you are comfortable with.'
    )
  );

  pushRule(
    rules,
    equitiesWeight >= 0.995 && risk === 'medium',
    createRule(
      'medium',
      72,
      '100% equities may be aggressive for a medium-risk profile',
      'An all-equity portfolio can still be suitable for some investors, but it is more aggressive than many medium-risk investors expect.',
      'Consider whether a modest bond or cash sleeve would help you stay invested during market drawdowns.'
    )
  );

  pushRule(
    rules,
    risk === 'low' && equitiesWeight > 0.8,
    createRule(
      'medium/high',
      85,
      'Allocation may not match a low-risk profile',
      `A low-risk questionnaire profile paired with ${formatPercent(equitiesWeight)} in equities looks more aggressive than expected.`,
      'Shift part of the portfolio toward bonds or cash-like holdings if preserving stability matters more than maximizing growth.'
    )
  );

  pushRule(
    rules,
    risk === 'high' && cashAndBondsWeight > 0.35,
    createRule(
      'medium/high',
      84,
      'Allocation may not match a high-risk profile',
      `A high-risk profile paired with ${formatPercent(cashAndBondsWeight)} in cash and bonds may be more conservative than intended.`,
      'If you truly want an aggressive long-term portfolio, decide whether part of the conservative sleeve should be redeployed into diversified equities.'
    )
  );

  pushRule(
    rules,
    horizon === 'less than 3 years' && equitiesWeight > 0.85,
    createRule(
      'high',
      90,
      'Short horizon with very high equity exposure',
      `With a horizon under 3 years, keeping ${formatPercent(equitiesWeight)} in equities can create unwanted volatility before the money is needed.`,
      'Move at least part of the portfolio into lower-volatility holdings so a market drop does not derail near-term plans.'
    )
  );

  pushRule(
    rules,
    horizon === 'less than 3 years' && equitiesWeight > 0.7 && equitiesWeight <= 0.85,
    createRule(
      'medium',
      74,
      'Short horizon still looks equity-heavy',
      `A portfolio with ${formatPercent(equitiesWeight)} in equities may be too volatile for money needed within 3 years.`,
      'Bring more of the near-term money into bonds or cash-like assets before the spending date gets closer.'
    )
  );

  pushRule(
    rules,
    horizon === '7+ years' && equitiesWeight < 0.4,
    createRule(
      'high',
      82,
      'Long horizon looks unusually conservative',
      `With a 7+ year horizon, only ${formatPercent(equitiesWeight)} in equities may leave growth potential on the table.`,
      'If this money is truly long-term, consider increasing diversified equity exposure gradually over time.'
    )
  );

  pushRule(
    rules,
    horizon === '7+ years' && equitiesWeight < 0.5 && equitiesWeight >= 0.4,
    createRule(
      'medium',
      70,
      'Long horizon may support more growth exposure',
      `At ${formatPercent(equitiesWeight)} in equities, the portfolio is on the conservative side for a 7+ year horizon.`,
      'You could direct some new contributions toward diversified equities if the goal is long-term growth.'
    )
  );

  pushRule(
    rules,
    goal === 'save for big purchase' && equitiesWeight > 0.65,
    createRule(
      'medium/high',
      83,
      'Big purchase goal may need a steadier mix',
      `Because the goal is a big purchase, having ${formatPercent(equitiesWeight)} in equities may expose the money to too much short-term market risk.`,
      'Match the portfolio to the purchase timeline by moving more of that goal money into lower-volatility assets.'
    )
  );

  pushRule(
    rules,
    age < 35 && horizon === '7+ years' && equitiesWeight < 0.6,
    createRule(
      'medium',
      71,
      'Long horizon may support more growth exposure',
      `At age ${age} with a 7+ year horizon, only ${formatPercent(equitiesWeight)} in equities may be more conservative than necessary.`,
      'If you are comfortable with market swings, you may want a somewhat higher allocation to diversified equities over time.'
    )
  );

  pushRule(
    rules,
    age < 30 && goal === 'grow your wealth long term' && risk === 'high' && cashAndBondsWeight > 0.4,
    createRule(
      'medium',
      75,
      'Aggressive profile still holds a lot in cash or bonds',
      `For a younger investor seeking long-term growth with high risk tolerance, ${formatPercent(cashAndBondsWeight)} in cash and bonds may slow the portfolio down.`,
      'If this matches your true comfort level, that is okay, but otherwise you may want to shift part of that conservative sleeve into diversified equities.'
    )
  );

  pushRule(
    rules,
    risk === 'high' && horizon === '7+ years' && cashWeight > 0.15,
    createRule(
      'medium/high',
      77,
      'Cash level is high for a long-term aggressive profile',
      `A high-risk investor with a 7+ year horizon currently has ${formatPercent(cashWeight)} in cash, which may be more than needed.`,
      'If the cash is not reserved for a near-term use, consider phasing it into the target portfolio over time.'
    )
  );

  pushRule(
    rules,
    risk === 'medium' && horizon === '7+ years' && cashWeight > 0.2,
    createRule(
      'medium',
      69,
      'Cash level is moderately high for a long-term balanced profile',
      `A medium-risk investor with a 7+ year horizon currently has ${formatPercent(cashWeight)} in cash.`,
      'If that cash is meant for long-term investing, a gradual deployment plan could help it start working harder.'
    )
  );

  pushRule(
    rules,
    cashWeight > 0.1 && monthlyContribution <= 0,
    createRule(
      'medium',
      73,
      'You are not actively building the portfolio',
      `You currently hold ${formatPercent(cashWeight)} in cash and have no monthly contribution entered.`,
      'Set up even a modest recurring contribution or create a schedule for putting that idle cash to work if the goal is still active.'
    )
  );

  pushRule(
    rules,
    monthlyContribution <= 0 &&
      currentCashAvailable > 0 &&
      (horizon === '7+ years' || goal === 'retirement' || goal === 'grow your wealth long term'),
    createRule(
      'medium',
      67,
      'No ongoing monthly contribution is set',
      'You have investable cash today, but no monthly contribution entered. For long-term goals, regular contributions usually matter a lot.',
      'Add a recurring monthly amount, even if small, so the portfolio continues to grow beyond the money already available today.'
    )
  );

  return rules.sort((left, right) => right.priorityScore - left.priorityScore);
}

function generatePositiveSignals(portfolio, questionnaire) {
  const positives = [];
  const equitiesWeight = getAllocationWeight(portfolio.assetClassTotals, 'equities');
  const cashWeight = getAllocationWeight(portfolio.assetClassTotals, 'cash');
  const topSector = portfolio.sectorTotals[0];
  const topGeography = portfolio.geographyTotals[0];
  const broadCoreCount = portfolio.holdings.filter(
    (holding) => holding.isBroadUsEtf || holding.isAllEquityBroadMarketEtf
  ).length;
  const monthlyContribution = Number(questionnaire?.monthlyAmount || 0);
  const horizon = questionnaire?.timeHorizon;

  if (broadCoreCount >= 1) {
    positives.push('You already have at least one broad ETF in the portfolio, which gives you a stronger diversification base.');
  }

  if (portfolio.holdings.length >= 4 && portfolio.holdings.length <= 20) {
    positives.push('Your number of holdings is in a range where the portfolio can still be diversified without becoming too difficult to follow.');
  }

  if (topSector && topSector.weight <= 0.35) {
    positives.push(`No single sector dominates the portfolio today, with ${topSector.name} as the largest at ${formatPercent(topSector.weight)}.`);
  }

  if (topGeography && topGeography.weight <= 0.65) {
    positives.push('Your geography mix is not overly tied to one region, which helps reduce regional concentration risk.');
  }

  if (monthlyContribution > 0) {
    positives.push(`You entered a monthly contribution of ${formatCurrency(monthlyContribution)}, which supports consistent long-term investing habits.`);
  }

  if (cashWeight > 0 && cashWeight <= 0.1) {
    positives.push(`Cash is a modest ${formatPercent(cashWeight)} of the portfolio, so most of the account is already invested rather than sitting idle.`);
  }

  if (horizon === '7+ years' && equitiesWeight >= 0.5) {
    positives.push('For a long-term horizon, you already have meaningful equity exposure, which supports long-run growth potential.');
  }

  return positives.slice(0, 4);
}

function computePortfolioHealth(rules) {
  const totalPenalty = rules.reduce((sum, rule) => {
    const severityPenalty = SEVERITY_PENALTIES[rule.severity] || 5;
    return sum + severityPenalty + Math.max(0, (rule.priorityScore - 50) / 15);
  }, 0);

  const score = Math.max(0, Math.min(100, Math.round(100 - totalPenalty)));
  const label =
    score >= 85 ? 'Strong' : score >= 70 ? 'Good' : score >= 55 ? 'Fair' : 'Needs attention';

  return { score, label };
}

function buildFitSummary(portfolio, questionnaire, rules, positives) {
  const topIssue = rules[0];
  const equitiesWeight = getAllocationWeight(portfolio.assetClassTotals, 'equities');
  const cashWeight = getAllocationWeight(portfolio.assetClassTotals, 'cash');
  const profile = `You described yourself as a ${questionnaire?.riskTolerance || 'balanced'}-risk investor in ${questionnaire?.country || 'your country'} with a ${questionnaire?.timeHorizon || 'long-term'} horizon and a goal of ${questionnaire?.mainGoal || 'building wealth'}.`;
  const allocation = `The portfolio currently sits at ${formatPercent(equitiesWeight)} equities and ${formatPercent(cashWeight)} cash.`;
  const focus = topIssue
    ? `That is why the analysis is focused most on ${topIssue.title.toLowerCase()}—it is the highest-priority mismatch between your holdings and the profile you entered.`
    : 'The current holdings do not trigger major rule-based concerns, so the feedback is mostly about maintaining good diversification habits.';
  const encouraging = positives.length
    ? `You also already have some helpful traits in place, such as ${positives[0].replace(/\.$/, '')}.`
    : 'There is room to build a stronger long-term foundation from here.';

  return `${profile} ${allocation} ${focus} ${encouraging}`;
}

function savePortfolio(analysis) {
  state.portfolio = analysis;
  try {
    window.localStorage.setItem('investAdvicePortfolio', JSON.stringify(analysis));
  } catch (error) {
    // Ignore storage failures in restricted environments.
  }
}

function renderBreakdownList(items) {
  return `
    <ul class="metric-list">
      ${items
        .map(
          (item) => `
            <li>
              <span>${item.name}</span>
              <span>${formatCurrency(item.value)} • ${formatPercent(item.weight)}</span>
            </li>
          `
        )
        .join('')}
    </ul>
  `;
}

function renderChart(items, chartClass) {
  return `
    <div class="chart-list">
      ${items
        .slice(0, 6)
        .map(
          (item) => `
            <div class="chart-row">
              <div class="chart-labels">
                <span>${item.name}</span>
                <span>${formatPercent(item.weight)}</span>
              </div>
              <div class="chart-track">
                <div class="chart-fill ${chartClass}" style="width: ${Math.max(item.weight * 100, 2)}%"></div>
              </div>
            </div>
          `
        )
        .join('')}
    </div>
  `;
}

function renderRules(rules) {
  if (!rules.length) {
    return `
      <div class="sub-card">
        <h4>Top advice priorities</h4>
        <p>No major rule-based issues were triggered. The portfolio appears reasonably aligned with the questionnaire inputs.</p>
      </div>
    `;
  }

  return `
    <div class="sub-card">
      <h4>Top advice priorities</h4>
      <div class="rule-list">
        ${rules
          .slice(0, 5)
          .map(
            (rule) => `
              <article class="rule-card">
                <div class="rule-meta">
                  <span class="severity ${SEVERITY_STYLES[rule.severity] || 'severity-medium'}">${rule.severity}</span>
                  <span>Priority ${rule.priorityScore}</span>
                </div>
                <h5>${rule.title}</h5>
                <p>${rule.detail}</p>
                <div class="next-step">
                  <strong>What to do next:</strong>
                  <p>${rule.recommendation}</p>
                </div>
              </article>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderPositiveSignals(positives) {
  return `
    <section class="sub-card">
      <h4>What you are doing well</h4>
      <ul class="metric-list">
        ${(positives.length ? positives : ['You have a starting portfolio in place, which is a good first step.'])
          .map(
            (item) => `
              <li>
                <span>${item}</span>
              </li>
            `
          )
          .join('')}
      </ul>
    </section>
  `;
}

function renderPortfolioAnalysis(analysis) {
  const topRules = analysis.rules.slice(0, Math.min(5, Math.max(3, analysis.rules.length)));

  analysisOutput.classList.remove('hidden');
  analysisOutput.innerHTML = `
    <div class="analysis-stack">
      <div class="sub-card overview-grid">
        <div>
          <h4>Portfolio health</h4>
          <strong class="headline-metric">${analysis.health.score}/100</strong>
          <p class="status-copy">${analysis.health.label}</p>
        </div>
        <div>
          <h4>Total portfolio value</h4>
          <strong class="headline-metric">${formatCurrency(analysis.totalValue)}</strong>
        </div>
        <div>
          <h4>Largest holding</h4>
          <strong class="headline-metric">${analysis.holdings[0].symbol} • ${formatPercent(analysis.holdings[0].weight)}</strong>
        </div>
      </div>

      <section class="sub-card">
        <h4>How this fits your input</h4>
        <p>${analysis.fitSummary}</p>
      </section>

      ${renderRules(topRules)}

      ${renderPositiveSignals(analysis.positives)}

      <div class="breakdown-grid">
        <section class="sub-card">
          <h4>Sector allocation chart</h4>
          ${renderChart(analysis.sectorTotals, 'chart-sector')}
        </section>
        <section class="sub-card">
          <h4>Geography allocation chart</h4>
          ${renderChart(analysis.geographyTotals, 'chart-geography')}
        </section>
      </div>

      <div class="breakdown-grid">
        <section class="sub-card">
          <h4>Asset class totals</h4>
          ${renderBreakdownList(analysis.assetClassTotals)}
        </section>
        <section class="sub-card">
          <h4>Geography totals</h4>
          ${renderBreakdownList(analysis.geographyTotals)}
        </section>
        <section class="sub-card">
          <h4>Sector totals</h4>
          ${renderBreakdownList(analysis.sectorTotals)}
        </section>
      </div>

      <section class="sub-card">
        <h4>Per-holding weights</h4>
        <ul class="metric-list">
          ${analysis.holdings
            .map(
              (holding) => `
                <li>
                  <span>${holding.symbol} (${titleCase(holding.metadata.type)} • ${holding.primarySector})</span>
                  <span>${formatCurrency(holding.amount)} • ${formatPercent(holding.weight)}</span>
                </li>
              `
            )
            .join('')}
        </ul>
      </section>
    </div>
  `;
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  state.login = Object.fromEntries(formData.entries());
  showScreen('questionnaire-screen');
});

questionnaireForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(questionnaireForm);
  state.questionnaire = Object.fromEntries(formData.entries());
  starterOutput.textContent = buildStarterPlanSummary(state.questionnaire);
  analysisOutput.classList.add('hidden');
  analysisOutput.innerHTML = '';
  showScreen('choice-screen');
});

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    if (target === 'starter-screen' && state.questionnaire) {
      starterOutput.textContent = buildStarterPlanSummary(state.questionnaire);
    }
    showScreen(target);
  });
});

analysisForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(analysisForm);
  const holdings = parseHoldings(String(formData.get('holdings') || ''));
  const invalidEntries = holdings.filter((holding) => !holding.symbol || Number.isNaN(holding.amount) || holding.amount <= 0);

  if (!holdings.length || invalidEntries.length) {
    analysisOutput.classList.remove('hidden');
    analysisOutput.innerHTML = `
      <strong>Please check your format.</strong>
      <p>Use one holding per line in the format <em>TICKER — 5000</em>, and for cash, just write format of <em>CASH — 5000</em>.</p>
    `;
    return;
  }

  const analysis = analyzePortfolio(holdings, state.questionnaire);
  savePortfolio(analysis);
  renderPortfolioAnalysis(analysis);
});
