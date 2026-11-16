export type Mode = "software" | "electronics";

export type Project = {
  name: string;
  badge: string;
  cat: string;
  date: string;
  desc: string;
  tags: string[];
  gold?: boolean;
  gh?: string;
  video?: string;
  /** Local muted loop. External demos stay on `video`. */
  preview?: string;
  live?: string;
  imgs?: string[];
  fit?: "cover" | "contain";
  imgBg?: string;
};

const UA = (id: string) => `https://github.com/user-attachments/assets/${id}`;
const YT = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

export const PROJECTS: Record<string, Project> = {
  canary: {
    name: "Canary",
    badge: "1st · Grok Bot Real Estate Hackathon",
    gold: true,
    cat: "AI",
    date: "Nov 2026",
    live: "https://canary-eight-murex.vercel.app",
    gh: "https://github.com/Ibad-10/canary",
    video: "https://github.com/Ibad-10/canary/raw/main/docs/media/canary-demo-v2.mp4",
    imgs: ["/projects/canary.jpg", "/projects/canary-winners.jpg"],
    fit: "contain",
    imgBg: "#f2f2f2",
    desc: "Reads monthly building data (arrears, service-charge overspend, overdue fire checks, repairs, vacancy) and forecasts each loan's interest cover (ICR) and loan-to-value (LTV) 3 and 6 months ahead with a low–mid–high range. It ranks which loans to chase first, has a rate/value stress slider, links every number to its source row, and drafts a memo for a human to sign off. Built solo in one day.",
    tags: ["Python", "FastAPI", "Next.js", "Supabase"],
  },
  chainsentinel: {
    name: "ChainSentinel",
    badge: "Best Use Case · Mubit Night Shift",
    gold: true,
    cat: "AI",
    date: "Oct 2026",
    live: "https://chainsentinel-nine.vercel.app",
    gh: "https://github.com/Ibad-10/Chainsentinel",
    imgs: ["/projects/chainsentinel.jpg", "/projects/chainsentinel-award-1.jpg", "/projects/chainsentinel-award-2.jpg"],
    desc: "Paste a wallet, and it pulls the live transactions and maps the money flow as an interactive graph. Eight AML checks gather evidence (sanctions, mixers, peel chains, bridge hops, fan-out), then Banyan Sapling judges it against a written AML policy and returns FLAG, REVIEW or CLEAR. It flags the Ronin, Harmony and Bybit exploiter wallets, and its live block scanner caught a real Tornado Cash deposit as it happened.",
    tags: ["Python", "FastAPI", "Cytoscape.js", "Banyan Sapling"],
  },
  hookline: {
    name: "Hookline",
    badge: "Mubit Night Shift",
    cat: "AI",
    date: "Oct 2026",
    live: "https://hookline-one-iota.vercel.app",
    gh: "https://github.com/Ibad-10/HookLine",
    imgs: ["/projects/hookline.jpg", "/projects/hookline-showcase.jpg"],
    desc: "Turns each week's real scam reports (Which?, FBI IC3, FTC, NCSC) into short lessons, with practice phone calls you can talk back to and practice emails. A gatekeeper ends a call the moment you start reading out card details. All ten AI jobs run through Mubit, which trained small adapters on them overnight. There's also a cat mascot chatbot, Sly, that checks texts you paste in.",
    tags: ["Next.js", "TypeScript", "Mubit", "ElevenLabs"],
  },
  passage: {
    name: "Passage",
    badge: "2nd · The PROBLEM day",
    cat: "Web",
    date: "Oct 2026",
    live: "https://passage-gamma.vercel.app",
    gh: "https://github.com/Ibad-10/passage",
    imgs: ["/projects/passage.jpg", "/projects/passage-shipments.jpg"],
    desc: "Takes a UK defence or dual-use shipment from classification through sanctions screening to the licence route, with one clear next action per case, an expert sign-off on every AI suggestion, and a full audit trail. Team build (Team 11). Placed 2nd at The PROBLEM day.",
    tags: ["Next.js", "TypeScript", "Supabase", "Claude"],
  },
  sip: {
    name: "Sip",
    badge: "AgentVerse · UCL",
    cat: "Robotics/Embedded",
    date: "Nov 2026",
    gh: "https://github.com/Ibad-10/Sip",
    imgs: ["/projects/sip.jpg"],
    desc: "Finds the glass by camera, pours, adds a straw and brings it to her lips through a safety gate. It fetches the right day's pill organiser and watches her take the tablets. It stops on \"stop\", backs off if she turns away, and re-routes around obstacles with lidar. Everything it knows comes from its own sensors.",
    tags: ["MuJoCo", "Python", "YOLO-World", "MediaPipe"],
  },
  shadowcall: {
    name: "ShadowCall",
    badge: "Mubit Night Shift",
    cat: "AI",
    date: "Oct 2026",
    gh: "https://github.com/Ibad-10/ShadowCall",
    imgs: ["/projects/shadowcall.jpg"],
    desc: "Live calls come in via ElevenLabs. The frontier model answers through Mubit while each sub-task (extract, policy check, form fill, summary) trains its own adapter. A deterministic policy engine, not the model, verifies answers. A sub-task only switches once its adapter beats the frontier on 20+ held-out calls with no missed 999 red flags.",
    tags: ["Python", "FastAPI", "Mubit", "ElevenLabs"],
  },
  designmd: {
    name: "design-md",
    badge: "Claude Code skill",
    cat: "AI",
    date: "Oct 2026",
    gh: "https://github.com/Ibad-10/design-md",
    imgs: ["/projects/design-md.jpg"],
    fit: "contain",
    imgBg: "#f6f3ec",
    desc: "A Claude Code skill that opens any website in a real browser, measures its design and writes a DESIGN.md design-system file (tokens, typography, motion, tech stack) for AI coding agents to follow.",
    tags: ["Claude Code", "Playwright"],
  },
  peg: { name: "Pegboard", badge: "Live", cat: "Web", date: "2026", live: "https://getpegboard.co.uk", desc: "A family chore and pocket-money app. Parents post priced jobs, children claim them with photo evidence, parents sign off from one queue. Installable PWA with a PIN kiosk mode.", tags: ["Next.js", "PWA"] },
  htw: { name: "Hack the Wallet", badge: "1st · Encode AI London", gold: true, cat: "Web3", date: "Apr 2025", gh: "https://github.com/Sahid-m/HackTheWallet", imgs: [UA("c56f9da4-2eb7-48fc-9719-b99046a0fc97"), UA("4842170b-d4eb-4991-bf65-3657385014ae"), UA("4c214fb2-6098-481c-850e-ce7b6468da46"), UA("74a99569-f75d-4d6b-b51e-6d566f7a5d22"), UA("e00ce850-6d48-453e-8474-2008017f8fcd")], desc: "A Starknet game where players persuade an AI to return locked crypto, with Gemini 1.5 Flash trust scoring, voice input/output and on-chain rewards on Sepolia.", tags: ["Next.js", "Starknet", "Gemini"] },
  gofish: { name: "Go Fish", badge: "Finalist · EasyA x Polkadot", cat: "Web3", date: "Apr 2025", gh: "https://github.com/Ibad-10/GoFish", desc: "A payment platform for fishing import/export. Exporters receive 97.5% of trade value instantly via smart contracts and stablecoin integration.", tags: ["Next.js", "Solidity", "Polkadot"] },
  sf: { name: "StreamFlow", badge: "1st · Radix bounty", gold: true, cat: "Web3", date: "Jul 2025", gh: "https://github.com/Sahid-m/radix-hack", video: "https://www.youtube.com/watch?v=WvYQmypMfFc", imgs: [UA("cc35bc71-d341-412f-9f49-93a673156878"), UA("ebe88fe7-b533-4ecc-b62e-c1b49d24e1b1"), UA("c62838b9-b58e-4577-ada4-225620f9411e"), UA("020752ad-1052-4609-a67c-96af40fa2433")], desc: "Decentralised creator tipping on Radix. Viewer tips go straight to streamers, with real-time tip analytics and on-chain transaction processing. 1st in the Radix bounty at Brunel Hack 25.", tags: ["React", "Rust", "Radix"] },
  luffa: { name: "LuffaBot AI Assistant", badge: "3rd · Luffa bounty", cat: "AI", date: "Jul 2025", gh: "https://github.com/Sahid-m/luffa-ai-bot", video: "https://www.youtube.com/watch?v=SRU7MjWs0DA", imgs: [YT("SRU7MjWs0DA")], desc: "A LangGraph multi-tool agent on the Luffa messaging platform, demoed as RPS AI Bot, that runs group votes and generates images from chat. Built in under 24 hours. 3rd in the Luffa/Endless bounty at Brunel Hack 25.", tags: ["Python", "LangGraph", "FastAPI"] },
  foodo: { name: "Foodo-Baggins", badge: "3rd · Royal Hackaway v8", cat: "AI", date: "Feb 2025", gh: "https://github.com/Sahid-m/foodo_baggins", imgs: [UA("4a5dfa14-7082-461e-9113-44101020b447")], fit: "contain", imgBg: "#f6f6f6", desc: "An AI nutrition tracker that analyses meal photos for calories and advice, converts meals into Green Points, and roasts each food choice.", tags: ["Next.js", "MongoDB", "Ollama"] },
  hyper: { name: "HyperMint", badge: "EasyA x Stellar", cat: "Web3", date: "Oct 2024", gh: "https://github.com/Ibad-10/Hypermint", imgs: [UA("bee3574f-0470-4fbf-8d5f-7252bc9ad293"), UA("81016bfa-2c1b-46bb-8c98-b3f1ccf58aa9"), UA("9043203d-5590-4396-808b-5f64cbf46d1f"), UA("e1e5b60b-447b-487c-bc72-770e4007ba1e")], desc: "Frontend developer on a meme-coin creation and trading platform on the Stellar blockchain, designing the token creation and trading interface.", tags: ["React", "Next.js", "Stellar SDK"] },
  voice: { name: "Voice Assistant", badge: "Royal Hackaway v7", cat: "AI", date: "Jan 2024", gh: "https://github.com/Faeq-F/HackawayV7", desc: "92% recognition accuracy across 6 voice commands in a Python voice assistant built at Royal Hackaway v7.", tags: ["Python", "SpeechRecognition", "pyttsx3"] },
  attend: { name: "Attendance Management", badge: "Python · Flask", cat: "Web", date: "2024", desc: "Cut record-keeping errors by 95% and leave processing time by 80%, with OTP authentication and automated leave management.", tags: ["Flask", "MySQL", "SQLAlchemy"] },
  weather: { name: "Weather Monitoring", badge: "Hardware", cat: "Embedded", date: "Oct 2024", desc: "Real-time monitoring on a Raspberry Pi Pico with a BME280 sensor at 95% sensor accuracy, served through REST APIs that support concurrent requests.", tags: ["Pi Pico", "BME280", "Python"] },
  robot: { name: "Automated Object Retriever", badge: "Robotics", cat: "Embedded", date: "Jan – Mar 2024", imgs: ["/projects/object-retriever.jpg"], preview: "/projects/object-retriever-loop.mp4", desc: "95% item-retrieval accuracy and 70% less manual retrieval time. Led development and testing of the autonomous robot, hardware and software from scratch.", tags: ["Arduino", "Ultrasonic", "Embedded C"] },
  bank: { name: "Banking & Supermarket Suite", badge: "Java", cat: "Web", date: "Oct – Dec 2024", desc: "A Java banking app and a supermarket system whose checkout debits the customer’s bank account. Designed with UML and tested per use case.", tags: ["Java", "Swing", "UML"] },
  pic: { name: "PIC16F18877 Interfacing", badge: "Embedded", cat: "Embedded", date: "Jan – Mar 2025", desc: "8 hardware-tested exercises: a multiplexed 7-segment counter, HD44780 LCD in 4-bit mode, 10-bit ADC light sensing and a five-switch priority controller.", tags: ["XC8 C", "MPLAB X", "E-blocks2"] },
  asm: { name: "PIC Assembly", badge: "Embedded", cat: "Embedded", date: "Oct – Dec 2024", desc: "Cycle-counted delay routines at 20 MHz tuned to 1 Hz, a three-switch LED sequencer, lookup-table 7-segment drivers and LCD subroutines.", tags: ["Assembly", "PIC16F18877"] },
  verilog: { name: "Digital Systems Design", badge: "HDL", cat: "Digital", date: "Oct – Dec 2024", desc: "A programmable pulse generator (50 μs pulses, 100–800 μs period) via a top-down FSM, re-implemented in Verilog at gate and functional level.", tags: ["Verilog", "Quartus", "CPLD"] },
  rc: { name: "RC Transient Analysis", badge: "Lab", cat: "Digital", date: "Dec 2023", desc: "Verified RC charge/discharge theory (τ = 100 s) over 5τ, explaining deviations from tolerance, wire resistance and measurement limits.", tags: ["Oscilloscope", "Multimeter"] },
};

