"use client";
import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";

const LINKS = [
  { label: "$ open github",   href: "https://github.com/Ibad-10",           display: "github.com/Ibad-10",     color: "#00ff9f" },
  { label: "$ open email",    href: "mailto:iyaduzuberi0@gmail.com",          display: "iyaduzuberi0@gmail.com", color: "#00cfff" },
  { label: "$ open linkedin", href: "https://linkedin.com/in/sahidm",         display: "linkedin.com/in/sahidm", color: "#ff2d78" },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  const inputClass =
    "w-full bg-transparent border border-muted font-mono text-xl px-3 py-2 text-text-main outline-none focus:border-primary transition-colors duration-200";

  return (
    <section id="contact" ref={ref} className="snap-section flex flex-col items-center justify-center bg-bg px-6 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <motion.h2
          className="font-pixel text-primary text-lg md:text-2xl mb-10 glow-green"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          &gt; CONTACT<span className="animate-blink">_</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Terminal links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <p className="font-mono text-xl text-muted mb-6">// Find me here</p>
            {LINKS.map(({ label, href, display, color }, i) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-lg group"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 8 }}
              >
                <span className="text-muted">{label} </span>
                <span
                  className="transition-all duration-200 group-hover:underline"
                  style={{ color }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.textShadow = `0 0 8px ${color}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.textShadow = "none";
                  }}
                >
                  {display}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <div>
              <label className="font-mono text-base text-muted block mb-1">$ name</label>
              <input
                required
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="your_name"
              />
            </div>
            <div>
              <label className="font-mono text-base text-muted block mb-1">$ email</label>
              <input
                required
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="font-mono text-base text-muted block mb-1">$ message</label>
              <textarea
                required
                rows={4}
                className={inputClass + " resize-none"}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Hello Ibad, ..."
              />
            </div>
            <MagneticButton
              className="border border-primary text-primary hover:bg-primary/10 w-full justify-center"
              type="submit"
            >
              {sent ? "[ MESSAGE SENT ✓ ]" : "[ SEND MESSAGE ]"}
            </MagneticButton>
          </motion.form>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-16 pt-8 border-t border-muted text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="font-pixel text-[8px] text-muted">
            [ IBAD © 2026 ] · Built with Next.js + Framer Motion
          </p>
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-primary/30"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, delay: i * 0.08, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
