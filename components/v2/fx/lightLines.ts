import { compile, onScreen, reduced } from "./util";

const FS = `precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;
void main(){vec2 uv=gl_FragCoord.xy/r;float a=r.x/r.y;vec3 col=vec3(0.);
for(int i=0;i<9;i++){float fi=float(i);
 float y=.5+.2*sin(uv.x*2.6+t*.35+fi*.8)*cos(uv.x*1.2-t*.18+fi*1.7);
 float dm=distance(vec2(uv.x*a,uv.y),vec2(m.x*a,m.y));
 y+=.12*exp(-dm*dm*9.)*sin(fi*1.3+t*1.5);
 float d=abs(uv.y-y);
 vec3 c=mix(vec3(0.,.6,1.),vec3(.48,.79,1.),fi/8.);
 col+=c*.0022/(d+.0025)*(.45+.55*sin(uv.x*3.+fi+t*.4));}
col*=smoothstep(0.,.25,uv.x)*smoothstep(1.,.75,uv.x)*smoothstep(0.,.3,uv.y)*smoothstep(1.,.7,uv.y);
col=min(col,vec3(1.));float al=max(col.r,max(col.g,col.b));gl_FragColor=vec4(col,al);}`;
const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

/** Flowing blue shader lines that bend around the cursor. */
export class LightLines {
  private canvas: HTMLCanvasElement;
  private raf = 0;
  private io: IntersectionObserver;
  private vis = true;
  private m = [0.5, 0.5];
  private tm = [0.5, 0.5];
  private dead = false;
  ok = false;

  constructor(private host: HTMLElement) {
    const c = (this.canvas = document.createElement("canvas"));
    c.style.cssText = "width:100%;height:100%;display:block";
    host.appendChild(c);
    this.io = onScreen(host, (v) => (this.vis = v));
    const gl = c.getContext("webgl", { premultipliedAlpha: true, alpha: true });
    if (!gl) return;
    this.ok = true;
    const prog = compile(gl, VS, FS);
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const l = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(l);
    gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);
    const u = { r: gl.getUniformLocation(prog, "r"), t: gl.getUniformLocation(prog, "t"), m: gl.getUniformLocation(prog, "m") };
    window.addEventListener("pointermove", this.onMove, { passive: true });
    const t0 = performance.now();
    const loop = (now: number) => {
      if (this.dead) return;
      this.raf = requestAnimationFrame(loop);
      if (!this.vis) return;
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const w = Math.round(c.clientWidth * dpr);
      const h = Math.round(c.clientHeight * dpr);
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
        gl.viewport(0, 0, w, h);
      }
      this.m[0] += (this.tm[0] - this.m[0]) * 0.06;
      this.m[1] += (this.tm[1] - this.m[1]) * 0.06;
      gl.uniform2f(u.r, w, h);
      gl.uniform1f(u.t, reduced() ? 0 : (now - t0) / 1000);
      gl.uniform2f(u.m, this.m[0], this.m[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    this.raf = requestAnimationFrame(loop);
  }

  private onMove = (e: PointerEvent) => {
    const r = this.host.getBoundingClientRect();
    this.tm = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height];
  };

  destroy() {
    this.dead = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("pointermove", this.onMove);
    this.io.disconnect();
    this.canvas.remove();
  }
}