export type ModeContent = {
  word: string;
  label: string;
  line: string;
  projects: string[];
  bmw: string[];
  bmwTech: string[];
  skills: Record<string, string[]>;
  stackLine: string;
  cv: { href: string; file: string; label: string };
};

export const MODES: Record<Mode, ModeContent> = {
  software: {
    word: "software.",
    label: "Software",
    line: "Full-stack and AI engineer. Five hackathon wins, most recently 1st place solo at the Grok Bot Real Estate Hackathon. BMW Group placement, EY data analyst. Next.js, Python, agents and a fair amount of blockchain.",
    projects: ["canary", "sip", "passage", "chainsentinel", "hookline", "shadowcall", "designmd", "peg", "sf", "luffa", "htw", "gofish", "foodo", "bank", "hyper", "weather", "attend"],
    bmw: [
      "Doubled KPI coverage from 13 to 27 with an Oracle APEX logistics dashboard, presented to 60+ colleagues and senior management.",
      "Raised master-data quality from 52% to 61% in one month with an Excel validation workbook.",
      "Projected a 15% throughput gain on a semi-automated forklift system.",
      "Wrote PLC ladder logic and supplier specifications for Industry 4.0 projects.",
    ],
    bmwTech: ["Oracle APEX", "SQL", "PL/SQL", "SAP", "Excel/VBA", "Chart.js", "TIA Portal V17"],
    skills: {
      Languages: ["Python", "TypeScript", "JavaScript", "Java", "C", "C++", "SQL", "MATLAB", "VBA", "Assembly", "Verilog HDL"],
      "Web & Backend": ["Next.js", "React", "Node.js", "Flask", "FastAPI", "REST APIs", "SQLAlchemy", "MySQL", "MongoDB", "Oracle APEX"],
      "AI & Data": ["LangGraph", "LangChain", "Gemini API", "Ollama", "Pandas", "NumPy", "Dash", "SAP Analytics Cloud", "Predictive Modelling"],
      Blockchain: ["Starknet", "Polkadot", "Radix", "Stellar SDK", "Solidity"],
      Tools: ["Git", "SAP", "Excel/VBA", "NetBeans", "UML"],
    },
    stackLine: "Languages, frameworks and platforms I ship software with. Switch to Electronics at the top to see the hardware side.",
    cv: { href: "/cv/Ibad_Zuberi_CV_Software.pdf", file: "Ibad_Zuberi_CV_Software.pdf", label: "Download Software CV" },
  },
  electronics: {
    word: "hardware.",
    label: "Electronics",
    line: "Controls and embedded engineer. PLC ladder logic during a BMW Group placement, register-level PIC firmware, Verilog FSMs and robots built from scratch.",
    projects: ["sip", "sf", "luffa", "htw", "pic", "asm", "verilog", "weather", "robot", "voice", "rc"],
    bmw: [
      "Programmed PLC ladder logic (TIA Portal V17, WAGO e!COCKPIT) for automated material-flow systems, including live status lamps for transport robots.",
      "Projected a 15% throughput gain on a semi-automated forklift system by diagnosing serial-communication faults.",
      "Authored technical specifications and functional requirements issued to suppliers.",
      "Doubled KPI coverage from 13 to 27 with an Oracle APEX logistics dashboard.",
    ],
    bmwTech: ["TIA Portal V17", "WAGO e!COCKPIT", "Oracle APEX", "SQL", "SAP", "Excel/VBA"],
    skills: {
      "Controls & Automation": ["PLC (Ladder Logic)", "Siemens TIA Portal V17", "WAGO e!COCKPIT", "LabVIEW", "Industry 4.0"],
      "Embedded & Hardware": ["PIC16F18877", "Assembly", "XC8 C", "Arduino", "Raspberry Pi Pico", "FPGA", "Sensor Integration", "Soldering", "Breadboarding"],
      Programming: ["C", "C++", "Python", "Assembly", "Verilog HDL", "MATLAB", "Java", "TypeScript", "SQL", "VBA"],
      "Design & Tools": ["Fusion 360", "Quartus", "PSPICE/OrCAD", "MPLAB X", "Git", "Oracle APEX", "SAP"],
    },
    stackLine: "Controllers, chips and tools I build hardware with. Switch to Software at the top to see the code side.",
    cv: { href: "/cv/Ibad_Zuberi_CV_Electronics.pdf", file: "Ibad_Zuberi_CV_Electronics.pdf", label: "Download Electronics CV" },
  },
};

