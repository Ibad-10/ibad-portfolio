"use client";
import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

export function MovingBorder({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  onClick,
  ...props
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pct = (time % duration) / duration;
      progress.set(pct);
    }
  });

  const x = useTransform(progress, (val) => {
    const length = pathRef.current?.getTotalLength() ?? 0;
    return pathRef.current?.getPointAtLength(val * length)?.x ?? 0;
  });
  const y = useTransform(progress, (val) => {
    const length = pathRef.current?.getTotalLength() ?? 0;
    return pathRef.current?.getPointAtLength(val * length)?.y ?? 0;
  });
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <button
      className={cn("relative overflow-hidden bg-transparent p-[1px]", containerClassName)}
      onClick={onClick}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      <div className="absolute inset-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          width="100%"
          height="100%"
        >
          <rect fill="none" width="100%" height="100%" rx="0" ry="0" ref={pathRef} />
        </svg>
        <motion.div
          style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}
          className={cn("h-4 w-4 rounded-full opacity-80", borderClassName)}
        />
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-primary/30 bg-bg text-sm antialiased",
          className
        )}
      >
        {children}
      </div>
    </button>
  );
}
