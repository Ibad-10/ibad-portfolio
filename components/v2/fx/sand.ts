import { onScreen, reduced } from "./util";

type RGB = [number, number, number];
const PAL: (RGB | null)[] = [null, [0, 153, 255], [122, 202, 255], [0, 104, 173], [216, 236, 255], [40, 120, 220], [255, 255, 255]];
const pick = (): number => {
  const r = Math.random();
  return r < 0.38 ? 1 : r < 0.62 ? 5 : r < 0.8 ? 3 : r < 0.94 ? 2 : r < 0.99 ? 4 : 6;
};

type Particle = { x: number; y: number; vx: number; vy: number; c: number };

/** Falling-sand playground. Mount into a positioned element; call destroy() to clean up. */
export class SandField {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private off: HTMLCanvasElement;
  private octx: CanvasRenderingContext2D;
  private img!: ImageData;
  private cell = 4;
  private parts: Particle[] = [];
  private p = { x: -99, y: -99, px: -99, py: -99, vx: 0, vy: 0, in: false, down: false };
  private W = 0;
  private H = 0;
  private grid: Uint8Array = new Uint8Array(0);
  private f = 0;
  private full = false;
  private vis = true;
  private raf = 0;
  private ro: ResizeObserver;
  private io: IntersectionObserver;
  private dead = false;

