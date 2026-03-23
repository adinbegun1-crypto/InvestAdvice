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
  AMZN: { name: 'Amazon', sector: 'ConsumerDiscretionary', geography: 'United States' },
  GOOGL: { name: 'Alphabet', sector: 'CommunicationServices', geography: 'United States' },
  GOOG: { name: 'Alphabet', sector: 'CommunicationServices', geography: 'United States' },
  META: { name: 'Meta', sector: 'CommunicationServices', geography: 'United States' },
  TSLA: { name: 'Tesla', sector: 'ConsumerDiscretionary', geography: 'United States' },
  JPM: { name: 'JPMorgan Chase', sector: 'Financials', geography: 'United States' },
  'BRK.B': { name: 'Berkshire Hathaway', sector: 'Financials', geography: 'United States' },
  XOM: { name: 'Exxon Mobil', sector: 'Energy', geography: 'United States' },
  JNJ: { name: 'Johnson & Johnson', sector: 'Healthcare', geography: 'United States' },
  KO: { name: 'Coca-Cola', sector: 'ConsumerStaples', geography: 'United States' },
  PG: { name: 'Procter & Gamble', sector: 'ConsumerStaples', geography: 'United States' },
  UNH: { name: 'UnitedHealth Group', sector: 'Healthcare', geography: 'United States' },
};

const INVESTOR_BUCKETS = {
  shortTerm: {
    label: 'Short-term investor',
    style: 'Capital preservation portfolio',
    styleMessage:
      'Your priority is protecting money you may need soon, so growth matters less than stability.',
    allocation: 'Low equity, with high cash and/or bonds.',
    allocationMessage:
      'Most of your portfolio should stay in safer assets because you may need the money soon.',
    whatToInvestIn: ['High-interest cash', 'Short-term bond exposure', 'Lower-volatility holdings'],
    avoid: ['Aggressive stocks', 'Concentrated positions'],
  },
  conservative: {
    label: 'Conservative investor',
    style: 'Conservative diversified portfolio',
    styleMessage:
      'You likely need some growth, but with a more stable mix that matches your comfort level.',
    allocation: 'Moderate equities, with meaningful bonds and cash.',
    allocationMessage: 'This gives you some growth while limiting large swings.',
    whatToInvestIn: ['Broad stock ETFs', 'Bond ETFs', 'Simple diversified funds'],
    avoid: ['Aggressive stocks', 'Overly concentrated bets'],
  },
  balanced: {
    label: 'Balanced investor',
    style: 'Balanced ETF portfolio',
    styleMessage: 'A diversified portfolio with both growth and stability may fit you best.',
    allocation: 'Meaningful equities, with moderate bonds and cash.',
    allocationMessage:
      'This is a middle-ground portfolio that aims for growth without being too aggressive.',
    whatToInvestIn: ['Broad U.S. equity ETF', 'International equity ETF', 'Bond ETF'],
    avoid: ['Heavy single-stock bets', 'Overcomplicating the portfolio'],
  },
  growth: {
    label: 'Growth investor',
    style: 'Growth-focused ETF portfolio',
    styleMessage:
      'Because you have time and can tolerate volatility, a stock-heavy portfolio likely makes sense.',
    allocation: 'High equities, with little bonds or cash.',
    allocationMessage:
      'Because your time horizon is long, equities can play the main role in your portfolio.',
    whatToInvestIn: [
      'Broad equity ETFs',
      'Strong international diversification',
      'Little or no bond allocation depending on profile',
    ],
    avoid: ['Large idle cash balances', 'Concentrated speculation'],
  },
  aggressiveLongTerm: {
    label: 'Aggressive long-term investor',
    style: 'Simple long-term growth portfolio',
    styleMessage:
      'Your profile supports a mostly equity-based strategy built for long-term compounding.',
    allocation: 'Very high or full equity exposure, with very little cash unless intentionally held.',
    allocationMessage:
      'Your profile supports prioritizing long-term growth over short-term stability.',
    whatToInvestIn: [
      'Broad all-equity ETF',
      'A simple combination of U.S. and international equity ETFs',
    ],
    avoid: ['Large defensive allocations', 'Concentrated stock picks'],
  },
};

