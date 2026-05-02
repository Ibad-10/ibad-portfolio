"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Lightbox } from "@/components/ui/Lightbox";

const PHOTOS = [
  {
    src: "/lightroom/lambo.jpeg",
    alt: "Green Lamborghini in Kensington",
    caption: "Kensington, London",
    span: "row-span-2",
  },
  {
    src: "/lightroom/architecture.jpeg",
    alt: "Golden hour brick building West London",
    caption: "Golden hour, West London",
    span: "",
  },
  {
    src: "/lightroom/skyline.jpeg",
    alt: "City of London skyline at dusk",
    caption: "City of London at dusk",
    span: "",
  },
  {
    src: "/lightroom/street-canyon.jpeg",
    alt: "Street canyon at sunset",
    caption: "Birmingham city centre",
    span: "",
  },
  {
    src: "/lightroom/jack-sparrow.jpeg",
    alt: "Jack Sparrow street performer",
    caption: "Street performer, Windsor",
    span: "",
  },
  {
    src: "/lightroom/graffiti.jpeg",
    alt: "Person on graffiti wall Shoreditch",
    caption: "Shoreditch, London",
    span: "",
  },
];

export function Photography() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<null | (typeof PHOTOS)[0]>(null);

  return (
    <section id="photography" ref={ref} className="bg-[#050505] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 06 ] — Through the Lens
      </motion.p>

      <motion.p
        className="font-mono text-[11px] text-[#444] tracking-widest uppercase mb-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.15 }}
      >
        Street · Architecture · London
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[260px]">
        {PHOTOS.map((photo, i) => (
          <motion.button
            key={photo.src}
            className={`relative overflow-hidden group text-left ${photo.span}`}
            onClick={() => setLightbox(photo)}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.08 }}
            aria-label={`View ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end p-4">
              <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="font-mono text-[10px] text-white tracking-widest uppercase mb-1">VIEW</p>
                <p className="font-mono text-[9px] text-white/50 tracking-wide">{photo.caption}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
