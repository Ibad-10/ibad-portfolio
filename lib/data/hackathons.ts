export type Hackathon = { event: string; result: string; project: string; year: string; podium: boolean };

export const hackathons: Hackathon[] = [
  { event: "Encode AI London Hackathon", result: "1st place", project: "Hack the Wallet", year: "2025", podium: true },
  { event: "Brunel University Hack", result: "1st place", project: "LuffaBot AI Assistant", year: "2024", podium: true },
  { event: "Radix Hack", result: "1st place", project: "StreamFlow", year: "2024", podium: true },
  { event: "Royal Hackaway v8 (Verdn track)", result: "3rd place", project: "Foodo-Baggins", year: "2024", podium: true },
  { event: "EasyA x Polkadot Hackathon London", result: "Finalist", project: "Go Fish", year: "2025", podium: false },
];