const STARTER_OPTIONS = [
  {
    title: 'Option 1: Simplest option',
    message:
      'If you want the easiest path, use a single diversified ETF that already holds many companies and regions.',
  },
  {
    title: 'Option 2: More customizable option',
    message:
      'If you want a bit more control, split between U.S. equities, international equities, and bonds/cash if needed.',
  },
];

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

function buildInvestorProfile(answers) {
  const age = Number(answers.age || 0);
  const risk = answers.riskTolerance;
  const horizon = answers.timeHorizon;
  const goal = answers.mainGoal;

  let bucketKey = 'balanced';

  if (horizon === 'less than 3 years') {
    bucketKey = 'shortTerm';
  } else if (
    risk === 'high' &&
    horizon === '7+ years' &&
    goal === 'grow your wealth long term' &&
    age > 0 &&
    age <= 40
  ) {
    bucketKey = 'aggressiveLongTerm';
  } else if (risk === 'low') {
    bucketKey = 'conservative';
  } else if (risk === 'high' && horizon === '7+ years') {
    bucketKey = 'growth';
  } else if (risk === 'medium') {
    bucketKey = 'balanced';
  } else if (risk === 'high') {
    bucketKey = 'growth';
  } else if (risk === 'low') {
    bucketKey = 'conservative';
  }

  const bucket = INVESTOR_BUCKETS[bucketKey];
  const agePhrase = age ? `At age ${age}, ` : '';
  const goalPhrase =
    goal === 'save for big purchase'
      ? 'because this money is tied to a future purchase'
      : goal === 'retirement'
        ? 'because retirement investing often spans many years'
        : 'because your goal is long-term growth';

  let summary = `${agePhrase}your answers point to the <strong>${bucket.label}</strong> bucket.`;

  if (bucketKey === 'shortTerm') {
    summary += ` Your ${horizon} time horizon matters most here, so preserving capital should come before chasing upside even if you can handle risk.`;
  } else if (bucketKey === 'conservative') {
    summary += ` Your low risk tolerance stands out, so a steadier plan likely fits best ${goalPhrase}.`;
  } else if (bucketKey === 'balanced') {
    summary += ` Your mix of ${risk} risk tolerance and a ${horizon} horizon suggests a middle-ground approach with both growth and stability.`;
  } else if (bucketKey === 'growth') {
    summary += ` Your high risk tolerance and longer timeline support leaning into equities while accepting more short-term volatility.`;
  } else {
    summary += ` You have the strongest growth profile: high risk tolerance, a 7+ year horizon, and a growth-oriented goal, which supports a simple equity-heavy strategy.`;
  }

  return {
    bucketKey,
    bucket,
    summary,
  };
}

