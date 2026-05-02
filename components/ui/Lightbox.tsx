"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}

export function Lightbox({ src, alt, caption, onClose }: LightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[8000] flex items-center justify-center bg-black/92 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-[90vw] max-h-[90vh]"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={900}
            className="object-contain max-h-[85vh] w-auto"
            style={{ maxWidth: "90vw" }}
          />
          {caption && (
            <p className="font-mono text-[10px] text-white/30 tracking-widest uppercase mt-3 text-center">
              {caption}
            </p>
          )}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 font-mono text-[10px] text-white/40 hover:text-white tracking-widest uppercase bg-[#050505] px-2 py-1 border border-white/10"
          >
            [ESC]
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