  constructor(private host: HTMLElement) {
    this.canvas = document.createElement("canvas");
    this.canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    host.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.off = document.createElement("canvas");
    this.octx = this.off.getContext("2d") as CanvasRenderingContext2D;
    this.resize();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    window.addEventListener("pointermove", this.onMove, { passive: true });
    window.addEventListener("pointerdown", this.onDown);
    window.addEventListener("pointerup", this.onUp);
    this.io = onScreen(host, (v) => (this.vis = v));
    const loop = () => {
      if (this.dead) return;
      this.raf = requestAnimationFrame(loop);
      if (this.vis) this.step();
    };
    this.raf = requestAnimationFrame(loop);
  }

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerdown", this.onDown);
    window.removeEventListener("pointerup", this.onUp);
    this.ro.disconnect();
    this.io.disconnect();
    this.canvas.remove();
  }

  private onMove = (e: PointerEvent) => this.move(e.clientX, e.clientY);
  private onDown = (e: PointerEvent) => {
    this.move(e.clientX, e.clientY);
    if (this.p.in) {
      this.p.down = true;
      this.blast();
    }
  };
  private onUp = () => {
    this.p.down = false;
  };

  private resize() {
    const r = this.host.getBoundingClientRect();
    const W = Math.max(8, Math.floor(r.width / this.cell));
    const H = Math.max(8, Math.floor(r.height / this.cell));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.round(r.width * dpr);
    this.canvas.height = Math.round(r.height * dpr);
    if (W === this.W && H === this.H) return;
    const old = this.grid;
    const oW = this.W;
    const oH = this.H;
    this.W = W;
    this.H = H;
    this.grid = new Uint8Array(W * H);
    if (oW > 0) {
      for (let y = 0; y < Math.min(H, oH); y++) for (let x = 0; x < Math.min(W, oW); x++) this.grid[(H - 1 - y) * W + x] = old[(oH - 1 - y) * oW + x];
    } else this.seed();
    this.off.width = W;
    this.off.height = H;
    this.img = this.octx.createImageData(W, H);
  }

  private seed() {
    const { W, H, grid } = this;
    for (let x = 0; x < W; x++) {
      const h = Math.floor(H * (0.07 + 0.045 * Math.sin(x * 0.03) + 0.03 * Math.sin(x * 0.09 + 1) + 0.02 * Math.sin(x * 0.011 + 2)));
      for (let y = 0; y < h; y++) grid[(H - 1 - y) * W + x] = pick();
    }
  }

  private move(cx: number, cy: number) {
    const r = this.host.getBoundingClientRect();
    this.p.in = cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
    this.p.x = (cx - r.left) / this.cell;
    this.p.y = (cy - r.top) / this.cell;
  }

  private blast() {
    const { W, H, grid, p } = this;
    const R = 12;
    for (let dy = -R; dy <= R; dy++)
      for (let dx = -R; dx <= R; dx++) {
        const d = Math.hypot(dx, dy);
        if (d > R) continue;
        const x = Math.round(p.x + dx);
        const y = Math.round(p.y + dy);
        if (x < 0 || y < 0 || x >= W || y >= H) continue;
        const i = y * W + x;
        if (!grid[i]) continue;
        const k = ((R - d) / R) * 5 + 1.5;
        this.parts.push({ x, y, vx: (dx / (d || 1)) * k + (Math.random() - 0.5), vy: (dy / (d || 1)) * k - 2.5 - Math.random() * 2, c: grid[i] });
        grid[i] = 0;
      }
    for (let n = 0; n < 60; n++) {
      const a = Math.random() * Math.PI * 2;
      const s = 2 + Math.random() * 4;
      this.parts.push({ x: p.x, y: p.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2, c: pick() });
    }
  }

  private step() {
    const { W, H, grid, p } = this;
    if (!grid.length) return;
    this.f++;
    p.vx = p.x - p.px;
    p.vy = p.y - p.py;
    p.px = p.x;
    p.py = p.y;
    const sp = Math.hypot(p.vx, p.vy);
    if (this.f % 30 === 0) {
      let count = 0;
      for (let i = 0; i < grid.length; i++) if (grid[i]) count++;
      this.full = count > W * H * 0.32;
    }
    if (p.in && !reduced()) {
      if ((sp > 0.15 || p.down) && !this.full && this.parts.length < 5000) {
        const n = p.down ? 14 : Math.min(10, 2 + sp * 1.2);
        for (let k = 0; k < n; k++)
          this.parts.push({ x: p.x + (Math.random() - 0.5) * 3, y: p.y + (Math.random() - 0.5) * 3, vx: p.vx * 0.25 + (Math.random() - 0.5) * 0.8, vy: p.vy * 0.25 + (Math.random() - 0.5) * 0.6, c: pick() });
      }
      if (sp > 1.2) {
        const R = 4;
        for (let dy = -R; dy <= R; dy++)
          for (let dx = -R; dx <= R; dx++) {
            if (dx * dx + dy * dy > R * R) continue;
            const x = Math.round(p.x + dx);
            const y = Math.round(p.y + dy);
            if (x < 0 || y < 0 || x >= W || y >= H) continue;
            const i = y * W + x;
            if (grid[i]) {
              this.parts.push({ x, y, vx: p.vx * 0.7 + (Math.random() - 0.5), vy: p.vy * 0.7 - 1 - Math.random(), c: grid[i] });
              grid[i] = 0;
            }
          }
      }
    }
    if (this.full && this.f % 2 === 0) for (let k = 0; k < 24; k++) grid[(H - 1) * W + ((Math.random() * W) | 0)] = 0;

    // falling particles
    const keep: Particle[] = [];
    for (const q of this.parts) {
      q.vy = Math.min(q.vy + 0.28, 6);
      q.vx *= 0.985;
      const steps = Math.max(1, Math.ceil(Math.max(Math.abs(q.vx), Math.abs(q.vy))));
      let landed = false;
      for (let s = 0; s < steps; s++) {
        q.x += q.vx / steps;
        q.y += q.vy / steps;
        if (q.x < 0) {
          q.x = 0;
          q.vx *= -0.4;
        }
        if (q.x > W - 1) {
          q.x = W - 1;
          q.vx *= -0.4;
        }
        if (q.y < -200) break;
        const ix = Math.round(q.x);
        const iy = Math.round(q.y);
        if (iy >= H - 1 || (iy >= -1 && iy + 1 >= 0 && grid[(iy + 1) * W + ix] && q.vy >= 0)) {
          let y = Math.min(iy, H - 1);
          while (y >= 0 && grid[y * W + ix]) y--;
          if (y >= 0) grid[y * W + ix] = q.c;
          landed = true;
          break;
        }
      }
      if (!landed && q.y > -200) keep.push(q);
    }
    this.parts = keep;

    // cellular sand
    for (let y = H - 2; y >= 0; y--) {
      const ltr = (this.f + y) & 1;
      const row = y * W;
      for (let j = 0; j < W; j++) {
        const x = ltr ? j : W - 1 - j;
        const i = row + x;
        const g = grid[i];
        if (!g) continue;
        const b = i + W;
        if (!grid[b]) {
          grid[b] = g;
          grid[i] = 0;
          continue;
        }
        const d = Math.random() < 0.5 ? -1 : 1;
        if (x + d >= 0 && x + d < W && !grid[b + d] && !grid[i + d]) {
          grid[b + d] = g;
          grid[i] = 0;
        } else if (x - d >= 0 && x - d < W && !grid[b - d] && !grid[i - d]) {
          grid[b - d] = g;
          grid[i] = 0;
        }
      }
    }

    // render
    const data = this.img.data;
    for (let i = 0, o = 0; i < grid.length; i++, o += 4) {
      const g = grid[i];
      const c = g ? PAL[g] : null;
      if (c) {
        data[o] = c[0];
        data[o + 1] = c[1];
        data[o + 2] = c[2];
        data[o + 3] = 255;
      } else data[o + 3] = 0;
    }
    for (const q of this.parts) {
      const ix = Math.round(q.x);
      const iy = Math.round(q.y);
      if (ix < 0 || iy < 0 || ix >= W || iy >= H) continue;
      const o = (iy * W + ix) * 4;
      const c = PAL[q.c];
      if (!c) continue;
      data[o] = c[0];
      data[o + 1] = c[1];
      data[o + 2] = c[2];
      data[o + 3] = 255;
    }
    this.octx.putImageData(this.img, 0, 0);
    const ctx = this.ctx;
    const rect = this.host.getBoundingClientRect();
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const sw = W * this.cell * (cw / (rect.width || 1));
    const sh = H * this.cell * (ch / (rect.height || 1));
    ctx.clearRect(0, 0, cw, ch);
    ctx.imageSmoothingEnabled = true;
    ctx.globalAlpha = 0.55;
    ctx.filter = "blur(10px)";
    ctx.drawImage(this.off, 0, 0, sw, sh);
    ctx.filter = "none";
    ctx.globalAlpha = 1;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.off, 0, 0, sw, sh);
  }
}