export type Hack = { place: string; event: string; date: string; project: string; gh: string; desc: string; live?: string };

export const HACKS: Hack[] = [
  { place: "1st", event: "Grok Bot Real Estate Hackathon · V7", date: "Nov 2026", project: "Canary", gh: "https://github.com/Ibad-10/canary", live: "https://canary-eight-murex.vercel.app", desc: "Built solo in a day: forecasts property-loan covenant breaches 3 to 6 months ahead from building data and ranks which loans to review first." },
  { place: "2nd", event: "The PROBLEM day", date: "Oct 2026", project: "Passage", gh: "https://github.com/Ibad-10/passage", live: "https://passage-gamma.vercel.app", desc: "Team build. An export-compliance desk for defence and dual-use startups: AI suggests, an expert signs, and every step is on the record. 2nd place on 31 October 2026." },
  { place: "Award", event: "Mubit Night Shift · Best Use Case of Banyan Sapling", date: "Oct 2026", project: "ChainSentinel", gh: "https://github.com/Ibad-10/Chainsentinel", live: "https://chainsentinel-nine.vercel.app", desc: "On-chain AML triage for Ethereum and Bitcoin wallets: 8 laundering checks gather evidence and Banyan Sapling judges it against a written policy." },
  { place: "1st", event: "Brunel Hack 25 · Radix bounty", date: "Jul 2025", project: "StreamFlow", gh: "https://github.com/Sahid-m/radix-hack", desc: "Decentralised creator tipping on the Radix blockchain with real-time tip analytics. 1st in the Radix bounty." },
  { place: "3rd", event: "Brunel Hack 25 · Luffa bounty", date: "Jul 2025", project: "LuffaBot", gh: "https://github.com/Sahid-m/luffa-ai-bot", desc: "A LangGraph multi-tool agent on the Luffa messaging platform, demoed as RPS AI Bot, built and shipped in under 24 hours. 3rd in the Luffa/Endless bounty." },
  { place: "1st", event: "Encode AI London Hackathon", date: "Apr 2025", project: "Hack the Wallet", gh: "https://github.com/Sahid-m/HackTheWallet", desc: "Won the main track plus two sponsor bounties with a Starknet game where players persuade an AI to return locked crypto." },
  { place: "3rd", event: "Royal Hackaway v8 · Verdn track", date: "Feb 2025", project: "Foodo-Baggins", gh: "https://github.com/Sahid-m/foodo_baggins", desc: "An AI nutrition tracker that turns meals into sustainability Green Points." },
];

