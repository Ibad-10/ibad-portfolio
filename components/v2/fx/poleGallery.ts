import { compile, onScreen, reduced } from "./util";

const VS = `attribute vec2 aPos;uniform mat4 uProj;uniform vec3 uPos;uniform float uAng,uFlare,uWind,uHover,uCam,uR;uniform vec2 uSize;
varying vec2 vUv;varying float vDepth;
void main(){vUv=aPos;vec3 p=vec3((aPos.x-.5)*uSize.x,(aPos.y-.5)*uSize.y,0.);p.xy*=1.+uHover*.07;
 p.z+=sin(aPos.x*3.14159)*uWind; p.z-=p.x*p.x/(2.*uR);
 float c=cos(uAng),s=sin(uAng);vec3 w=vec3(c*p.x+s*p.z,p.y,-s*p.x+c*p.z)+uPos;
 vec2 o=normalize(uPos.xz+vec2(.0001));w.xz+=o*(w.y*w.y)*uFlare;
 vDepth=w.z;gl_Position=uProj*vec4(w.x,w.y,w.z-uCam,1.);}`;
const FS = `precision highp float;uniform sampler2D uTex;uniform vec2 uSize;uniform float uImgAsp,uRad,uHover,uLoaded;
varying vec2 vUv;varying float vDepth;
void main(){vec2 p=(vUv-.5)*uSize;vec2 q=abs(p)-uSize*.5+uRad;float d=length(max(q,0.))+min(max(q.x,q.y),0.)-uRad;
 float a=1.-smoothstep(-.012,.012,d);float pa=uSize.x/uSize.y;vec2 uv=vUv;
 if(uImgAsp>pa){uv.x=(uv.x-.5)*pa/uImgAsp+.5;}else{uv.y=(uv.y-.5)*uImgAsp/pa+.5;}
 uv.y=1.-uv.y;vec3 col=mix(vec3(.07),texture2D(uTex,uv).rgb,uLoaded);
 col*=mix(.9,1.12,uHover);float k=smoothstep(-2.6,2.6,vDepth);col*=mix(.22,1.,k);
 float al=a*mix(.3,1.,k);gl_FragColor=vec4(col*al,al);}`;

function persp(fovy: number, asp: number, n: number, f: number): Float32Array {
  const t = 1 / Math.tan(fovy / 2);
  return new Float32Array([t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) / (n - f), -1, 0, 0, (2 * f * n) / (n - f), 0]);
}

type Item = { tex: WebGLTexture; asp: number; loaded: number; show: number; hover: number };
type Placed = { i: number; a: number; x: number; y: number; z: number };

export type PoleCallbacks = {
  onPick: (index: number) => void;
  onCount: (current: number) => void;
  onProgress: (p: number) => void;
};

/** Raw-WebGL photos orbiting a vertical pole, driven by scroll through a tall sticky room. */
export class PoleGallery {
  ok = false;
  private gl: WebGLRenderingContext | null;
  private u: Record<string, WebGLUniformLocation | null> = {};
  private items: Item[] = [];
  private nIdx = 0;
  private smooth = 0;
  private wind = 0;
  private mouse: [number, number, number, number] | null = null;
  private hover = -1;
  private lastCur = -1;
  private vis = true;
  private raf = 0;
  private io: IntersectionObserver;
  private dead = false;

