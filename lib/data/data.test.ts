import { describe, expect, it } from "vitest";
import { projects, PEGBOARD_REPO, PEGBOARD_REPO_PUBLIC, experience, hackathons, profile } from "./index";

describe("content data", () => {
  it("has unique, URL-safe project slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("gives every project a stack and summary", () => {
    for (const p of projects) {
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.summary.length).toBeGreaterThan(10);
    }
  });

  it("only uses https or mailto links", () => {
    const links = [
      ...projects.flatMap((p) => p.links.map((l) => l.href)),
      profile.linkedin,
      profile.github,
      profile.site,
    ];
    for (const href of links) expect(href).toMatch(/^(https:\/\/|mailto:)/);
  });

  it("does not link to the Pegboard repo while it is private", () => {
    const pegboard = projects.find((p) => p.slug === "pegboard")!;
    const hasRepo = pegboard.links.some((l) => l.href === PEGBOARD_REPO);
    expect(hasRepo).toBe(PEGBOARD_REPO_PUBLIC);
  });

  it("has experience and hackathon entries", () => {
    expect(experience.length).toBeGreaterThan(0);
    expect(hackathons.length).toBeGreaterThan(0);
  });
});

import { trophyTier, about } from "./index";

describe("phase 2 data", () => {
  it("maps results to trophy tiers", () => {
    expect(trophyTier("1st place")).toBe("gold");
    expect(trophyTier("3rd place")).toBe("bronze");
    expect(trophyTier("Finalist")).toBe("silver");
  });
  it("has about copy and interests", () => {
    expect(about.paragraphs.length).toBeGreaterThan(0);
    expect(about.interests.length).toBeGreaterThan(0);
  });
});
