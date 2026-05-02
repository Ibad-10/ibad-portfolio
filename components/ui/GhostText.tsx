interface GhostTextProps {
  text: string;
}

export function GhostText({ text }: GhostTextProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      <div
        className="absolute top-[-20px] left-[-10px] font-display font-black leading-[0.82] tracking-[-0.05em] text-white/[0.025] whitespace-pre-line"
        style={{ fontSize: "clamp(100px, 18vw, 200px)" }}
      >
        {text.replace(/ /g, "\n")}
      </div>
    </div>
  );
}
