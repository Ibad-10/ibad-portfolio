import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { HACKS, MODES, PHOTOS, PROJECTS, SOCIALS, iconUrl, mono } from "./site";

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
      ...Object.values(PROJECTS).flatMap((p) => [p.gh, p.video, p.live, ...(p.imgs ?? [])]),
      ...HACKS.map((h) => h.gh),
    ].filter(Boolean) as string[];
    for (const l of links) expect(l.startsWith("https://"), l).toBe(true);
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

  it("lists five hackathons with one third place and one finalist", () => {
    expect(HACKS).toHaveLength(5);
    expect(HACKS.filter((h) => h.place === "1st")).toHaveLength(3);
    expect(HACKS.filter((h) => h.place === "3rd")).toHaveLength(1);
    expect(HACKS.filter((h) => h.place === "Finalist")).toHaveLength(1);
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
