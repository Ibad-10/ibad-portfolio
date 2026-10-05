export const reduced = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function compile(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram {
  const mk = (type: number, src: string) => {
    const sh = gl.createShader(type) as WebGLShader;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(sh));
    return sh;
  };
  const p = gl.createProgram() as WebGLProgram;
  gl.attachShader(p, mk(gl.VERTEX_SHADER, vs));
  gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  return p;
}

export function onScreen(el: Element, cb: (visible: boolean) => void): IntersectionObserver {
  const io = new IntersectionObserver((entries) => cb(entries[0].isIntersecting));
  io.observe(el);
  return io;
}
