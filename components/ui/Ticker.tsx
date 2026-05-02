"use client";

interface TickerProps {
  text: string;
}

export function Ticker({ text }: TickerProps) {
  const content = `${text}   ${text}`;
  return (
    <div className="bg-[#FF4D2D] overflow-hidden py-[7px] select-none" aria-hidden="true">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 30s linear infinite" }}
      >
        <span className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-white px-4 shrink-0">
          {content}
        </span>
      </div>
    </div>
  );
}
