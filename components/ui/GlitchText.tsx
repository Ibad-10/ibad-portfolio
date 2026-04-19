"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  alwaysGlitch?: boolean;
  style?: React.CSSProperties;
}

export function GlitchText({ text, className, as: Tag = "span", alwaysGlitch = false, style }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(alwaysGlitch);

  return (
    <Tag
      data-text={text}
      className={cn(
        "font-pixel relative inline-block select-none",
        (glitching || alwaysGlitch) && "glitch",
        className
      )}
      style={style}
      onMouseEnter={() => setGlitching(true)}
      onMouseLeave={() => !alwaysGlitch && setGlitching(false)}
    >
      {text}
    </Tag>
  );
}
