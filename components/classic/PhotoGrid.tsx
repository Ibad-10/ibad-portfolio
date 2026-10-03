"use client";
import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";

const PHOTOS = Array.from({ length: 39 }, (_, i) => ({
  src: `/lightroom/photo-${String(i + 1).padStart(2, "0")}.jpeg`,
  alt: `Street and architecture photograph ${i + 1} of 39 by Ibad Zuberi`,
}));

export function PhotoGrid() {
  const [count, setCount] = useState(8);
  const [open, setOpen] = useState<null | (typeof PHOTOS)[number]>(null);
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {PHOTOS.slice(0, count).map((p) => (
          <li key={p.src}>
            <button type="button" onClick={() => setOpen(p)} className="group block w-full overflow-hidden rounded-xl bg-panel" aria-label={`Open ${p.alt}`}>
              <Image src={p.src} alt={p.alt} width={600} height={800} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-300 group-hover:scale-105" />
            </button>
          </li>
        ))}
      </ul>
      {count < PHOTOS.length && (
        <button type="button" onClick={() => setCount((c) => Math.min(c + 8, PHOTOS.length))} className="mt-6 rounded-full border border-line/15 px-5 py-2 text-sm hover:border-blue">
          Show more
        </button>
      )}
      {open && <Lightbox src={open.src} alt={open.alt} onClose={() => setOpen(null)} />}
    </div>
  );
}
