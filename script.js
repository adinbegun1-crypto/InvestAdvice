const screens = [...document.querySelectorAll('.panel')];
const loginForm = document.getElementById('login-form');
const questionnaireForm = document.getElementById('questionnaire-form');
const analysisForm = document.getElementById('analysis-form');
const starterOutput = document.getElementById('starter-output');
const analysisOutput = document.getElementById('analysis-output');

const SEVERITY_WEIGHTS = {
  high: 15,
  'medium/high': 11,
  medium: 8,
  'low/medium': 5,
  useful: 2,
};

const SEVERITY_STYLES = {
  high: 'severity-high',
  'medium/high': 'severity-medium-high',
  medium: 'severity-medium',
  'low/medium': 'severity-low-medium',
  useful: 'severity-useful',
};

const PALETTE = ['#38bdf8', '#34d399', '#f59e0b', '#f472b6', '#818cf8', '#f87171', '#a3e635'];

const ETF_LIBRARY = [
  ['VOO', 'Vanguard S&P 500 ETF', 'us-large-cap-index', ['broad-us-etf', 'all-equity-broad-market', 'core'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Technology: 0.31, Financials: 0.13, Healthcare: 0.12, ConsumerDiscretionary: 0.1, CommunicationServices: 0.09, Industrials: 0.08, ConsumerStaples: 0.06, Energy: 0.04, Utilities: 0.03, Materials: 0.02, RealEstate: 0.02 }, ['VANGUARD S&P 500', 'S&P500', 'SP500']],
  ['SPY', 'SPDR S&P 500 ETF Trust', 'us-large-cap-index', ['broad-us-etf', 'all-equity-broad-market', 'core'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Technology: 0.31, Financials: 0.13, Healthcare: 0.12, ConsumerDiscretionary: 0.1, CommunicationServices: 0.09, Industrials: 0.08, ConsumerStaples: 0.06, Energy: 0.04, Utilities: 0.03, Materials: 0.02, RealEstate: 0.02 }],
  ['IVV', 'iShares Core S&P 500 ETF', 'us-large-cap-index', ['broad-us-etf', 'all-equity-broad-market', 'core'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Technology: 0.31, Financials: 0.13, Healthcare: 0.12, ConsumerDiscretionary: 0.1, CommunicationServices: 0.09, Industrials: 0.08, ConsumerStaples: 0.06, Energy: 0.04, Utilities: 0.03, Materials: 0.02, RealEstate: 0.02 }],
  ['VTI', 'Vanguard Total Stock Market ETF', 'us-total-market', ['broad-us-etf', 'all-equity-broad-market', 'core'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Technology: 0.29, Financials: 0.13, Healthcare: 0.11, ConsumerDiscretionary: 0.1, Industrials: 0.1, CommunicationServices: 0.08, ConsumerStaples: 0.06, Energy: 0.04, Utilities: 0.03, Materials: 0.03, RealEstate: 0.03 }],
  ['ITOT', 'iShares Core S&P Total U.S. Stock Market ETF', 'us-total-market', ['broad-us-etf', 'all-equity-broad-market', 'core'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Technology: 0.29, Financials: 0.13, Healthcare: 0.11, ConsumerDiscretionary: 0.1, Industrials: 0.1, CommunicationServices: 0.08, ConsumerStaples: 0.06, Energy: 0.04, Utilities: 0.03, Materials: 0.03, RealEstate: 0.03 }],
  ['SCHB', 'Schwab U.S. Broad Market ETF', 'us-total-market', ['broad-us-etf', 'all-equity-broad-market', 'core'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Technology: 0.29, Financials: 0.13, Healthcare: 0.11, ConsumerDiscretionary: 0.1, Industrials: 0.1, CommunicationServices: 0.08, ConsumerStaples: 0.06, Energy: 0.04, Utilities: 0.03, Materials: 0.03, RealEstate: 0.03 }],
  ['QQQ', 'Invesco QQQ Trust', 'nasdaq-growth', ['growth-etf'], { equities: 1 }, { 'United States': 0.95, International: 0.05 }, { Technology: 0.5, CommunicationServices: 0.16, ConsumerDiscretionary: 0.14, Healthcare: 0.06, Industrials: 0.05, ConsumerStaples: 0.03, Utilities: 0.02, Financials: 0.02, Materials: 0.01, Energy: 0.01 }],
  ['VGT', 'Vanguard Information Technology ETF', 'technology-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.98, International: 0.02 }, { Technology: 1 }],
  ['XLK', 'Technology Select Sector SPDR Fund', 'technology-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Technology: 1 }],
  ['XLF', 'Financial Select Sector SPDR Fund', 'financials-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Financials: 1 }],
  ['XLV', 'Health Care Select Sector SPDR Fund', 'healthcare-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Healthcare: 1 }],
  ['XLE', 'Energy Select Sector SPDR Fund', 'energy-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Energy: 1 }],
  ['XLI', 'Industrial Select Sector SPDR Fund', 'industrials-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Industrials: 1 }],
  ['XLP', 'Consumer Staples Select Sector SPDR Fund', 'consumer-staples-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { ConsumerStaples: 1 }],
  ['XLY', 'Consumer Discretionary Select Sector SPDR Fund', 'consumer-discretionary-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { ConsumerDiscretionary: 1 }],
  ['XLC', 'Communication Services Select Sector SPDR Fund', 'communication-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { CommunicationServices: 1 }],
  ['XLU', 'Utilities Select Sector SPDR Fund', 'utilities-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Utilities: 1 }],
  ['XLB', 'Materials Select Sector SPDR Fund', 'materials-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { Materials: 1 }],
  ['XLRE', 'Real Estate Select Sector SPDR Fund', 'real-estate-sector', ['sector-etf'], { equities: 1 }, { 'United States': 0.99, International: 0.01 }, { RealEstate: 1 }],
  ['VT', 'Vanguard Total World Stock ETF', 'global-total-market', ['all-equity-broad-market', 'core'], { equities: 1 }, { 'United States': 0.62, International: 0.38 }, { Technology: 0.24, Financials: 0.16, Industrials: 0.11, ConsumerDiscretionary: 0.1, Healthcare: 0.1, CommunicationServices: 0.08, ConsumerStaples: 0.07, Energy: 0.05, Materials: 0.04, Utilities: 0.03, RealEstate: 0.02 }],
  ['VXUS', 'Vanguard Total International Stock ETF', 'international-total-market', ['international-core'], { equities: 1 }, { International: 0.98, 'United States': 0.02 }, { Financials: 0.2, Industrials: 0.14, Technology: 0.13, ConsumerDiscretionary: 0.12, Healthcare: 0.09, Materials: 0.09, ConsumerStaples: 0.08, Energy: 0.06, CommunicationServices: 0.04, Utilities: 0.03, RealEstate: 0.02 }],
  ['VEA', 'Vanguard FTSE Developed Markets ETF', 'international-developed', ['international-core'], { equities: 1 }, { International: 0.97, 'United States': 0.03 }, { Financials: 0.2, Industrials: 0.16, Healthcare: 0.11, ConsumerDiscretionary: 0.11, Technology: 0.1, ConsumerStaples: 0.09, Materials: 0.08, Energy: 0.06, CommunicationServices: 0.04, Utilities: 0.03, RealEstate: 0.02 }],
  ['VWO', 'Vanguard FTSE Emerging Markets ETF', 'emerging-markets', ['international-core'], { equities: 1 }, { International: 0.99, 'United States': 0.01 }, { Technology: 0.24, Financials: 0.21, ConsumerDiscretionary: 0.14, CommunicationServices: 0.1, Industrials: 0.08, Materials: 0.07, ConsumerStaples: 0.06, Energy: 0.05, Healthcare: 0.04, Utilities: 0.01 }],
  ['BND', 'Vanguard Total Bond Market ETF', 'core-bonds', ['bond-core'], { bonds: 1 }, { 'United States': 0.9, International: 0.1 }, { Bonds: 1 }],
  ['AGG', 'iShares Core U.S. Aggregate Bond ETF', 'core-bonds', ['bond-core'], { bonds: 1 }, { 'United States': 0.9, International: 0.1 }, { Bonds: 1 }],
  ['BNDX', 'Vanguard Total International Bond ETF', 'international-bonds', ['bond-core'], { bonds: 1 }, { International: 0.98, 'United States': 0.02 }, { Bonds: 1 }],
  ['SCHD', 'Schwab U.S. Dividend Equity ETF', 'us-dividend-equity', ['dividend'], { equities: 1 }, { 'United States': 0.97, International: 0.03 }, { Financials: 0.19, Healthcare: 0.16, Technology: 0.14, Industrials: 0.13, ConsumerStaples: 0.11, Energy: 0.09, ConsumerDiscretionary: 0.07, CommunicationServices: 0.04, Utilities: 0.03, Materials: 0.02, RealEstate: 0.02 }],
  ['DGRO', 'iShares Core Dividend Growth ETF', 'dividend-growth', ['dividend'], { equities: 1 }, { 'United States': 0.96, International: 0.04 }, { Technology: 0.2, Financials: 0.17, Healthcare: 0.15, Industrials: 0.12, ConsumerStaples: 0.09, ConsumerDiscretionary: 0.09, Energy: 0.07, CommunicationServices: 0.05, Utilities: 0.03, Materials: 0.02, RealEstate: 0.01 }],
  ['VYM', 'Vanguard High Dividend Yield ETF', 'dividend-income', ['dividend'], { equities: 1 }, { 'United States': 0.95, International: 0.05 }, { Financials: 0.19, Healthcare: 0.14, ConsumerStaples: 0.13, Industrials: 0.13, Technology: 0.12, Energy: 0.08, Utilities: 0.06, ConsumerDiscretionary: 0.06, CommunicationServices: 0.05, Materials: 0.02, RealEstate: 0.02 }],
  ['VNQ', 'Vanguard Real Estate ETF', 'reit', ['real-estate'], { realEstate: 1 }, { 'United States': 0.97, International: 0.03 }, { RealEstate: 1 }],
  ['GLD', 'SPDR Gold Shares', 'gold', ['commodity'], { alternatives: 1 }, { International: 0.6, 'United States': 0.4 }, { Commodities: 1 }],
  ['IAU', 'iShares Gold Trust', 'gold', ['commodity'], { alternatives: 1 }, { International: 0.6, 'United States': 0.4 }, { Commodities: 1 }],
  ['TIP', 'iShares TIPS Bond ETF', 'inflation-protected-bonds', ['bond-core'], { bonds: 1 }, { 'United States': 1 }, { Bonds: 1 }],
  ['CASH', 'Cash', 'cash', ['cash-equivalent'], { cash: 1 }, { 'United States': 1 }, { Cash: 1 }, ['USD', 'MONEY MARKET', 'CASH RESERVE']],
];

const STOCK_LIBRARY = [
  ['AAPL', 'Apple', 'Technology', 'United States', ['APPLE INC']],
  ['MSFT', 'Microsoft', 'Technology', 'United States'],
  ['NVDA', 'NVIDIA', 'Technology', 'United States'],
  ['GOOGL', 'Alphabet Class A', 'CommunicationServices', 'United States', ['GOOG', 'ALPHABET']],
  ['AMZN', 'Amazon', 'ConsumerDiscretionary', 'United States'],
  ['META', 'Meta Platforms', 'CommunicationServices', 'United States', ['FACEBOOK']],
  ['TSLA', 'Tesla', 'ConsumerDiscretionary', 'United States'],
  ['BRK.B', 'Berkshire Hathaway Class B', 'Financials', 'United States', ['BRKB', 'BRK-B', 'BERKSHIRE']],
  ['JPM', 'JPMorgan Chase', 'Financials', 'United States'],
  ['BAC', 'Bank of America', 'Financials', 'United States'],
  ['WFC', 'Wells Fargo', 'Financials', 'United States'],
  ['V', 'Visa', 'Financials', 'United States'],
  ['MA', 'Mastercard', 'Financials', 'United States'],
  ['GS', 'Goldman Sachs', 'Financials', 'United States'],
  ['JNJ', 'Johnson & Johnson', 'Healthcare', 'United States'],
  ['UNH', 'UnitedHealth Group', 'Healthcare', 'United States'],
  ['PFE', 'Pfizer', 'Healthcare', 'United States'],
  ['LLY', 'Eli Lilly', 'Healthcare', 'United States'],
  ['MRK', 'Merck', 'Healthcare', 'United States'],
  ['ABBV', 'AbbVie', 'Healthcare', 'United States'],
  ['XOM', 'Exxon Mobil', 'Energy', 'United States'],
  ['CVX', 'Chevron', 'Energy', 'United States'],
  ['COP', 'ConocoPhillips', 'Energy', 'United States'],
  ['SLB', 'Schlumberger', 'Energy', 'United States'],
  ['KO', 'Coca-Cola', 'ConsumerStaples', 'United States'],
  ['PEP', 'PepsiCo', 'ConsumerStaples', 'United States'],
  ['PG', 'Procter & Gamble', 'ConsumerStaples', 'United States'],
  ['WMT', 'Walmart', 'ConsumerStaples', 'United States'],
  ['COST', 'Costco', 'ConsumerStaples', 'United States'],
  ['HD', 'Home Depot', 'ConsumerDiscretionary', 'United States'],
  ['MCD', 'McDonald\'s', 'ConsumerDiscretionary', 'United States'],
  ['NKE', 'Nike', 'ConsumerDiscretionary', 'United States'],
  ['SBUX', 'Starbucks', 'ConsumerDiscretionary', 'United States'],
  ['DIS', 'Walt Disney', 'CommunicationServices', 'United States'],
  ['NFLX', 'Netflix', 'CommunicationServices', 'United States'],
  ['T', 'AT&T', 'CommunicationServices', 'United States'],
  ['VZ', 'Verizon', 'CommunicationServices', 'United States'],
  ['CSCO', 'Cisco', 'Technology', 'United States'],
  ['ORCL', 'Oracle', 'Technology', 'United States'],
  ['CRM', 'Salesforce', 'Technology', 'United States'],
  ['ADBE', 'Adobe', 'Technology', 'United States'],
  ['INTC', 'Intel', 'Technology', 'United States'],
  ['AMD', 'Advanced Micro Devices', 'Technology', 'United States'],
  ['QCOM', 'Qualcomm', 'Technology', 'United States'],
  ['AVGO', 'Broadcom', 'Technology', 'United States'],
  ['IBM', 'IBM', 'Technology', 'United States'],
  ['TXN', 'Texas Instruments', 'Technology', 'United States'],
  ['CAT', 'Caterpillar', 'Industrials', 'United States'],
  ['GE', 'GE Aerospace', 'Industrials', 'United States'],
  ['HON', 'Honeywell', 'Industrials', 'United States'],
  ['UPS', 'United Parcel Service', 'Industrials', 'United States'],
  ['UNP', 'Union Pacific', 'Industrials', 'United States'],
  ['LMT', 'Lockheed Martin', 'Industrials', 'United States'],
  ['BA', 'Boeing', 'Industrials', 'United States'],
  ['DE', 'Deere', 'Industrials', 'United States'],
  ['NEE', 'NextEra Energy', 'Utilities', 'United States'],
  ['DUK', 'Duke Energy', 'Utilities', 'United States'],
  ['SO', 'Southern Company', 'Utilities', 'United States'],
  ['PLD', 'Prologis', 'RealEstate', 'United States'],
  ['AMT', 'American Tower', 'RealEstate', 'United States'],
  ['O', 'Realty Income', 'RealEstate', 'United States'],
  ['SPG', 'Simon Property Group', 'RealEstate', 'United States'],
  ['LIN', 'Linde', 'Materials', 'United States'],
  ['APD', 'Air Products and Chemicals', 'Materials', 'United States'],
  ['NEM', 'Newmont', 'Materials', 'United States'],
  ['RIO', 'Rio Tinto', 'Materials', 'International'],
  ['BABA', 'Alibaba', 'ConsumerDiscretionary', 'International'],
  ['TSM', 'Taiwan Semiconductor', 'Technology', 'International'],
  ['ASML', 'ASML Holding', 'Technology', 'International'],
  ['SAP', 'SAP', 'Technology', 'International'],
  ['SONY', 'Sony Group', 'ConsumerDiscretionary', 'International'],
  ['TM', 'Toyota Motor', 'ConsumerDiscretionary', 'International'],
  ['NVO', 'Novo Nordisk', 'Healthcare', 'International'],
  ['UL', 'Unilever', 'ConsumerStaples', 'International'],
  ['BP', 'BP', 'Energy', 'International'],
  ['SHEL', 'Shell', 'Energy', 'International'],
  ['SHOP', 'Shopify', 'Technology', 'International'],
  ['SQ', 'Block', 'Financials', 'United States', ['BLOCK']],
  ['PYPL', 'PayPal', 'Financials', 'United States'],
  ['ROKU', 'Roku', 'CommunicationServices', 'United States'],
  ['UBER', 'Uber', 'Industrials', 'United States'],
  ['SNOW', 'Snowflake', 'Technology', 'United States'],
  ['PANW', 'Palo Alto Networks', 'Technology', 'United States'],
  ['CRWD', 'CrowdStrike', 'Technology', 'United States'],
  ['MELI', 'MercadoLibre', 'ConsumerDiscretionary', 'International'],
  ['SE', 'Sea Limited', 'CommunicationServices', 'International'],
];

function toTitleLabel(value) {
  return String(value || '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\bEtf\b/g, 'ETF')
    .replace(/\bUs\b/g, 'U.S.')
    .trim();
}

function normalizeLookupKey(value) {
  return String(value || '')
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[.\-_/]/g, '');
}

function buildMetadataIndexes() {
  const exact = {};
  const normalized = {};

  ETF_LIBRARY.forEach(([symbol, name, strategyGroup, tags, assetClass, geography, sector, aliases = []]) => {
    const entry = {
      symbol,
      name,
      type: symbol === 'CASH' ? 'cash' : 'etf',
      category: tags.includes('sector-etf') ? 'sector ETF' : tags.includes('bond-core') ? 'bond ETF' : tags.includes('cash-equivalent') ? 'cash' : 'ETF',
      strategyGroup,
      tags,
      assetClass,
      geography,
      sector,
      aliases,
      indexedExposure: tags.includes('broad-us-etf') || tags.includes('all-equity-broad-market'),
    };

    exact[symbol] = entry;
    [symbol, name, ...aliases].forEach((alias) => {
      normalized[normalizeLookupKey(alias)] = entry;
    });
  });

  STOCK_LIBRARY.forEach(([symbol, name, sector, geography, aliases = []]) => {
    const entry = {
      symbol,
      name,
      type: 'stock',
      category: 'single stock',
      strategyGroup: `single-stock-${normalizeLookupKey(symbol)}`,
      tags: ['single-stock'],
      assetClass: { equities: 1 },
      geography: { [geography]: 1 },
      sector: { [sector]: 1 },
      aliases,
      indexedExposure: geography === 'United States',
    };

    exact[symbol] = entry;
    [symbol, name, ...aliases].forEach((alias) => {
      normalized[normalizeLookupKey(alias)] = entry;
    });
  });

  return { exact, normalized };
}

const SECURITY_INDEXES = buildMetadataIndexes();

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
  }).format(Number(value || 0));
}

function formatPercent(value) {
  return `${(Number(value || 0) * 100).toFixed(1)}%`;
}

function buildStarterPlanSummary(answers) {
  const cash = Number(answers.currentCash || 0);
  const monthly = Number(answers.monthlyAmount || 0);
  const experienceDetail =
    answers.experience === 'beginner'
      ? 'You are early in your investing journey, so a simple diversified foundation and repeatable habits matter more than trying to outsmart the market.'
      : answers.experience === 'some experience'
        ? 'You already have some experience, which means you can build a more intentional plan while still keeping it easy to maintain.'
        : 'You have advanced experience, so the best plan is likely one that stays disciplined while still reflecting your convictions.';

  const riskDetail =
    answers.riskTolerance === 'low'
      ? 'A lower risk profile usually fits better with steadier holdings and clear downside protection.'
      : answers.riskTolerance === 'medium'
        ? 'A medium risk profile usually works best with a balanced mix of growth assets and stabilizers.'
        : 'A high risk profile gives you room to own more growth assets if they truly match your time horizon and comfort level.';

  return `At age ${answers.age} in ${answers.country}, you are investing for ${answers.mainGoal} over a ${answers.timeHorizon} horizon. ${experienceDetail} ${riskDetail} With ${formatCurrency(monthly)} available to invest monthly and ${formatCurrency(cash)} available today, your starter plan should emphasize broad diversification, a simple core lineup, and a steady contribution habit so your plan stays aligned with your biggest concern: ${answers.worry}.`;
}

function parseHoldings(holdingsText) {
  return String(holdingsText || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(.+?)\s*[—-]\s*([\$\d,.]+)$/);
      if (!match) {
        return { raw: line, symbol: '', amount: Number.NaN };
      }

      return {
        raw: line,
        symbol: match[1].trim().toUpperCase(),
        amount: Number(match[2].replace(/[\$,]/g, '').trim()),
      };
    });
}

function resolveSecurity(symbol, questionnaire = {}) {
  const exactSymbol = String(symbol || '').trim().toUpperCase();
  const normalizedSymbol = normalizeLookupKey(exactSymbol);

  if (SECURITY_INDEXES.exact[exactSymbol]) {
    return {
      ...SECURITY_INDEXES.exact[exactSymbol],
      matchLevel: 'exact',
      inputSymbol: exactSymbol,
    };
  }

  if (SECURITY_INDEXES.normalized[normalizedSymbol]) {
    return {
      ...SECURITY_INDEXES.normalized[normalizedSymbol],
      matchLevel: 'normalized',
      inputSymbol: exactSymbol,
    };
  }

  const assumedGeography = /UNITED STATES|USA|US/i.test(questionnaire.country || '') ? 'United States' : 'International';
  const looksLikeFund = /(ETF|FUND)$/i.test(exactSymbol) || exactSymbol.length > 5;

  return {
    symbol: exactSymbol || 'UNKNOWN',
    name: exactSymbol || 'Unknown security',
    type: looksLikeFund ? 'etf' : 'stock',
    category: looksLikeFund ? 'unclassified fund' : 'unclassified stock',
    strategyGroup: `fallback-${normalizedSymbol || 'unknown'}`,
    tags: ['fallback-classification'],
    assetClass: looksLikeFund ? { equities: 1 } : { equities: 1 },
    geography: { [assumedGeography]: 1 },
    sector: { Unknown: 1 },
    aliases: [],
    indexedExposure: looksLikeFund,
    matchLevel: 'fallback',
    inputSymbol: exactSymbol,
  };
}

function accumulateWeightedBreakdown(target, weights, value) {
  Object.entries(weights || {}).forEach(([key, weight]) => {
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
    .sort((a, b) => b.value - a.value);
}

function getAllocationWeight(items, name) {
  return items.find((item) => item.name === name)?.weight || 0;
}

function primaryBucket(items) {
  return items[0]?.name || 'Unknown';
}

function classifyArchetype(summary, groupedThemes, questionnaire) {
  const dominantTheme = groupedThemes[0]?.theme || 'balanced';
  const equitiesWeight = getAllocationWeight(summary.assetClassTotals, 'equities');
  const broadEtfCount = summary.holdings.filter((holding) => holding.metadata.tags.includes('broad-us-etf') || holding.metadata.tags.includes('all-equity-broad-market')).length;
  const stockOnly = summary.holdings.every((holding) => holding.metadata.type === 'stock');
  const cashAndBondsWeight = getAllocationWeight(summary.assetClassTotals, 'cash') + getAllocationWeight(summary.assetClassTotals, 'bonds');
  const topSector = summary.sectorTotals[0];

  if (dominantTheme === 'concentration' && topSector?.name === 'Technology') {
    return {
      key: 'concentrated-tech-portfolio',
      label: 'Concentrated tech portfolio',
      diagnosis: 'This looks like a growth-oriented portfolio that is leaning too heavily on a small set of tech-driven positions.',
    };
  }

  if (dominantTheme === 'overlap') {
    return {
      key: 'redundant-etf-stack',
      label: 'Redundant ETF stack',
      diagnosis: 'The portfolio has diversification on paper, but too many holdings appear to play nearly the same role.',
    };
  }

  if (dominantTheme === 'deployment') {
    return {
      key: 'underinvested-long-term-investor',
      label: 'Underinvested long-term investor',
      diagnosis: 'The main issue is not taking enough risk or not putting enough money to work for the long term profile you entered.',
    };
  }

  if (stockOnly && summary.holdings.length <= 5) {
    return {
      key: 'beginner-stock-picker',
      label: 'Beginner stock picker',
      diagnosis: 'This portfolio is built more like a small stock-picking basket than a complete long-term allocation.',
    };
  }

  if (broadEtfCount >= 2 && equitiesWeight >= 0.7 && cashAndBondsWeight <= 0.3 && groupedThemes.length <= 1) {
    return {
      key: 'balanced-etf-portfolio',
      label: 'Balanced ETF portfolio',
      diagnosis: 'This looks like a mostly diversified ETF portfolio with only a limited number of issues to clean up.',
    };
  }

  if (dominantTheme === 'risk-mismatch') {
    return {
      key: 'risk-misaligned-portfolio',
      label: 'Risk-misaligned portfolio',
      diagnosis: 'The biggest issue is that the portfolio mix does not fully line up with the risk level and time horizon you entered.',
    };
  }

  return {
    key: 'mixed-portfolio',
    label: 'Mixed portfolio',
    diagnosis: 'This portfolio has a workable starting point, but one or two structural issues stand out more than the rest.',
  };
}

function createRule(theme, severity, priorityScore, title, detail, recommendation) {
  return { theme, severity, priorityScore, title, detail, recommendation };
}

function pushRule(rules, condition, rule) {
  if (condition) {
    rules.push(rule);
  }
}

function groupRules(rules) {
  const grouped = {};
  rules.forEach((rule) => {
    if (!grouped[rule.theme]) {
      grouped[rule.theme] = { theme: rule.theme, priorityScore: 0, rules: [] };
    }
    grouped[rule.theme].rules.push(rule);
    grouped[rule.theme].priorityScore = Math.max(grouped[rule.theme].priorityScore, rule.priorityScore);
  });

  return Object.values(grouped)
    .map((group) => ({
      ...group,
      avgPriority: Math.round(group.rules.reduce((sum, rule) => sum + rule.priorityScore, 0) / group.rules.length),
      headline: group.rules[0]?.title || 'Theme',
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore);
}

function generatePositiveSignals(summary, questionnaire) {
  const positives = [];
  const equitiesWeight = getAllocationWeight(summary.assetClassTotals, 'equities');
  const cashWeight = getAllocationWeight(summary.assetClassTotals, 'cash');
  const topSector = summary.sectorTotals[0];
  const topGeography = summary.geographyTotals[0];
  const broadCoreCount = summary.holdings.filter((holding) => holding.metadata.tags.includes('broad-us-etf') || holding.metadata.tags.includes('all-equity-broad-market')).length;
  const matchedKnown = summary.matchStats.exact + summary.matchStats.normalized;
  const monthlyContribution = Number(questionnaire?.monthlyAmount || 0);

  if (broadCoreCount >= 1) {
    positives.push('You already have at least one broad ETF that can serve as a solid core holding.');
  }

  if (summary.holdings.length >= 4 && summary.holdings.length <= 20) {
    positives.push('Your number of holdings is still manageable, which makes the portfolio easier to monitor and improve.');
  }

  if (topSector && topSector.weight <= 0.35) {
    positives.push(`No single sector dominates the portfolio, with ${toTitleLabel(topSector.name)} as the largest at ${formatPercent(topSector.weight)}.`);
  }

  if (topGeography && topGeography.weight <= 0.65) {
    positives.push('Your geography mix is not overly tied to one region, which helps reduce country-specific risk.');
  }

  if (monthlyContribution > 0) {
    positives.push(`You entered ${formatCurrency(monthlyContribution)} as a monthly contribution, which is a strong long-term habit.`);
  }

  if (cashWeight > 0 && cashWeight <= 0.1) {
    positives.push(`Only ${formatPercent(cashWeight)} of the portfolio is in cash, so most of the account is already invested.`);
  }

  if (matchedKnown === summary.holdings.length) {
    positives.push('Every holding matched the metadata library cleanly, so the portfolio read is based on known sector and geography data.');
  }

  return positives.slice(0, 4);
}

function buildActionLibrary(archetypeKey) {
  const common = {
    concentration: 'Reduce the largest positions gradually or direct new money toward underweight parts of the portfolio until no single name or theme dominates.',
    diversification: 'Use one or two broad ETFs as the foundation so the portfolio depends less on a small set of companies or sectors.',
    overlap: 'Simplify overlapping funds and keep only the holdings that serve a distinct role in the allocation.',
    'risk-mismatch': 'Rebalance the mix of equities, bonds, and cash so the portfolio better matches your risk tolerance and time horizon.',
    deployment: 'Create a simple contribution and deployment plan so idle cash starts working toward your goal instead of staying on the sidelines.',
  };

  const archetypeTweaks = {
    'concentrated-tech-portfolio': {
      concentration: 'Trim the biggest tech positions or pause new buys there and redirect fresh money to broad market, healthcare, industrial, or international exposure.',
      overlap: 'If you already own tech-heavy ETFs, decide whether the individual tech stocks are true intentional overweights or unnecessary duplication.',
    },
    'beginner-stock-picker': {
      diversification: 'Add a broad market ETF first so your success is not tied to just a handful of stock picks.',
      deployment: 'Keep stock picking as a smaller satellite sleeve and let recurring contributions build the diversified core automatically.',
    },
    'redundant-etf-stack': {
      overlap: 'Choose one main U.S. equity ETF, one international fund if needed, and one bond fund if needed, instead of stacking near-duplicates.',
    },
    'underinvested-long-term-investor': {
      deployment: 'Set up a recurring monthly contribution and phase excess cash into diversified equities over several purchases if that helps with timing anxiety.',
      'risk-mismatch': 'For a long horizon, consider whether the conservative allocation is protecting you or simply holding back growth.',
    },
    'balanced-etf-portfolio': {
      overlap: 'Only simplify if two funds are clearly duplicating each other; otherwise the current structure may already be working reasonably well.',
    },
  };

  return { ...common, ...(archetypeTweaks[archetypeKey] || {}) };
}

function buildNarrative(summary, questionnaire, groupedThemes, positives, archetype) {
  const primaryTheme = groupedThemes[0];
  const secondaryTheme = groupedThemes[1];
  const equitiesWeight = getAllocationWeight(summary.assetClassTotals, 'equities');
  const cashWeight = getAllocationWeight(summary.assetClassTotals, 'cash');
  const topHolding = summary.holdings[0];
  const topSector = summary.sectorTotals[0];
  const actions = buildActionLibrary(archetype.key);
  const topThemes = groupedThemes.slice(0, 3);

  const primaryIssue = primaryTheme
    ? `${toTitleLabel(primaryTheme.theme)} is the main issue because ${primaryTheme.rules[0].detail}`
    : 'No major risk theme stands out from the current rule set.';

  const secondaryIssue = secondaryTheme
    ? `${toTitleLabel(secondaryTheme.theme)} also matters here because ${secondaryTheme.rules[0].detail}`
    : `The current mix is ${formatPercent(equitiesWeight)} equities and ${formatPercent(cashWeight)} cash, so the portfolio does not show a strong secondary problem.`;

  const whatFits = `You told us you are ${questionnaire?.riskTolerance || 'medium'} risk, investing for ${questionnaire?.mainGoal || 'long-term growth'}, with a ${questionnaire?.timeHorizon || 'long-term'} horizon. That context matters because the portfolio is currently led by ${topHolding ? `${topHolding.symbol} at ${formatPercent(topHolding.weight)}` : 'its current top position'} and the biggest sector is ${topSector ? `${toTitleLabel(topSector.name)} at ${formatPercent(topSector.weight)}` : 'unclear'}, so the advice is focused on what most affects that profile.`;

  const whatWorking = positives.length
    ? positives[0]
    : 'The positive starting point is that you already have a live portfolio to improve, which is better than starting from zero.';

  const actionSteps = topThemes.length
    ? topThemes.map((theme, index) => ({
        title: `Priority ${index + 1}: ${toTitleLabel(theme.theme)}`,
        detail: actions[theme.theme] || theme.rules[0].recommendation,
      }))
    : [
        {
          title: 'Priority 1: Stay consistent',
          detail: 'Keep contributing regularly and review the portfolio only when your goals or risk tolerance change.',
        },
      ];

  return {
    diagnosis: archetype.diagnosis,
    archetypeLabel: archetype.label,
    primaryIssue,
    secondaryIssue,
    fit: whatFits,
    whatWorking,
    actionSteps,
  };
}

function computePortfolioHealth(groupedThemes, positives) {
  const topPenalty = groupedThemes.slice(0, 5).reduce((sum, theme) => {
    const themePenalty = theme.rules.reduce((acc, rule) => acc + (SEVERITY_WEIGHTS[rule.severity] || 4), 0);
    return sum + Math.min(24, themePenalty + Math.round((theme.priorityScore - 50) / 8));
  }, 0);

  const positiveOffset = Math.min(12, positives.length * 3);
  const score = Math.max(0, Math.min(100, Math.round(100 - topPenalty + positiveOffset)));
  const label = score >= 85 ? 'Strong' : score >= 70 ? 'Good' : score >= 55 ? 'Fair' : 'Needs attention';
  return { score, label };
}

function generateRules(summary, questionnaire) {
  const rules = [];
  const age = Number(questionnaire?.age || 0);
  const monthlyContribution = Number(questionnaire?.monthlyAmount || 0);
  const currentCashAvailable = Number(questionnaire?.currentCash || 0);
  const largestHolding = summary.holdings[0];
  const topGeography = summary.geographyTotals[0];
  const topSector = summary.sectorTotals[0];
  const equitiesWeight = getAllocationWeight(summary.assetClassTotals, 'equities');
  const bondsWeight = getAllocationWeight(summary.assetClassTotals, 'bonds');
  const cashWeight = getAllocationWeight(summary.assetClassTotals, 'cash');
  const cashAndBondsWeight = cashWeight + bondsWeight;
  const holdingCount = summary.holdings.length;
  const broadUsEtfCount = summary.holdings.filter((holding) => holding.metadata.tags.includes('broad-us-etf')).length;
  const allEquityBroadMarketCount = summary.holdings.filter((holding) => holding.metadata.tags.includes('all-equity-broad-market')).length;
  const singleStockHoldings = summary.holdings.filter((holding) => holding.metadata.type === 'stock');
  const singleStockCount = singleStockHoldings.length;
  const onlySingleStocks = singleStockCount === holdingCount;
  const hasBroadEtf = summary.holdings.some((holding) => holding.metadata.tags.includes('broad-us-etf') || holding.metadata.tags.includes('all-equity-broad-market'));
  const duplicateStrategies = summary.strategyExposure.filter((item) => item.weight >= 0.2).length >= 2;
  const topTwoHoldings = summary.holdings.slice(0, 2);
  const topTwoSameSector = topTwoHoldings.length === 2 && topTwoHoldings[0].primarySector === topTwoHoldings[1].primarySector;
  const broadEtfPlusIndexedStocks = hasBroadEtf && singleStockHoldings.filter((holding) => holding.metadata.indexedExposure).length >= 2;
  const fallbackCount = summary.matchStats.fallback;
  const horizon = questionnaire?.timeHorizon;
  const risk = questionnaire?.riskTolerance;
  const goal = questionnaire?.mainGoal;

  if (largestHolding) {
    pushRule(rules, holdingCount === 1, createRule('concentration', 'high', 98, 'Single holding concentration is very high', `your portfolio has only one holding, so ${largestHolding.symbol} represents ${formatPercent(largestHolding.weight)} of the account.`, 'Add at least a few diversified building blocks so one holding does not determine nearly all of your outcome.'));
    pushRule(rules, holdingCount >= 2 && holdingCount <= 3, createRule('diversification', 'medium', 76, 'Portfolio breadth is limited', `you currently hold only ${holdingCount} positions, which leaves the portfolio exposed to company-specific surprises.`, 'Broaden the core with a diversified ETF or a few clearly different holdings.'));
    pushRule(rules, largestHolding.weight > 0.4, createRule('concentration', 'high', 94, 'Largest holding is above 40%', `${largestHolding.symbol} makes up ${formatPercent(largestHolding.weight)} of the portfolio, which is a high concentration risk.`, `Trim ${largestHolding.symbol} gradually or let other holdings catch up through new contributions.`));
    pushRule(rules, largestHolding.weight > 0.25 && largestHolding.weight <= 0.4, createRule('concentration', 'medium', 84, 'Largest holding is above 25%', `${largestHolding.symbol} represents ${formatPercent(largestHolding.weight)}, so one position is driving a lot of the outcome.`, 'Redirect new money toward other exposures so the portfolio becomes less dependent on one holding.'));
    pushRule(rules, largestHolding.weight > 0.15 && largestHolding.metadata.type === 'stock', createRule('concentration', 'low/medium', 67, 'A single stock is above 15%', `${largestHolding.symbol} is an individual stock at ${formatPercent(largestHolding.weight)}, which is a meaningful company-specific bet.`, 'Keep individual stocks as satellites around a diversified core unless this overweight is very intentional.'));
  }

  pushRule(rules, holdingCount > 30, createRule('overlap', 'medium', 68, 'Portfolio may be too crowded', `you hold ${holdingCount} positions, which can make the portfolio harder to monitor and may indicate overlapping ideas.`, 'Consolidate overlapping positions into fewer core holdings with clear jobs.'));
  pushRule(rules, holdingCount > 20 && holdingCount <= 30, createRule('overlap', 'low/medium', 56, 'You may have more holdings than you need', `at ${holdingCount} holdings, diversification may already be sufficient and complexity may be rising.`, 'Review whether each position adds something unique before adding more names.'));
  pushRule(rules, holdingCount <= 2 && holdingCount > 0 && singleStockCount === holdingCount, createRule('diversification', 'high', 92, 'One or two single stocks create a fragile portfolio', 'a portfolio built entirely from one or two individual stocks can swing sharply based on company-specific news.', 'Add a broad market ETF first, then decide how much room remains for stock ideas.'));
  pushRule(rules, onlySingleStocks && !hasBroadEtf, createRule('diversification', 'medium/high', 80, 'Portfolio relies only on single stocks', 'all current holdings are individual stocks and there is no broad ETF anchor to spread risk across more companies.', 'Use a broad ETF as the foundation and keep stock picks as a smaller sleeve.'));

  if (topGeography) {
    pushRule(rules, topGeography.weight > 0.8, createRule('diversification', 'high', 90, 'Geography exposure is heavily concentrated', `${topGeography.name} accounts for ${formatPercent(topGeography.weight)} of the portfolio.`, 'Add exposure to other regions if you want a broader all-market mix rather than a one-country bet.'));
    pushRule(rules, topGeography.weight > 0.65 && topGeography.weight <= 0.8, createRule('diversification', 'medium', 78, 'Geography exposure is somewhat concentrated', `${topGeography.name} is ${formatPercent(topGeography.weight)} of the portfolio, so regional diversification could improve.`, 'Consider adding a broad international fund or other geographic diversifier.'));
  }

  if (topSector) {
    pushRule(rules, topSector.weight > 0.5 && topTwoSameSector, createRule('concentration', 'high', 89, 'Your portfolio is heavily tied to one theme', `${toTitleLabel(topSector.name)} is ${formatPercent(topSector.weight)} of the portfolio and your top two holdings are both in that same sector.`, 'Reduce the theme concentration by trimming overlapping holdings or adding underrepresented sectors.'));
    pushRule(rules, topSector.weight > 0.5, createRule('concentration', 'high', 88, 'Sector exposure is above 50%', `${toTitleLabel(topSector.name)} makes up ${formatPercent(topSector.weight)} of the portfolio.`, 'Add positions in other sectors or use a broader fund so one market theme does not dominate the whole account.'));
    pushRule(rules, topSector.weight > 0.35 && topSector.weight <= 0.5, createRule('concentration', 'medium/high', 76, 'Sector exposure is above 35%', `${toTitleLabel(topSector.name)} is ${formatPercent(topSector.weight)} of the portfolio, so returns may be driven by one part of the market.`, 'Direct future purchases toward sectors that are currently much smaller in the portfolio.'));
  }

  pushRule(rules, broadEtfPlusIndexedStocks, createRule('overlap', 'medium', 74, 'You may have redundant exposure', 'you own a broad U.S. ETF and also multiple U.S. stocks that are probably already inside that index.', 'Decide whether the stock picks are intentional overweights; if not, simplify and lean more on the ETF.'));
  pushRule(rules, broadUsEtfCount >= 2, createRule('overlap', 'useful', 60, 'You hold multiple broad U.S. ETFs', 'owning two or more broad U.S. equity ETFs can create overlap without adding much diversification.', 'If the funds serve the same role, keep the one you prefer on simplicity, cost, or account location.'));
  pushRule(rules, allEquityBroadMarketCount >= 2, createRule('overlap', 'useful', 63, 'Multiple all-equity broad market ETFs overlap', 'two or more all-equity broad market ETFs often duplicate much of the same exposure.', 'Keeping one main all-equity fund usually makes the portfolio easier to maintain.'));
  pushRule(rules, duplicateStrategies, createRule('overlap', 'useful', 58, 'Strategy exposure appears duplicated', 'several holdings point to similar strategy buckets, so the lineup may be more complex than it needs to be.', 'Look for holdings that play nearly the same role and consolidate where appropriate.'));

  pushRule(rules, equitiesWeight >= 0.995 && risk === 'low', createRule('risk-mismatch', 'high', 92, '100% equities looks too aggressive for a low-risk profile', 'your portfolio is effectively all equities, but your questionnaire says your risk tolerance is low.', 'Add bonds or cash reserves so the portfolio better matches the amount of volatility you can tolerate.'));
  pushRule(rules, equitiesWeight >= 0.995 && risk === 'medium', createRule('risk-mismatch', 'medium', 74, '100% equities may be aggressive for a medium-risk profile', 'an all-equity portfolio can be more aggressive than many medium-risk investors expect.', 'Consider whether a modest bond or cash sleeve would make it easier to stay invested through drawdowns.'));
  pushRule(rules, risk === 'low' && equitiesWeight > 0.8, createRule('risk-mismatch', 'medium/high', 86, 'Allocation may not match a low-risk profile', `a low-risk profile paired with ${formatPercent(equitiesWeight)} in equities looks more aggressive than expected.`, 'Shift part of the portfolio toward bonds or cash-like holdings if stability matters more than maximum growth.'));
  pushRule(rules, risk === 'high' && cashAndBondsWeight > 0.35, createRule('risk-mismatch', 'medium/high', 84, 'Allocation may not match a high-risk profile', `a high-risk profile paired with ${formatPercent(cashAndBondsWeight)} in cash and bonds may be more conservative than intended.`, 'If your goal is aggressive long-term growth, consider redeploying part of the conservative sleeve into diversified equities.'));
  pushRule(rules, horizon === 'less than 3 years' && equitiesWeight > 0.85, createRule('risk-mismatch', 'high', 90, 'Short horizon with very high equity exposure', `with a horizon under 3 years, keeping ${formatPercent(equitiesWeight)} in equities can create too much volatility before the money is needed.`, 'Move at least part of the portfolio into lower-volatility assets for the near-term goal.'));
  pushRule(rules, horizon === 'less than 3 years' && equitiesWeight > 0.7 && equitiesWeight <= 0.85, createRule('risk-mismatch', 'medium', 75, 'Short horizon still looks equity-heavy', `a portfolio with ${formatPercent(equitiesWeight)} in equities may be too volatile for money needed within 3 years.`, 'Bring more of the near-term money into bonds or cash-like assets.'));
  pushRule(rules, horizon === '7+ years' && equitiesWeight < 0.4, createRule('deployment', 'high', 82, 'Long horizon looks unusually conservative', `with a 7+ year horizon, only ${formatPercent(equitiesWeight)} in equities may leave growth potential on the table.`, 'If the money is truly long-term, consider increasing diversified equity exposure gradually over time.'));
  pushRule(rules, horizon === '7+ years' && equitiesWeight < 0.5 && equitiesWeight >= 0.4, createRule('deployment', 'medium', 71, 'Long horizon may support more growth exposure', `at ${formatPercent(equitiesWeight)} in equities, the portfolio is on the conservative side for a 7+ year horizon.`, 'You could direct some new contributions toward diversified equities if long-term growth is the goal.'));
  pushRule(rules, goal === 'save for big purchase' && equitiesWeight > 0.65, createRule('risk-mismatch', 'medium/high', 83, 'Big purchase goal may need a steadier mix', `because the goal is a big purchase, having ${formatPercent(equitiesWeight)} in equities may expose the money to too much short-term market risk.`, 'Match the portfolio to the purchase timeline by moving more of that goal money into lower-volatility assets.'));
  pushRule(rules, age < 35 && horizon === '7+ years' && equitiesWeight < 0.6, createRule('deployment', 'medium', 72, 'Long horizon may support more growth exposure', `at age ${age} with a 7+ year horizon, only ${formatPercent(equitiesWeight)} in equities may be more conservative than necessary.`, 'If you are comfortable with market swings, you may want a somewhat higher allocation to diversified equities over time.'));
  pushRule(rules, age < 30 && goal === 'grow your wealth long term' && risk === 'high' && cashAndBondsWeight > 0.4, createRule('deployment', 'medium', 76, 'Aggressive profile still holds a lot in cash or bonds', `for a younger investor seeking long-term growth with high risk tolerance, ${formatPercent(cashAndBondsWeight)} in cash and bonds may slow the portfolio down.`, 'If that conservative allocation is not intentional, shift part of it into diversified equities gradually.'));
  pushRule(rules, risk === 'high' && horizon === '7+ years' && cashWeight > 0.15, createRule('deployment', 'medium/high', 78, 'Cash level is high for a long-term aggressive profile', `a high-risk investor with a 7+ year horizon currently has ${formatPercent(cashWeight)} in cash.`, 'If the cash is not reserved for a near-term use, consider phasing it into the target portfolio over time.'));
  pushRule(rules, risk === 'medium' && horizon === '7+ years' && cashWeight > 0.2, createRule('deployment', 'medium', 69, 'Cash level is moderately high for a long-term balanced profile', `a medium-risk investor with a 7+ year horizon currently has ${formatPercent(cashWeight)} in cash.`, 'If that cash is meant for long-term investing, a gradual deployment plan could help it start working harder.'));
  pushRule(rules, cashWeight > 0.1 && monthlyContribution <= 0, createRule('deployment', 'medium', 74, 'You are not actively building the portfolio', `you currently hold ${formatPercent(cashWeight)} in cash and have no monthly contribution entered.`, 'Set up even a modest recurring contribution or create a schedule for putting idle cash to work.'));
  pushRule(rules, monthlyContribution <= 0 && currentCashAvailable > 0 && (horizon === '7+ years' || goal === 'retirement' || goal === 'grow your wealth long term'), createRule('deployment', 'medium', 68, 'No ongoing monthly contribution is set', 'you have investable cash today, but no monthly contribution entered. For long-term goals, regular contributions usually matter a lot.', 'Add a recurring monthly amount, even if small, so the portfolio continues to grow beyond the money already available today.'));
  pushRule(rules, fallbackCount > 0, createRule('coverage', 'useful', 52, 'Some holdings used fallback classification', `${fallbackCount} holding${fallbackCount > 1 ? 's were' : ' was'} not found in the local metadata library, so sector and geography were estimated instead of matched exactly.`, 'Review those tickers carefully, because adding more precise security data would improve the confidence of the analysis.'));

  return rules.sort((a, b) => b.priorityScore - a.priorityScore);
}

function analyzePortfolio(holdings, questionnaire) {
  const enrichedHoldings = holdings.map((holding) => {
    const metadata = resolveSecurity(holding.symbol, questionnaire);
    return {
      ...holding,
      metadata,
      isSingleStock: metadata.type === 'stock',
      primarySector: primaryBucket(normalizeTotals(metadata.sector, 1)),
      primaryGeography: primaryBucket(normalizeTotals(metadata.geography, 1)),
    };
  });

  const totalValue = enrichedHoldings.reduce((sum, holding) => sum + holding.amount, 0);
  const weightedHoldings = enrichedHoldings
    .map((holding) => ({ ...holding, weight: totalValue ? holding.amount / totalValue : 0 }))
    .sort((a, b) => b.amount - a.amount);

  const assetClassTotals = {};
  const geographyTotals = {};
  const sectorTotals = {};
  const categoryTotals = {};
  const strategyExposure = {};
  const matchStats = { exact: 0, normalized: 0, fallback: 0 };

  weightedHoldings.forEach((holding) => {
    accumulateWeightedBreakdown(assetClassTotals, holding.metadata.assetClass, holding.amount);
    accumulateWeightedBreakdown(geographyTotals, holding.metadata.geography, holding.amount);
    accumulateWeightedBreakdown(sectorTotals, holding.metadata.sector, holding.amount);
    categoryTotals[holding.metadata.category] = (categoryTotals[holding.metadata.category] || 0) + holding.amount;
    strategyExposure[holding.metadata.strategyGroup] = (strategyExposure[holding.metadata.strategyGroup] || 0) + holding.amount;
    matchStats[holding.metadata.matchLevel] += 1;
  });

  const concentrationScore = weightedHoldings.slice(0, 3).reduce((sum, holding) => sum + holding.weight, 0);
  const summary = {
    totalValue,
    holdings: weightedHoldings,
    assetClassTotals: normalizeTotals(assetClassTotals, totalValue),
    geographyTotals: normalizeTotals(geographyTotals, totalValue),
    sectorTotals: normalizeTotals(sectorTotals, totalValue),
    categoryTotals: normalizeTotals(categoryTotals, totalValue),
    strategyExposure: normalizeTotals(strategyExposure, totalValue),
    matchStats,
    concentration: {
      largestHoldingWeight: weightedHoldings[0]?.weight || 0,
      topThreeWeight: concentrationScore,
    },
  };

  const rules = generateRules(summary, questionnaire);
  const groupedThemes = groupRules(rules);
  const positives = generatePositiveSignals(summary, questionnaire);
  const archetype = classifyArchetype(summary, groupedThemes, questionnaire);
  const narrative = buildNarrative(summary, questionnaire, groupedThemes, positives, archetype);
  const health = computePortfolioHealth(groupedThemes, positives);

  return {
    ...summary,
    rules,
    groupedThemes,
    positives,
    archetype,
    narrative,
    health,
  };
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
              <span>${toTitleLabel(item.name)}</span>
              <span>${formatCurrency(item.value)} • ${formatPercent(item.weight)}</span>
            </li>
          `
        )
        .join('')}
    </ul>
  `;
}

function renderBarChart(items, chartClass) {
  return `
    <div class="chart-list">
      ${items
        .slice(0, 6)
        .map(
          (item) => `
            <div class="chart-row">
              <div class="chart-labels">
                <span>${toTitleLabel(item.name)}</span>
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

function renderPieChart(items, title) {
  const topItems = items.slice(0, 5);
  const remainder = Math.max(0, 1 - topItems.reduce((sum, item) => sum + item.weight, 0));
  const slices = remainder > 0.01 ? [...topItems, { name: 'Other', weight: remainder }] : topItems;
  let offset = 0;
  const gradient = slices
    .map((item, index) => {
      const start = offset * 100;
      offset += item.weight;
      const end = offset * 100;
      return `${PALETTE[index % PALETTE.length]} ${start}% ${end}%`;
    })
    .join(', ');

  return `
    <section class="sub-card pie-card">
      <h4>${title}</h4>
      <div class="pie-layout">
        <div class="pie-chart" style="background: conic-gradient(${gradient || '#334155 0 100%'});"></div>
        <ul class="legend-list">
          ${slices
            .map(
              (item, index) => `
                <li>
                  <span class="legend-swatch" style="background:${PALETTE[index % PALETTE.length]}"></span>
                  <span>${toTitleLabel(item.name)}</span>
                  <strong>${formatPercent(item.weight)}</strong>
                </li>
              `
            )
            .join('')}
        </ul>
      </div>
    </section>
  `;
}

function renderThemes(groupedThemes) {
  if (!groupedThemes.length) {
    return `
      <section class="sub-card">
        <h4>Portfolio themes</h4>
        <p>No major risk theme stood out from the current portfolio snapshot.</p>
      </section>
    `;
  }

  return `
    <section class="sub-card">
      <h4>Portfolio themes</h4>
      <div class="theme-grid">
        ${groupedThemes
          .slice(0, 4)
          .map(
            (theme) => `
              <article class="theme-card">
                <p class="theme-label">${toTitleLabel(theme.theme)}</p>
                <strong>Priority ${theme.priorityScore}</strong>
                <p>${theme.rules[0].title}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

function renderNarrative(analysis) {
  return `
    <section class="sub-card narrative-card">
      <div class="narrative-header">
        <div>
          <p class="eyebrow small">Portfolio archetype</p>
          <h4>${analysis.narrative.archetypeLabel}</h4>
        </div>
        <div class="match-pill-group">
          <span class="match-pill">Exact: ${analysis.matchStats.exact}</span>
          <span class="match-pill">Normalized: ${analysis.matchStats.normalized}</span>
          <span class="match-pill">Fallback: ${analysis.matchStats.fallback}</span>
        </div>
      </div>
      <div class="narrative-grid">
        <article>
          <h5>Diagnosis</h5>
          <p>${analysis.narrative.diagnosis}</p>
        </article>
        <article>
          <h5>Primary issue</h5>
          <p>${analysis.narrative.primaryIssue}</p>
        </article>
        <article>
          <h5>Secondary issue</h5>
          <p>${analysis.narrative.secondaryIssue}</p>
        </article>
        <article>
          <h5>How this fits your input</h5>
          <p>${analysis.narrative.fit}</p>
        </article>
        <article>
          <h5>What is working</h5>
          <p>${analysis.narrative.whatWorking}</p>
        </article>
      </div>
    </section>
  `;
}

function renderRecommendations(analysis) {
  return `
    <section class="sub-card">
      <h4>What to do next</h4>
      <div class="rule-list">
        ${analysis.narrative.actionSteps.map((step) => `
          <article class="rule-card">
            <h5>${step.title}</h5>
            <p>${step.detail}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function renderRules(rules) {
  if (!rules.length) {
    return `
      <div class="sub-card">
        <h4>Top triggered rules</h4>
        <p>No major rule-based issues were triggered. The portfolio appears reasonably aligned with the questionnaire inputs.</p>
      </div>
    `;
  }

  return `
    <div class="sub-card">
      <h4>Top triggered rules</h4>
      <div class="rule-list">
        ${rules
          .slice(0, 5)
          .map(
            (rule) => `
              <article class="rule-card">
                <div class="rule-meta">
                  <span class="severity ${SEVERITY_STYLES[rule.severity] || 'severity-medium'}">${rule.severity}</span>
                  <span>${toTitleLabel(rule.theme)} • Priority ${rule.priorityScore}</span>
                </div>
                <h5>${rule.title}</h5>
                <p>${rule.detail}</p>
                <div class="next-step">
                  <strong>How to fix it</strong>
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
        ${(positives.length ? positives : ['You already have money invested, which is a useful starting point to build from.'])
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
          <strong class="headline-metric">${analysis.holdings[0]?.symbol || 'N/A'} • ${formatPercent(analysis.holdings[0]?.weight || 0)}</strong>
        </div>
        <div>
          <h4>Top 3 concentration</h4>
          <strong class="headline-metric">${formatPercent(analysis.concentration.topThreeWeight)}</strong>
        </div>
      </div>

      ${renderNarrative(analysis)}
      ${renderThemes(analysis.groupedThemes)}
      ${renderRecommendations(analysis)}
      ${renderRules(analysis.rules)}
      ${renderPositiveSignals(analysis.positives)}

      <div class="breakdown-grid pie-grid">
        ${renderPieChart(analysis.sectorTotals, 'Sector allocation pie chart')}
        ${renderPieChart(analysis.geographyTotals, 'Geography allocation pie chart')}
      </div>

      <div class="breakdown-grid">
        <section class="sub-card">
          <h4>Sector allocation chart</h4>
          ${renderBarChart(analysis.sectorTotals, 'chart-sector')}
        </section>
        <section class="sub-card">
          <h4>Geography allocation chart</h4>
          ${renderBarChart(analysis.geographyTotals, 'chart-geography')}
        </section>
      </div>

      <div class="breakdown-grid">
        <section class="sub-card">
          <h4>Asset class totals</h4>
          ${renderBreakdownList(analysis.assetClassTotals)}
        </section>
        <section class="sub-card">
          <h4>Category totals</h4>
          ${renderBreakdownList(analysis.categoryTotals)}
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
                  <span>${holding.symbol} (${toTitleLabel(holding.metadata.category)} • ${toTitleLabel(holding.primarySector)} • ${holding.metadata.matchLevel})</span>
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

window.parseHoldings = parseHoldings;
window.analyzePortfolio = analyzePortfolio;
window.resolveSecurity = resolveSecurity;