function renderBulletList(items) {
  return `
    <ul class="starter-list">
      ${items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

function renderStarterPlan(answers) {
  const cash = Number(answers.currentCash);
  const monthly = Number(answers.monthlyAmount);
  const profile = buildInvestorProfile(answers);
  const { bucket } = profile;

  return `
    <div class="analysis-stack starter-stack">
      <section class="sub-card starter-hero-card">
        <p class="starter-kicker">Bucket</p>
        <h3>${bucket.label}</h3>
        <p>${profile.summary}</p>
        <div class="starter-snapshot">
          <span><strong>Goal:</strong> ${titleCase(answers.mainGoal)}</span>
          <span><strong>Risk tolerance:</strong> ${titleCase(answers.riskTolerance)}</span>
          <span><strong>Time horizon:</strong> ${titleCase(answers.timeHorizon)}</span>
          <span><strong>Starting cash:</strong> ${formatCurrency(cash)} now + ${formatCurrency(monthly)}/month</span>
        </div>
      </section>

      <section class="sub-card">
        <h4>Recommended style: ${bucket.style}</h4>
        <p>${bucket.styleMessage}</p>
      </section>

      <div class="breakdown-grid starter-grid">
        <section class="sub-card">
          <h4>Suggested allocation</h4>
          <p><strong>${bucket.allocation}</strong></p>
          <p>${bucket.allocationMessage}</p>
        </section>
        <section class="sub-card">
          <h4>What to invest in</h4>
          ${renderBulletList(bucket.whatToInvestIn)}
        </section>
        <section class="sub-card">
          <h4>What not to prioritize</h4>
          ${renderBulletList(bucket.avoid)}
        </section>
      </div>

      <section class="sub-card">
        <h4>Simple implementation options</h4>
        <div class="option-grid starter-option-grid">
          ${STARTER_OPTIONS.map(
            (option) => `
              <article class="choice-card starter-option-card">
                <h5>${option.title}</h5>
                <p>${option.message}</p>
              </article>
            `
          ).join('')}
        </div>
      </section>
    </div>
  `;
}

function parseHoldings(holdingsText) {
  return holdingsText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/\s+-\s+/);
      const symbol = parts.shift()?.trim().toUpperCase();
      const amount = Number(parts.join(' - ').replace(/[$,]/g, '').trim());
      return {
        raw: line,
        symbol,
        amount,
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

function analyzePortfolio(holdings, questionnaire) {
  const enrichedHoldings = holdings.map((holding) => {
    const metadata = getHoldingMetadata(holding.symbol);
    return {
      ...holding,
      metadata,
      isSingleStock: metadata.type === 'stock',
      isBroadUsEtf: metadata.tags.includes('broad-us-etf'),
      isAllEquityBroadMarketEtf: metadata.tags.includes('all-equity-broad-market'),
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

  return {
    ...summary,
    rules,
  };
}

function pushRule(rules, condition, rule) {
  if (condition) {
    rules.push(rule);
  }
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
  const equitiesWeight = portfolio.assetClassTotals.find((item) => item.name === 'equities')?.weight || 0;
  const bondsWeight = portfolio.assetClassTotals.find((item) => item.name === 'bonds')?.weight || 0;
  const cashWeight = portfolio.assetClassTotals.find((item) => item.name === 'cash')?.weight || 0;
  const cashAndBondsWeight = cashWeight + bondsWeight;
  const holdingCount = portfolio.holdings.length;
  const broadUsEtfCount = portfolio.holdings.filter((holding) => holding.isBroadUsEtf).length;
  const allEquityBroadMarketCount = portfolio.holdings.filter((holding) => holding.isAllEquityBroadMarketEtf).length;
  const singleStockCount = portfolio.holdings.filter((holding) => holding.isSingleStock).length;
  const onlySingleStocks = singleStockCount === holdingCount;
  const hasBroadEtf = portfolio.holdings.some((holding) => holding.isBroadUsEtf || holding.isAllEquityBroadMarketEtf);
  const duplicateStrategies = portfolio.strategyExposure.filter((item) => item.weight >= 0.2).length >= 2;
  const horizon = answers.timeHorizon;
  const risk = answers.riskTolerance;
  const goal = answers.mainGoal;

  if (largestHolding) {
    pushRule(rules, holdingCount === 1, {
      severity: 'high',
      priorityScore: 97,
      title: 'Single holding concentration is very high',
      detail: `Your portfolio has only one holding, so ${largestHolding.symbol} represents ${formatPercent(largestHolding.weight)} of the account.`,
    });
    pushRule(rules, holdingCount >= 2 && holdingCount <= 3, {
      severity: 'medium',
      priorityScore: 74,
      title: 'Portfolio breadth is still limited',
      detail: `You currently hold only ${holdingCount} positions, which can leave the portfolio more exposed to company- or fund-specific surprises.`,
    });
    pushRule(rules, largestHolding.weight > 0.4, {
      severity: 'high',
      priorityScore: 94,
      title: 'Largest holding is above 40%',
      detail: `${largestHolding.symbol} makes up ${formatPercent(largestHolding.weight)} of the portfolio, which is a high concentration risk.`,
    });
    pushRule(rules, largestHolding.weight > 0.25 && largestHolding.weight <= 0.4, {
      severity: 'medium',
      priorityScore: 82,
      title: 'Largest holding is above 25%',
      detail: `${largestHolding.symbol} represents ${formatPercent(largestHolding.weight)}, so one position is driving a lot of the outcome.`,
    });
    pushRule(rules, largestHolding.weight > 0.15 && largestHolding.isSingleStock, {
      severity: 'low/medium',
      priorityScore: 65,
      title: 'A single stock is over 15%',
      detail: `${largestHolding.symbol} is an individual stock at ${formatPercent(largestHolding.weight)}, which can be a meaningful stock-specific bet.`,
    });
  }

  if (topGeography) {
    pushRule(rules, topGeography.weight > 0.8, {
      severity: 'high',
      priorityScore: 91,
      title: 'Geography exposure is heavily concentrated',
      detail: `${topGeography.name} accounts for ${formatPercent(topGeography.weight)} of the portfolio.`,
    });
    pushRule(rules, topGeography.weight > 0.65 && topGeography.weight <= 0.8, {
      severity: 'medium',
      priorityScore: 78,
      title: 'Geography exposure is somewhat concentrated',
      detail: `${topGeography.name} is ${formatPercent(topGeography.weight)} of the portfolio, so regional diversification could improve.`,
    });
  }

  if (topSector) {
    pushRule(rules, topSector.weight > 0.5, {
      severity: 'high',
      priorityScore: 88,
      title: 'Sector exposure is above 50%',
      detail: `${topSector.name} makes up ${formatPercent(topSector.weight)} of the portfolio, creating a high sector bet.`,
    });
    pushRule(rules, topSector.weight > 0.35 && topSector.weight <= 0.5, {
      severity: 'medium/high',
      priorityScore: 76,
      title: 'Sector exposure is above 35%',
      detail: `${topSector.name} is ${formatPercent(topSector.weight)} of the portfolio, so returns may be driven by one part of the market.`,
    });
  }

  pushRule(rules, onlySingleStocks && !hasBroadEtf, {
    severity: 'medium/high',
    priorityScore: 79,
    title: 'Portfolio relies only on single stocks',
    detail: 'All current holdings are individual stocks and there is no broad ETF anchor to spread risk across more companies.',
  });

  pushRule(rules, broadUsEtfCount >= 2, {
    severity: 'useful',
    priorityScore: 58,
    title: 'You hold multiple broad U.S. ETFs',
    detail: 'Owning two or more broad U.S. equity ETFs can create overlap without adding much diversification.',
  });

  pushRule(rules, allEquityBroadMarketCount >= 2, {
    severity: 'useful',
    priorityScore: 62,
    title: 'Multiple all-equity broad market ETFs overlap',
    detail: 'Two or more all-equity broad market ETFs often duplicate the same underlying exposure.',
  });

  pushRule(rules, duplicateStrategies, {
    severity: 'useful',
    priorityScore: 55,
    title: 'Strategy exposure appears duplicated',
    detail: 'Several holdings point to similar strategy buckets, so simplifying the lineup may make the portfolio easier to manage.',
  });

  pushRule(rules, risk === 'low' && equitiesWeight > 0.8, {
    severity: 'medium/high',
    priorityScore: 85,
    title: 'Allocation may not match a low-risk profile',
    detail: `A low-risk questionnaire profile paired with ${formatPercent(equitiesWeight)} in equities looks more aggressive than expected.`,
  });

  pushRule(rules, risk === 'high' && cashAndBondsWeight > 0.35, {
    severity: 'medium/high',
    priorityScore: 84,
    title: 'Allocation may not match a high-risk profile',
    detail: `A high-risk profile paired with ${formatPercent(cashAndBondsWeight)} in cash and bonds may be more conservative than intended.`,
  });

  pushRule(rules, horizon === 'less than 3 years' && equitiesWeight > 0.8, {
    severity: 'high',
    priorityScore: 90,
    title: 'Short horizon with very high equity exposure',
    detail: `With a horizon under 3 years, keeping ${formatPercent(equitiesWeight)} in equities can create unwanted volatility before the money is needed.`,
  });

  pushRule(rules, horizon === 'less than 3 years' && equitiesWeight > 0.7, {
    severity: 'medium/high',
    priorityScore: 81,
    title: 'Short horizon looks aggressive for the timeline',
    detail: 'A short time horizon plus an aggressive allocation can create a mismatch if markets fall near the spending date.',
  });

  pushRule(rules, goal === 'save for big purchase' && equitiesWeight > 0.65, {
    severity: 'medium/high',
    priorityScore: 83,
    title: 'Big purchase goal may need a steadier mix',
    detail: `Because the goal is a big purchase, having ${formatPercent(equitiesWeight)} in equities may expose the money to too much short-term market risk.`,
  });

  pushRule(rules, age < 35 && horizon === '7+ years' && equitiesWeight < 0.6, {
    severity: 'medium',
    priorityScore: 71,
    title: 'Long horizon may support more growth exposure',
    detail: `At age ${age} with a 7+ year horizon, only ${formatPercent(equitiesWeight)} in equities may be more conservative than necessary.`,
  });

  pushRule(
    rules,
    age < 30 && goal === 'grow your wealth long term' && risk === 'high' && cashAndBondsWeight > 0.4,
    {
      severity: 'medium',
      priorityScore: 75,
      title: 'Aggressive profile still holds a lot in cash or bonds',
      detail: `For a younger investor seeking long-term growth with high risk tolerance, ${formatPercent(cashAndBondsWeight)} in cash and bonds may slow the portfolio down.`,
    }
  );

  pushRule(rules, risk === 'high' && horizon === '7+ years' && cashWeight > 0.15, {
    severity: 'medium/high',
    priorityScore: 77,
    title: 'Cash level is high for a long-term aggressive profile',
    detail: `A high-risk investor with a 7+ year horizon currently has ${formatPercent(cashWeight)} in cash, which may be more than needed.`,
  });

  pushRule(rules, risk === 'medium' && horizon === '7+ years' && cashWeight > 0.2, {
    severity: 'medium',
    priorityScore: 69,
    title: 'Cash level is moderately high for a long-term balanced profile',
    detail: `A medium-risk investor with a 7+ year horizon currently has ${formatPercent(cashWeight)} in cash.`,
  });

  pushRule(
    rules,
    monthlyContribution <= 0 &&
      currentCashAvailable > 0 &&
      (horizon === '7+ years' || goal === 'retirement' || goal === 'grow your wealth long term'),
    {
      severity: 'medium',
      priorityScore: 67,
      title: 'No ongoing monthly contribution is set',
      detail: 'You have investable cash today, but no monthly contribution entered. For long-term goals, regular contributions usually matter a lot.',
    }
  );

  return rules.sort((left, right) => right.priorityScore - left.priorityScore);
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
                  <span class="severity severity-${rule.severity.replace('/', '-')}">${rule.severity}</span>
                  <span>Priority ${rule.priorityScore}</span>
                </div>
                <h5>${rule.title}</h5>
                <p>${rule.detail}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderPortfolioAnalysis(analysis) {
  const topRules = analysis.rules.slice(0, Math.min(5, Math.max(3, analysis.rules.length)));

  analysisOutput.classList.remove('hidden');
  analysisOutput.innerHTML = `
    <div class="analysis-stack">
      <div class="sub-card overview-grid">
        <div>
          <h4>Total portfolio value</h4>
          <strong class="headline-metric">${formatCurrency(analysis.totalValue)}</strong>
        </div>
        <div>
          <h4>Number of holdings</h4>
          <strong class="headline-metric">${analysis.holdings.length}</strong>
        </div>
        <div>
          <h4>Largest holding</h4>
          <strong class="headline-metric">${analysis.holdings[0].symbol} • ${formatPercent(analysis.holdings[0].weight)}</strong>
        </div>
      </div>

      ${renderRules(topRules)}

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
                  <span>${holding.symbol} (${titleCase(holding.metadata.type)})</span>
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
  starterOutput.innerHTML = renderStarterPlan(state.questionnaire);
  analysisOutput.classList.add('hidden');
  analysisOutput.innerHTML = '';
  showScreen('choice-screen');
});

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.target;
    if (target === 'starter-screen' && state.questionnaire) {
      starterOutput.innerHTML = renderStarterPlan(state.questionnaire);
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
      <p>Use one holding per line in the format <em>TICKER - 5000</em> and make sure each amount is greater than zero.</p>
    `;
    return;
  }

  const analysis = analyzePortfolio(holdings, state.questionnaire);
  savePortfolio(analysis);
  renderPortfolioAnalysis(analysis);
});