export const EXPERIENCE = (m: ModeContent) => [
  { company: "BMW Group", role: "Logistics Planning Intern · Controls & Automation", period: "Jul 2025 – Sep 2026", points: m.bmw, tech: m.bmwTech },
  { company: "EY", role: "Data Analyst", period: "Jul – Sep 2024", points: ["Analysed 20,000+ data entries in SAP Analytics Cloud.", "Built 5 interactive dashboards and SAC predictive models for forecasting.", "Designed custom calculations for key business metrics."], tech: ["SAP Analytics Cloud", "Excel"] },
  { company: "Cloud Nebula Enterprises", role: "Web Developer", period: "Jun – Sep 2024", points: ["Built a web-based data analysis tool handling 60,000+ entries.", "Cut data interpretation time by 25% with interactive visualisations.", "Worked with 3+ domain experts to turn requirements into features."], tech: ["Python", "Pandas", "Dash", "NumPy"] },
];

export const PHOTOS = ["01", "02", "04", "06", "07", "09", "13", "14", "18", "19", "21"]
  .map((n) => `/lightroom/photo-${n}.jpeg`)
  .concat(["/lightroom/lambo.jpeg"]);

export const WORDS = ["software.", "hardware.", "robots.", "PLC logic.", "AI agents.", "firmware.", "dashboards.", "smart contracts.", "circuits."];

