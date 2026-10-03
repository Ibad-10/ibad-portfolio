export const profile = {
  name: "Ibad Ullah Zuberi",
  shortName: "Ibad Zuberi",
  email: "Zuberi.Ibad@gmail.com",
  phone: "[phone removed]",
  location: "London, UK",
  linkedin: "https://linkedin.com/in/ibad-ullah-zuberi",
  github: "https://github.com/Ibad-10",
  site: "https://ibad-portfolio-three.vercel.app",
  cv: "/Ibad_CV.pdf",
  cvs: [
    { label: "Software CV", href: "/Zuberi_CV_Software.pdf" },
    { label: "Electronics CV", href: "/Zuberi_CV_Electronics.pdf" },
  ],
  degree: "BEng (Hons) Computer Systems Engineering, with Industrial Placement",
  university: "Brunel University London",
  standing: "Predicted First Class, ranked 1st of 30",
  tagline:
    "Computer Systems Engineering student with a completed 15-month BMW placement, a live product and a record of hackathon wins.",
  position: "Engineer",
} as const;

export const education = {
  school: "Brunel University London",
  degree: profile.degree,
  dates: "Sep 2023 – 2027 (expected)",
  results: [
    "Year 1 (2023–24): A+ (First Class)",
    "Year 2 (2024–25): A+ (First Class)",
    "Topper (1st of 30), Course Representative, Member of IET and DSS Brunel",
  ],
} as const;

export const about = {
  paragraphs: [
    "I am a Computer Systems Engineering student at Brunel University London, predicted a First and ranked 1st of 30 in my cohort. I just finished a 15-month placement with BMW Group at Plant Hams Hall, where I built a 27-KPI logistics dashboard, commissioned a semi-automated forklift system and cleaned up master data across two systems.",
    "Outside placement I build things quickly and ship them: Pegboard, a family chore and pocket-money ledger that is live, and several hackathon projects in AI, blockchain and embedded systems, including three first places.",
  ],
  interests: ["Football (FC Barcelona fan)", "FIFA and EA FC", "Photography"],
} as const;
