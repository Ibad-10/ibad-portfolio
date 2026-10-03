export type Stat = { label: string; value: string };

export type Experience = {
  slug: string;
  club: string;
  role: string;
  location?: string;
  dates: string;
  note?: string;
  stats: Stat[];
  highlights: string[];
};

export const experience: Experience[] = [
  {
    slug: "bmw",
    club: "BMW Group",
    role: "Logistics Planning Intern (Controls & Automation)",
    location: "Plant Hams Hall, UK",
    dates: "Jul 2025 – Sep 2026",
    note: "15-month placement, completed",
    stats: [
      { label: "KPIs delivered", value: "27" },
      { label: "Source systems", value: "5" },
      { label: "SQL queries", value: "500+" },
      { label: "Tablets configured", value: "7" },
      { label: "Launch audience", value: "60+" },
    ],
    highlights: [
      "Doubled KPI coverage from 13 to 27 (+108%) by building an Oracle APEX logistics dashboard with 500+ SQL queries and automated feeds from 5 source systems, presented to 60+ colleagues and senior management.",
      "Identified an estimated £450k per year of avoidable handling cost in taxi parts by building an Excel/SAP comparison workflow that matched two master-data systems and flagged 2,000+ wrong storage locations and 250+ faulty parts.",
      "Raised taxi-part data quality from 52% to 61% in one month by assigning an owner, status and approval to every correction across departments.",
      "Projected £20k per year in savings (15% throughput gain, about 700 hours per year) on a semi-automated forklift system by configuring 7 rugged tablets, diagnosing RS232 faults and writing recovery procedures.",
      "Saved about £30k of RFID tag hardware by retrieving chips from 300 scrapped engine frames in one day, working with the maintenance team.",
      "Gave staff live visibility of autonomous transport robot operation by programming PLC status lamps (WAGO e!COCKPIT) linked to the robots' control system.",
    ],
  },
  {
    slug: "ey",
    club: "EY (Ernst & Young)",
    role: "Data Analyst",
    location: "London, UK",
    dates: "Jul 2024 – Sep 2024",
    stats: [
      { label: "Entries analysed", value: "20,000+" },
      { label: "Dashboards", value: "5" },
    ],
    highlights: [
      "Enhanced decision accuracy by analysing 20,000+ data entries in SAP Analytics Cloud.",
      "Reduced planning time with SAC predictive modelling, and cut data interpretation time by creating 5 interactive dashboards.",
      "Optimised key business metrics by designing and implementing custom calculations.",
    ],
  },
  {
    slug: "cloud-nebula",
    club: "Cloud Nebula Enterprises",
    role: "Web Developer",
    dates: "Jun 2024 – Sep 2024",
    stats: [
      { label: "Records handled", value: "60,000+" },
      { label: "Faster interpretation", value: "25%" },
    ],
    highlights: [
      "Boosted financial decision-making efficiency by developing a web-based data analysis tool that handles 60,000+ entries.",
      "Reduced data interpretation time by 25% by implementing interactive visualisations.",
      "Translated business requirements into technical solutions by working closely with 3+ domain experts.",
    ],
  },
];
