import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { HACKS, MODES, PHOTOS, PROJECTS, SOCIALS, STATS, TICKER, iconUrl, mono } from "./site";

const pub = (href: string) => path.join(__dirname, "../public", href);

describe("site content", () => {
  it("only references projects that exist, with no repeats per mode", () => {
    for (const m of Object.values(MODES)) {
      expect(new Set(m.projects).size).toBe(m.projects.length);
      for (const k of m.projects) expect(PROJECTS[k], k).toBeDefined();
    }
  });

  it("gives every project a name, description and tags", () => {
    for (const p of Object.values(PROJECTS)) {
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.desc.length).toBeGreaterThan(20);
      expect(p.tags.length).toBeGreaterThan(0);
    }
  });

  it("uses https links only", () => {
    const links = [
      ...Object.values(PROJECTS).flatMap((p) => [p.gh, p.video, p.live, ...(p.imgs ?? []).filter((src) => !src.startsWith("/"))]),
      ...HACKS.flatMap((h) => [h.gh, h.live]),
    ].filter(Boolean) as string[];
    for (const l of links) expect(l.startsWith("https://"), l).toBe(true);
  });

  it("points every local project image at a file in public/projects", () => {
    const imgs = Object.values(PROJECTS).flatMap((p) => p.imgs ?? []).filter((src) => src.startsWith("/"));
    expect(imgs.length).toBeGreaterThan(0);
    for (const src of imgs) {
      expect(src.startsWith("/projects/"), src).toBe(true);
      expect(existsSync(pub(src)), src).toBe(true);
    }
  });

  it("does not link to the private Pegboard repo", () => {
    const peg = PROJECTS.peg;
    expect(peg.gh).toBeUndefined();
    expect(peg.live).toBe("https://getpegboard.co.uk");
  });

  it("points every CV link at a file in public/", () => {
    for (const m of Object.values(MODES)) expect(existsSync(pub(m.cv.href)), m.cv.href).toBe(true);
    for (const s of SOCIALS.filter((s) => s.href.startsWith("/"))) expect(existsSync(pub(s.href)), s.href).toBe(true);
  });

  it("points every gallery photo and portrait at a file in public/", () => {
    for (const p of [...PHOTOS, "/photos/hero.jpeg", "/photos/hackathon.jpeg"]) expect(existsSync(pub(p)), p).toBe(true);
  });

  it("lists the hackathon results, with five headline wins", () => {
    expect(HACKS.map((h) => [h.place, h.project, h.date, h.event])).toEqual([
      ["1st", "Canary", "Nov 2026", "Grok Bot Real Estate Hackathon · V7"],
      ["2nd", "Passage", "Oct 2026", "The PROBLEM day"],
      ["Award", "ChainSentinel", "Oct 2026", "Mubit Night Shift · Best Use Case of Banyan Sapling"],
      ["1st", "StreamFlow", "Jul 2025", "Brunel Hack 25 · Radix bounty"],
      ["3rd", "LuffaBot", "Jul 2025", "Brunel Hack 25 · Luffa bounty"],
      ["1st", "Hack the Wallet", "Apr 2025", "Encode AI London Hackathon"],
      ["3rd", "Foodo-Baggins", "Feb 2025", "Royal Hackaway v8 · Verdn track"],
    ]);
    expect(HACKS.filter((h) => h.place === "1st")).toHaveLength(3);
    expect(HACKS.filter((h) => h.place === "2nd")).toHaveLength(1);
    expect(HACKS.filter((h) => h.place === "Award")).toHaveLength(1);
    expect(HACKS.filter((h) => h.place === "3rd")).toHaveLength(2);
    expect(HACKS.filter((h) => h.place === "Finalist")).toHaveLength(0);
    expect(HACKS.some((h) => h.project === "Go Fish" || h.event.includes("Polkadot"))).toBe(false);
    expect(STATS.find((s) => s.label === "hackathon wins")?.n).toBe(5);
    expect(STATS.find((s) => s.label === "projects built")?.n).toBe(20);
    expect(MODES.software.line).toContain("Five hackathon wins");
    expect(TICKER[0]).toBe("5 hackathon wins");
  });

  it("corrects the dated projects and drops the old Brunel first-place claim", () => {
    expect(PROJECTS.foodo.date).toBe("Feb 2025");
    expect(PROJECTS.sf.date).toBe("Jul 2025");
    expect(PROJECTS.sf.badge).toBe("1st · Radix bounty");
    expect(PROJECTS.luffa.date).toBe("Jul 2025");
    expect(PROJECTS.luffa.badge).toBe("3rd · Luffa bounty");
    expect(PROJECTS.luffa.gold).toBeUndefined();
    expect(PROJECTS.voice.date).toBe("Jan 2024");
    expect(PROJECTS.passage.badge).toBe("2nd · The PROBLEM day");
    expect(PROJECTS.sip.imgs).toBeUndefined();
    expect(PROJECTS.canary.imgs?.[0]).toBe("/projects/canary.jpg");
  });

  it("builds icon URLs and monograms", () => {
    expect(iconUrl("Python")).toBe("https://cdn.simpleicons.org/python/ffffff");
    expect(iconUrl("Soldering")).toBe("");
    expect(mono("Raspberry Pi Pico")).toBe("RPP");
    expect(mono("C++")).toBe("C");
  });
});

describe("privacy", () => {
  it("never ships a phone number in site source or CV text", () => {
    const root = path.join(__dirname, "..");
    const hits: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        if (["node_modules", ".next", ".git", "docs", "public", "package-lock.json"].includes(name)) continue;
        const full = path.join(dir, name);
        if (statSync(full).isDirectory()) walk(full);
        else if (/\.(tsx?|css|md|json)$/.test(name) && !name.endsWith("site.test.ts") && /7742|420404/.test(readFileSync(full, "utf8"))) hits.push(full);
      }
    };
    walk(root);
    expect(hits).toEqual([]);
  });
});
