import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(path.join(__dirname, "../app/globals.css"), "utf8");

function block(selector: string): Record<string, number[]> {
  const re = new RegExp(`${selector.replace(/[[\]"]/g, "\\$&")}\\s*\\{([^}]*)\\}`);
  const body = css.match(re)?.[1] ?? "";
  const out: Record<string, number[]> = {};
  const re2 = /--([a-z-]+):\s*(\d+) (\d+) (\d+);/g;
  let m: RegExpExecArray | null;
  while ((m = re2.exec(body)) !== null) {
    out[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])];
  }
  return out;
}

const lin = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = ([r, g, b]: number[]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a: number[], b: number[]) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

describe.each([
  ["dark", ':root,\n[data-theme="dark"]'],
  ["light", ':root[data-theme="light"]'],
])("%s theme contrast", (_name, selector) => {
  const t = block(selector);
  it("body text on background >= 4.5", () => expect(ratio(t.text, t.bg)).toBeGreaterThanOrEqual(4.5));
  it("muted text on background >= 4.5", () => expect(ratio(t.muted, t.bg)).toBeGreaterThanOrEqual(4.5));
  it("muted text on panel >= 4.5", () => expect(ratio(t.muted, t.panel)).toBeGreaterThanOrEqual(4.5));
  it("blue links on background >= 4.5", () => expect(ratio(t.blue, t.bg)).toBeGreaterThanOrEqual(4.5));
  it("blue links on panel >= 4.5", () => expect(ratio(t.blue, t.panel)).toBeGreaterThanOrEqual(4.5));
  it("white text on blue-strong fills >= 4.5", () => expect(ratio([255, 255, 255], t["blue-strong"])).toBeGreaterThanOrEqual(4.5));
  it("gold text on background and panel >= 4.5", () => {
    expect(ratio(t.gold, t.bg)).toBeGreaterThanOrEqual(4.5);
    expect(ratio(t.gold, t.panel)).toBeGreaterThanOrEqual(4.5);
  });
});
