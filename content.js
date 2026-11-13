/*
  ============================================================
  EDIT THIS FILE TO UPDATE YOUR WEBSITE
  ============================================================
  - Change any text between the quotes. Keep commas and quotes.
  - Numbers (price, target) have no quotes and no $ sign.
  - ADD a report: upload the PDF into "reports" (and an optional
    cover image into "img"), then copy one { ... } block in
    "reports" and change it. REMOVE a report: delete its block.
  - rating: "Bullish", "Buy", "Hold", "Sell", "Bearish" or "".
  - Order in the list = order on the website.
  ============================================================
*/

const SITE = {
  profile: {
    name: "Shreesh Bastakoti",
    focus: "Equity Research · Portfolio Management · Quantitative Research",
    lede: "Statistics and Mathematics student at the University of Idaho. I lead the Defensive sector of a $2 million student-managed portfolio, publish equity research on the companies we own, and study market regimes with probabilistic models.",
    headshot: "photos/headshot.jpg",
    location: "Moscow, Idaho",
    phone: "9866008857",
    email: "",                 // e.g. "you@example.com"
    linkedin: "",              // e.g. "https://www.linkedin.com/in/your-name"
    github: "https://github.com/shreeshbastakoti041-max",
    ledger: [
      ["Current role", "Defensive Sector Head, Davis Student Investment Management Group"],
      ["Sector mandate", "About 23% of a $2 million student-managed portfolio"],
      ["Coverage", "MDLZ · COST · GILD · PG · WMT"],
      ["Research", "Volatility regime detection, ICCUR Summer Undergraduate Research Fellowship"],
      ["Education", "B.S. Statistics and Mathematics (double major), University of Idaho"]
    ]
  },

  experience: [
    {
      firm: "Davis Student Investment Management Group",
      place: "University of Idaho",
      role: "Sector Head, Defensive Sector",
      dates: "Jan 2026 – Present",
      figures: [
        ["$2M", "Portfolio under student management"],
        ["~23%", "Allocation to the Defensive sector"],
        ["5", "Equity research reports published"]
      ],
      duties: [
        ["Coverage", "Lead the Defensive sector, which holds about 23% of a $2 million student-managed fund."],
        ["Recommendations", "Responsible for buy, sell and hold recommendations on sector holdings, presented to the fund for approval."],
        ["Publication", "Publish weekly equity research reports covering earnings, valuation and outlook for names including Costco, Walmart, Procter & Gamble and Gilead."]
      ]
    }
  ],

  reports: [
    {
      company: "Mondelez International", ticker: "MDLZ", industry: "Confectioners", rating: "Hold",
      price: 59.32, target: 77, fair: "$77",
      summary: "Trades well below a $77 fair value while revenue, EBITDA and $4.1B of free cash flow keep growing; cocoa costs are the key risk.",
      authors: "Shreesh Bastakoti",
      pdf: "reports/mondelez-2026-11.pdf", cover: "img/mondelez-2026-11.jpg"
    },
    {
      company: "Costco Wholesale", ticker: "COST", industry: "Consumer Staples", rating: "Bullish",
      price: 901.35, target: 1075, fair: "$1,029 – $1,036",
      summary: "FY2026 sales up 10.2% with 92% membership renewal; a premium ~46x P/E is backed by strong growth and a $1,075 target.",
      authors: "Shreesh Bastakoti, Kaitlyn Arnold, MD Sadman Sakib",
      pdf: "reports/costco-2026-11.pdf", cover: "img/costco-2026-11.jpg"
    },
    {
      company: "Gilead Sciences", ticker: "GILD", industry: "Drug Manufacturers", rating: "Hold",
      price: 153.57, target: 163.12, fair: "$131",
      summary: "HIV franchise funds the business while Yeztugo and Trodelvy drive growth; oncology acquisitions weighed on GAAP earnings.",
      authors: "Shreesh Bastakoti, Kaitlyn Arnold, MD Sadman Sakib",
      pdf: "reports/gilead.pdf", cover: "img/gilead-1.jpg"
    },
    {
      company: "Procter & Gamble", ticker: "PG", industry: "Household & Personal Products", rating: "Bullish",
      price: 147.82, target: 161, fair: "$155",
      summary: "Strong brands and a ~3% dividend support a $161 target, even with flat organic growth and slow EPS guidance.",
      authors: "Kaitlyn Arnold, Shreesh Bastakoti, Sadman Sakib",
      pdf: "reports/pg-2026-11.pdf", cover: "img/pg-2026-11.jpg"
    },
    {
      company: "Walmart", ticker: "WMT", industry: "Discount Stores", rating: "Hold",
      price: 116.16, target: 126.78, fair: "$81",
      summary: "E-commerce up 26% and advertising growth support a premium multiple, leaving limited room for further expansion.",
      authors: "Kaitlyn Arnold, Shreesh Bastakoti, Sadman Sakib",
      pdf: "reports/walmart.pdf", cover: "img/walmart-1.jpg"
    }
  ],

  research: [
    {
      title: "A Probabilistic Framework for Volatility Regime Detection",
      venue: "ICCUR Summer Undergraduate Research Fellowship",
      year: "2026",
      abstract: "Classifies the U.S. equity market into low, medium and high volatility regimes using 21 years of daily SPY data. A Gaussian Mixture Model and a three-state Hidden Markov Model identify the regimes; a Bayesian estimate of the transition matrix measures how persistent each regime is and where it tends to go next. The model is checked against known market events, on unseen 2025 data, and on a re-estimated 2022–2024 subsample.",
      data: [
        ["Universe", "SPY, daily, 2004–2025"],
        ["Training / test", "5,246 trading days / 249 days (2025, out of sample)"],
        ["Features", "Log return, 20-day realized volatility, volatility of volatility, 20-day rolling kurtosis, volume change"],
        ["Models", "Gaussian Mixture Model (3 components), Gaussian HMM (3 states), Dirichlet-prior transition estimate"]
      ],
      method: [
        ["Feature engineering", "Five daily features describing return, volatility level, volatility instability and tail shape, standardized before modeling."],
        ["Regime identification", "A three-component GMM and a three-state HMM cluster trading days; states are labeled Low, Medium and High Vol by their realized-volatility profile."],
        ["Bayesian transitions", "Observed state-to-state counts are combined with a Dirichlet prior to estimate the transition matrix, persistence and expected regime duration."],
        ["Validation", "Regime shares are compared during the 2008 crisis, the 2020 crash and the 2022 bear market, then the trained model is applied without refitting to 2025."]
      ],
      transitions: {
        labels: ["Low Vol", "Medium Vol", "High Vol"],
        matrix: [[0.971, 0.022, 0.007], [0.026, 0.963, 0.011], [0.008, 0.046, 0.946]],
        duration: [35.0, 27.0, 18.7]
      },
      events: [
        ["Global Financial Crisis", 420, 4.52, 48.33, 47.14],
        ["COVID crash", 62, 0.00, 27.42, 72.58],
        ["2022 bear market", 188, 0.00, 90.43, 9.57]
      ],
      links: [
        ["Code and notebooks on GitHub", "https://github.com/shreeshbastakoti041-max/Volatility-Regime-Detection-Model-ICCUR-SUMMER-FELLOWSHIP"],
        ["Main notebook in Colab", "https://colab.research.google.com/github/shreeshbastakoti041-max/Volatility-Regime-Detection-Model-ICCUR-SUMMER-FELLOWSHIP/blob/main/Acamedicia_Research.ipynb"],
        ["Robustness checks in Colab", "https://colab.research.google.com/github/shreeshbastakoti041-max/Volatility-Regime-Detection-Model-ICCUR-SUMMER-FELLOWSHIP/blob/main/Robustness_Check_.ipynb"]
      ]
    }
  ]
};
