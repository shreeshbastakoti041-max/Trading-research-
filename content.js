/*
  ============================================================
  EDIT THIS FILE TO UPDATE YOUR WEBSITE
  ============================================================
  - Change any text between the quotes.
  - Keep the commas between items and the quotes around text.
  - Numbers (price, target) have no quotes and no $ sign.
  - To ADD a report: upload the PDF into the "reports" folder,
    then copy one { ... } block in "reports" and change it.
  - To REMOVE a report: delete its whole { ... }, line.
  - Order on this list = order on the website.
  - cover is optional: put a picture in "img" or leave it as "".
  - rating can be "Buy", "Hold", "Sell" or "" (shows Not rated).
  - To add photos: upload them into the "photos" folder and add
    { src: "photos/your-file.jpg", caption: "Your caption" },
  ============================================================
*/

const SITE = {
  profile: {
    name: "Shreesh Bastakoti",
    headline: "Derivatives trading and equity research",
    about: "Defensive Sector Head at the Davis Student Investment Management Group, overseeing about 23% of a $2 million student-managed fund, and derivatives trader with Barker Trading and Capital Management Group at the University of Idaho.",
    school: "University of Idaho",
    program: "[Your major], Class of [year]",
    location: "Moscow, Idaho",
    email: "",                  // e.g. "you@example.com"
    linkedin: "",               // e.g. "https://www.linkedin.com/in/your-name"
    headshot: "",               // e.g. "photos/headshot.jpg"
    researchNote: "Weekly reports written as Defensive Sector Head for a $2 million student-managed fund"
  },

  experience: [
    {
      firm: "Davis Student Investment Management Group",
      place: "University of Idaho",
      role: "Sector Head, Defensive Sector",
      dates: "[Start] – Present",
      bullets: [
        "Lead the Defensive sector, which holds about 23% of a $2 million student-managed fund.",
        "Responsible for buy, sell and hold recommendations on sector holdings, presented to the fund for approval.",
        "Publish weekly equity research reports covering earnings, valuation and outlook for names including Costco, Walmart, Procter & Gamble and Gilead."
      ]
    },
    {
      firm: "Barker Trading and Capital Management Group",
      place: "University of Idaho",
      role: "Derivatives Trader",
      dates: "2025 – Present",
      bullets: [
        "Traded a $15,000 portfolio with full trading authority using options strategies validated through out-of-sample backtesting.",
        "Executed a systematic index rotation strategy, using put-call parity deviations to identify mispriced options relative to the underlying index, and mean-reversion pairs trading to capture relative-value spreads.",
        "Benchmarked returns against the S&P 500, using the 3-month T-bill as the risk-free rate, achieving a 4.2% excess return over [X months] with a Sharpe ratio of [X]."
      ]
    }
  ],

  reports: [
    {
      company: "Mondelez", ticker: "MDLZ", industry: "Confectioners", rating: "",
      price: 59.32, target: 77, fair: "$77",
      summary: "Trades well below a $77 fair value while revenue, EBITDA and $4.1B of free cash flow keep growing; cocoa costs are the key risk.",
      authors: "Kaitlyn Arnold, Shreesh Bastakoti, Sadman Sakib",
      pdf: "reports/mondelez.pdf", cover: "img/mondelez-1.jpg"
    },
    {
      company: "Costco", ticker: "COST", industry: "Consumer Staples", rating: "Hold",
      price: 901.35, target: 1075, fair: "$1,029 – $1,036",
      summary: "FY2026 sales up 10.2% with 92% membership renewal, but a ~46x P/E already prices in strong growth.",
      authors: "Shreesh Bastakoti, Kaitlyn Arnold, MD Sadman Sakib",
      pdf: "reports/costco.pdf", cover: "img/costco-1.jpg"
    },
    {
      company: "Gilead Sciences", ticker: "GILD", industry: "Drug Manufacturers", rating: "Hold",
      price: 153.57, target: 163.12, fair: "$131",
      summary: "HIV franchise funds the business while Yeztugo and Trodelvy drive growth; oncology acquisitions weighed on GAAP earnings.",
      authors: "Shreesh Bastakoti, Kaitlyn Arnold, MD Sadman Sakib",
      pdf: "reports/gilead.pdf", cover: "img/gilead-1.jpg"
    },
    {
      company: "Procter & Gamble", ticker: "PG", industry: "Household & Personal Products", rating: "",
      price: 147.82, target: 161, fair: "$155",
      summary: "Flat organic growth and slow EPS guidance make PG a stable ~3% dividend holding more than a growth pick.",
      authors: "Kaitlyn Arnold, Shreesh Bastakoti, Sadman Sakib",
      pdf: "reports/pg.pdf", cover: "img/pg-1.jpg"
    },
    {
      company: "Walmart", ticker: "WMT", industry: "Discount Stores", rating: "Hold",
      price: 116.16, target: 126.78, fair: "$81",
      summary: "E-commerce up 26% and advertising growth support a premium multiple, leaving limited room for further expansion.",
      authors: "Kaitlyn Arnold, Shreesh Bastakoti, Sadman Sakib",
      pdf: "reports/walmart.pdf", cover: "img/walmart-1.jpg"
    }
  ],

  photos: [
    // { src: "photos/team.jpg", caption: "Barker trading team, 2026" },
  ]
};