export const NAV: [string, string][] = [
  ["about", "About"],
  ["work", "Work"],
  ["hackathons", "Hackathons"],
  ["skills", "Skills"],
  ["photography", "Photography"],
];

export const STATS = [
  { n: 1, suffix: "st", label: "of 30 in the cohort, First Class" },
  { n: 5, suffix: "×", label: "hackathon wins" },
  { n: 3, suffix: " roles", label: "BMW Group, EY, Cloud Nebula" },
  { n: 20, suffix: "+", label: "projects built" },
];

export const TICKER = ["5 hackathon wins", "1st · Grok Bot Real Estate Hackathon", "2nd · The PROBLEM day", "Best Use Case · Mubit Night Shift", "1st · Encode AI London", "1st · Radix bounty · Brunel Hack 25", "3rd · Luffa bounty · Brunel Hack 25", "EY · Data Analyst", "First Class · 1st of 30", "Software", "Electronics", "Controls"];

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Ibad-10" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ibad-ullah-zuberi/" },
  { label: "Email", href: "mailto:zuberi.ibad@gmail.com" },
  { label: "Software CV", href: "/cv/Ibad_Zuberi_CV_Software.pdf" },
  { label: "Electronics CV", href: "/cv/Ibad_Zuberi_CV_Electronics.pdf" },
];

