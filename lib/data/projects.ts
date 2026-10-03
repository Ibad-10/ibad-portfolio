export type ProjectStatus = "live" | "shipped" | "in-progress";

export type Project = {
  slug: string;
  title: string;
  competition: string;
  outcome?: string;
  year: string;
  status: ProjectStatus;
  featured: boolean;
  stack: string[];
  summary: string;
  problem: string;
  built: string;
  result: string;
  links: { label: string; href: string }[];
};

/** Flip to true only after the Pegboard repo is made public. */
export const PEGBOARD_REPO_PUBLIC = false;
export const PEGBOARD_REPO = "https://github.com/Ibad-10/pegboard";

export const projects: Project[] = [
  {
    slug: "pegboard",
    title: "Pegboard",
    competition: "Personal product",
    outcome: "Live",
    year: "2026",
    status: "live",
    featured: true,
    stack: ["Next.js 16", "TypeScript", "Supabase (Postgres, RLS)", "Clerk", "PWA"],
    summary:
      "A family chore and pocket-money ledger: parents post priced chores, children claim them with photo proof, parents sign off.",
    problem:
      "Chore apps are mostly debit cards with chores bolted on, which means holding children's money. Families want a fair record of what is owed, not a bank.",
    built:
      "An append-only Postgres ledger (UPDATE/DELETE revoked, trigger raises), row-level security on every table with security-definer functions, server-side photo re-encoding that strips GPS data, three-round price negotiation, an age-scaled interface, a PIN kiosk mode and GDPR export and erasure. 263 integration tests plus Playwright journeys on Chromium and WebKit.",
    result:
      "Deployed and live. Records debts only, so no money is held and e-money regulation is avoided by design.",
    links: [{ label: "Live site", href: "https://getpegboard.co.uk" }],
  },
  {
    slug: "hack-the-wallet",
    title: "Hack the Wallet",
    competition: "Encode AI London Hackathon",
    outcome: "1st place",
    year: "2025",
    status: "shipped",
    featured: true,
    stack: ["Next.js", "Starknet", "Gemini 1.5 Flash", "Smart contracts"],
    summary:
      "A Starknet game where players persuade an AI to return locked crypto.",
    problem: "Make on-chain games feel like a conversation instead of a transaction form.",
    built:
      "Gemini 1.5 Flash trust scoring with voice input and output, Argent X and Braavos wallet connection, and contracts that mint a 100-token airdrop and handle betting and payouts on Sepolia, in a retro pixel-art interface.",
    result: "Won 1st place at the Encode AI London Hackathon (main track plus two sponsor bounties).",
    links: [{ label: "GitHub", href: "https://github.com/Sahid-m/HackTheWallet" }],
  },
  {
    slug: "luffabot",
    title: "LuffaBot AI Assistant",
    competition: "Brunel University Hack",
    outcome: "1st place",
    year: "2024",
    status: "shipped",
    featured: true,
    stack: ["Python", "LangGraph", "LangChain", "FastAPI"],
    summary: "A multi-tool agent on the Luffa messaging platform that runs group votes and generates images from chat.",
    problem: "Turn free-form chat messages into reliable tool calls inside a group conversation.",
    built:
      "A LangGraph ReAct agent behind FastAPI, with prompt rules that require exact user text and a clarifying question instead of assumed arguments.",
    result: "Won 1st place at Brunel University Hack in under 24 hours.",
    links: [{ label: "GitHub", href: "https://github.com/Sahid-m/luffa-ai-bot" }],
  },
  {
    slug: "streamflow",
    title: "StreamFlow",
    competition: "Radix Hack",
    outcome: "1st place",
    year: "2024",
    status: "shipped",
    featured: true,
    stack: ["TypeScript", "React", "Rust", "Radix"],
    summary: "A decentralised creator-tipping platform on the Radix blockchain.",
    problem: "Streamers lose a cut of every tip to intermediaries.",
    built: "On-chain tip transactions with real-time tip analytics and a viewer portal.",
    result: "Won 1st place at Radix Hack.",
    links: [{ label: "GitHub", href: "https://github.com/Sahid-m/radix-hack" }],
  },
  {
    slug: "go-fish",
    title: "Go Fish",
    competition: "EasyA x Polkadot Hackathon London",
    outcome: "Finalist",
    year: "2025",
    status: "shipped",
    featured: true,
    stack: ["Next.js", "TypeScript", "Solidity", "Polkadot"],
    summary: "A payment platform for fishing import/export with instant exporter payouts.",
    problem: "Exporters wait for payment and absorb FX volatility and intermediary fees.",
    built:
      "Smart-contract settlement where exporters receive 97.5% of trade value instantly, automated collateral management and stablecoin integration.",
    result: "Reached the finals of the EasyA x Polkadot Hackathon London.",
    links: [{ label: "GitHub", href: "https://github.com/Zohaib-Eh/GoFish" }],
  },
  {
    slug: "foodo-baggins",
    title: "Foodo-Baggins",
    competition: "Royal Hackaway v8 (Verdn track)",
    outcome: "3rd place",
    year: "2024",
    status: "shipped",
    featured: true,
    stack: ["Next.js", "TypeScript", "MongoDB", "Ollama"],
    summary: "An AI nutrition tracker that analyses meal photos.",
    problem: "Calorie tracking is tedious, so people stop.",
    built: "Meal-photo analysis with calorie estimates, personalised advice and sustainability Green Points.",
    result: "Placed 3rd in the Verdn environmental track at Royal Hackaway v8.",
    links: [{ label: "GitHub", href: "https://github.com/Sahid-m/foodo_baggins" }],
  },
  {
    slug: "final-year-project",
    title: "Final-Year Project: Route Optimisation",
    competition: "Brunel x BMW Hams Hall",
    year: "2026–27",
    status: "in-progress",
    featured: false,
    stack: ["AI", "Optimisation", "Logistics data"],
    summary: "An AI model to sequence plant delivery (taxi) routes dynamically.",
    problem: "Taxi deliveries lose time in loading and waiting and carry fewer pallets per trip than they could.",
    built: "In progress: data mapping, feature design and a route model to be piloted against the current route.",
    result: "Scope being confirmed with BMW and Brunel. Targets: loading time, pallets per trip, route time, driver utilisation.",
    links: [],
  },
  {
    slug: "pic16f18877-interfacing",
    title: "PIC16F18877 Digital & Analogue Interfacing",
    competition: "University coursework",
    year: "2025",
    status: "shipped",
    featured: false,
    stack: ["XC8 C", "MPLAB X", "E-blocks2"],
    summary: "Eight hardware-tested embedded exercises on a PIC16F18877.",
    problem: "Drive displays and read analogue inputs with register-level control.",
    built:
      "A 4-digit multiplexed 7-segment counter (0000–9999), an HD44780 LCD in 4-bit mode, 10-bit ADC light-sensor readings shown as a voltage and a five-switch priority controller with LED patterns.",
    result: "All eight exercises hardware-tested and documented with a flowchart.",
    links: [],
  },
  {
    slug: "digital-systems-design",
    title: "Digital Systems Design",
    competition: "University coursework",
    year: "2024",
    status: "shipped",
    featured: false,
    stack: ["Verilog HDL", "Quartus", "MAX7000 CPLD"],
    summary: "A programmable pulse generator and a three-module digital system in Verilog.",
    problem: "Design and verify digital hardware from a state-machine specification.",
    built:
      "A 50 µs pulse generator with a repeat period selectable from 100 to 800 µs (top-down FSM, then Verilog at gate and functional level) and a digit generator, weighted-BCD encoder and parity generator integrated through a gate-level top module.",
    result: "Verified in waveform simulation.",
    links: [],
  },
  {
    slug: "weather-monitoring",
    title: "Weather Monitoring System",
    competition: "Engineering project",
    year: "2024",
    status: "shipped",
    featured: false,
    stack: ["Raspberry Pi Pico", "BME280", "Python", "REST API"],
    summary: "A real-time environmental monitor with a REST API.",
    problem: "Serve live sensor readings reliably to several clients.",
    built: "A Pico with a BME280 sensor exposing readings through REST APIs that support concurrent requests.",
    result: "Achieved 95% sensor accuracy.",
    links: [],
  },
  {
    slug: "object-retriever",
    title: "Automated Object Retriever",
    competition: "Engineering project",
    year: "2024",
    status: "shipped",
    featured: false,
    stack: ["Arduino", "Ultrasonic sensor", "Embedded C"],
    summary: "An autonomous robot that finds and retrieves items.",
    problem: "Cut the time spent retrieving items by hand.",
    built: "Hardware and software built together from scratch: an Arduino with ultrasonic sensing in embedded C. I led development and testing.",
    result: "95% item-retrieval accuracy and 70% less manual retrieval time.",
    links: [],
  },
  {
    slug: "attendance-system",
    title: "Employee Attendance Management System",
    competition: "Engineering project",
    year: "2024",
    status: "shipped",
    featured: false,
    stack: ["Python", "Flask", "MySQL", "SQLAlchemy"],
    summary: "A Flask and MySQL attendance system with OTP authentication.",
    problem: "Manual attendance records cause errors and slow leave processing.",
    built: "OTP authentication and automated leave management using Flask-Login, Flask-Mail and Werkzeug.",
    result: "Cut record-keeping errors by 95% and leave processing time by 80%.",
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
