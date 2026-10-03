export const profile = {
  name: "Ibad Ullah Zuberi",
  shortName: "Ibad Zuberi",
  email: "Zuberi.Ibad@gmail.com",
  phone: "+44 7742 420404",
  location: "London, UK",
  linkedin: "https://linkedin.com/in/ibad-ullah-zuberi",
  github: "https://github.com/Ibad-10",
  site: "https://ibad-portfolio-three.vercel.app",
  cv: "/Ibad_CV.pdf",
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