  constructor(private canvas: HTMLCanvasElement, private room: HTMLElement, srcs: string[], private cb: PoleCallbacks) {
    const gl = (this.gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: true }));
    this.io = onScreen(room, (v) => (this.vis = v));
    if (!gl) return;
    this.ok = true;
    const prog = compile(gl, VS, FS);
    gl.useProgram(prog);
    const S = 24;
    const v: number[] = [];
    const idx: number[] = [];
    for (let y = 0; y <= S; y++) for (let x = 0; x <= S; x++) v.push(x / S, y / S);
    for (let y = 0; y < S; y++)
      for (let x = 0; x < S; x++) {
        const a = y * (S + 1) + x;
        idx.push(a, a + 1, a + S + 1, a + 1, a + S + 2, a + S + 1);
      }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
    this.nIdx = idx.length;
    const al = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(al);
    gl.vertexAttribPointer(al, 2, gl.FLOAT, false, 0, 0);
    ["uProj", "uPos", "uAng", "uFlare", "uWind", "uHover", "uCam", "uR", "uSize", "uTex", "uImgAsp", "uRad", "uLoaded"].forEach((n) => (this.u[n] = gl.getUniformLocation(prog, n)));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const setParams = () => {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };
    this.items = srcs.map((src) => {
      const tex = gl.createTexture() as WebGLTexture;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([18, 18, 18, 255]));
      setParams();
      const it: Item = { tex, asp: 1, loaded: 0, show: 0, hover: 0 };
      const img = new Image();
      img.onload = () => {
        if (this.dead) return;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        setParams();
        it.asp = img.width / img.height;
        it.loaded = 1;
      };
      img.src = src;
      return it;
    });

    canvas.addEventListener("pointermove", this.onMove);
    canvas.addEventListener("pointerleave", this.onLeave);
    canvas.addEventListener("click", this.onClick);
    let last = performance.now();
    const loop = (now: number) => {
      if (this.dead) return;
      this.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (this.vis) this.frame(dt, now / 1000);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private onMove = (e: PointerEvent) => {
    const r = this.canvas.getBoundingClientRect();
    this.mouse = [e.clientX - r.left, e.clientY - r.top, r.width, r.height];
  };
  private onLeave = () => {
    this.mouse = null;
  };
  private onClick = () => {
    if (this.hover >= 0) this.cb.onPick(this.hover);
  };

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    this.io.disconnect();
    this.canvas.removeEventListener("pointermove", this.onMove);
    this.canvas.removeEventListener("pointerleave", this.onLeave);
    this.canvas.removeEventListener("click", this.onClick);
  }

  private frame(dt: number, t: number) {
    const gl = this.gl as WebGLRenderingContext;
    const c = this.canvas;
    const N = this.items.length;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = c.clientWidth;
    const H = c.clientHeight;
    const w = Math.round(W * dpr);
    const h = Math.round(H * dpr);
    if (c.width !== w || c.height !== h) {
      c.width = w;
      c.height = h;
      gl.viewport(0, 0, w, h);
    }
    const r = this.room.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    const target = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
    const prev = this.smooth;
    this.smooth += (target - this.smooth) * (reduced() ? 1 : Math.min(1, dt * 7));
    const vel = (this.smooth - prev) / Math.max(dt, 0.001);
    this.wind += (Math.max(-0.7, Math.min(0.7, vel * 1.6)) - this.wind) * Math.min(1, dt * 6);
    const focus = this.smooth * (N - 1);
    const asp = W / Math.max(1, H);
    const narrow = asp < 0.9;
    const R = narrow ? 1.7 : 2.6;
    const size = narrow ? [1.25, 1.65] : [1.55, 2.05];
    const cam = narrow ? 8.6 : 8.4;
    const proj = persp((40 * Math.PI) / 180, asp, 0.1, 100);
    const angStep = 0.62;
    const yStep = narrow ? 0.85 : 0.95;
    const f = 1 / Math.tan((20 * Math.PI) / 180);
    const list: Placed[] = [];
    for (let i = 0; i < N; i++) {
      const k = i - focus;
      if (Math.abs(k) > 6) continue;
      const a = k * angStep + Math.sin(t * 0.3) * 0.02;
      list.push({ i, a, x: R * Math.sin(a), y: -k * yStep, z: R * Math.cos(a) });
    }
    list.sort((p, q) => p.z - q.z);

    let hov = -1;
    if (this.mouse) {
      for (let n = list.length - 1; n >= 0; n--) {
        const L = list[n];
        if (L.z < 0) continue;
        const ca = Math.cos(L.a);
        const sa = Math.sin(L.a);
        let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
        for (const [px, py] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) {
          const lx = px * size[0];
          const ly = py * size[1];
          const wx = ca * lx + L.x;
          const wy = ly + L.y;
          const wz = -sa * lx + L.z;
          const cw = -(wz - cam);
          const sx = (((f / asp) * wx) / cw + 1) / 2 * W;
          const sy = (1 - (f * wy) / cw) / 2 * H;
          minx = Math.min(minx, sx);
          maxx = Math.max(maxx, sx);
          miny = Math.min(miny, sy);
          maxy = Math.max(maxy, sy);
        }
        const [mx, my] = this.mouse;
        if (mx >= minx && mx <= maxx && my >= miny && my <= maxy) {
          hov = L.i;
          break;
        }
      }
    }
    this.hover = hov;
    c.style.cursor = hov >= 0 ? "pointer" : "default";

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniformMatrix4fv(this.u.uProj, false, proj);
    gl.uniform1f(this.u.uCam, cam);
    gl.uniform1f(this.u.uR, R);
    gl.uniform1f(this.u.uFlare, 0.055);
    gl.uniform2f(this.u.uSize, size[0], size[1]);
    gl.uniform1f(this.u.uRad, 0.09);
    gl.uniform1i(this.u.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    for (const L of list) {
      const it = this.items[L.i];
      it.hover += ((L.i === hov ? 1 : 0) - it.hover) * Math.min(1, dt * 10);
      it.show += (it.loaded - it.show) * Math.min(1, dt * 4);
      gl.bindTexture(gl.TEXTURE_2D, it.tex);
      gl.uniform3f(this.u.uPos, L.x, L.y, L.z);
      gl.uniform1f(this.u.uAng, L.a);
      gl.uniform1f(this.u.uWind, this.wind * (1 + it.hover * 0.3));
      gl.uniform1f(this.u.uHover, it.hover);
      gl.uniform1f(this.u.uImgAsp, it.asp);
      gl.uniform1f(this.u.uLoaded, it.show);
      gl.drawElements(gl.TRIANGLES, this.nIdx, gl.UNSIGNED_SHORT, 0);
    }
    const cur = Math.round(focus) + 1;
    if (cur !== this.lastCur) {
      this.lastCur = cur;
      this.cb.onCount(cur);
    }
    this.cb.onProgress(this.smooth);
  }
}