const ICON: Record<string, string> = {
  Python: "python", TypeScript: "typescript", JavaScript: "javascript", Java: "openjdk", C: "c", "C++": "cplusplus", SQL: "mysql", MySQL: "mysql",
  "Next.js": "nextdotjs", React: "react", "Node.js": "nodedotjs", Flask: "flask", FastAPI: "fastapi", MongoDB: "mongodb", SQLAlchemy: "sqlalchemy",
  LangChain: "langchain", "Gemini API": "googlegemini", Ollama: "ollama", Pandas: "pandas", NumPy: "numpy", Dash: "plotly",
  "SAP Analytics Cloud": "sap", SAP: "sap", Polkadot: "polkadot", "Stellar SDK": "stellar", Solidity: "solidity", Git: "git", Arduino: "arduino",
  "Raspberry Pi Pico": "raspberrypi", PIC16F18877: "microchiptechnology", "MPLAB X": "microchiptechnology", "XC8 C": "microchiptechnology",
  Quartus: "intel", FPGA: "intel", "REST APIs": "openapiinitiative",
};

export const iconUrl = (n: string): string => (ICON[n] ? `https://cdn.simpleicons.org/${ICON[n]}/ffffff` : "");

export const mono = (n: string): string =>
  n
    .replace(/[^A-Za-z0-9+#]/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
