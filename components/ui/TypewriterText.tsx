"use client";
import { useEffect, useState } from "react";

interface TypewriterTextProps {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  className?: string;
  prefix?: string;
}

export function TypewriterText({
  words,
  speed = 80,
  deleteSpeed = 40,
  pauseMs = 1500,
  className = "",
  prefix = "",
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];

    if (!deleting && displayed === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setDisplayed(deleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
        );
      },
      deleting ? deleteSpeed : speed
    );
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx, words, speed, deleteSpeed, pauseMs]);

  return (
    <span className={className}>
      {prefix}
      {displayed}
      <span className="animate-blink text-primary">_</span>
    </span>
  );
}
