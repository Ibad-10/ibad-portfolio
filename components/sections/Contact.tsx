"use client";
import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";

const SOCIALS = [
  {
    label: "GitHub",
    display: "github.com/Ibad-10",
    href: "https://github.com/Ibad-10",
  },
  {
    label: "Email",
    display: "zuberi.ibad@gmail.com",
    href: "mailto:zuberi.ibad@gmail.com",
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/ibad-ullah-zuberi",
    href: "https://www.linkedin.com/in/ibad-ullah-zuberi/",
  },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
      setForm({ name: "", email: "", message: "" });
    }, 800);
  }

  const inputClass =
    "w-full bg-transparent border border-white/10 font-mono text-sm text-white px-4 py-3 outline-none focus:border-[#FF4D2D] transition-colors duration-200 placeholder:text-[#333]";

  return (
    <section id="contact" ref={ref} className="bg-[#080808] px-6 md:px-12 py-24">
      <motion.p
        className="section-label mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
      >
        [ 07 ] — Contact
      </motion.p>

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="font-display font-black text-4xl md:text-6xl text-white leading-[0.88] tracking-[-0.04em] mb-6">
            LET&apos;S BUILD
            <br />
            <span className="text-outline-red">SOMETHING.</span>
          </h2>

          <p className="font-mono text-sm text-[#555] leading-relaxed mb-10 max-w-sm">
            Got a project, an idea, or just want to say hi — reach out. Always open to interesting conversations.
          </p>

          <div className="space-y-5">
            {SOCIALS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <span className="font-mono text-[10px] text-[#333] tracking-widest uppercase w-20 shrink-0">
                  {social.label}
                </span>
                <div className="w-[1px] h-3 bg-white/10" />
                <span className="font-mono text-sm text-[#555] group-hover:text-white group-hover:underline decoration-[#FF4D2D] transition-colors duration-200">
                  ↗ {social.display}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div>
            <label className="font-mono text-[10px] text-[#444] tracking-widest uppercase block mb-2">
              Name
            </label>
            <input
              required
              className={inputClass}
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="font-mono text-[10px] text-[#444] tracking-widest uppercase block mb-2">
              Email
            </label>
            <input
              required
              type="email"
              className={inputClass}
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="font-mono text-[10px] text-[#444] tracking-widest uppercase block mb-2">
              Message
            </label>
            <textarea
              required
              rows={5}
              className={inputClass + " resize-none"}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            />
          </div>

          <button
            type="submit"
            disabled={sending || sent}
            className="w-full font-mono text-[11px] font-bold tracking-widest uppercase py-4 transition-all duration-200 disabled:opacity-60"
            style={{
              background: sent ? "rgba(255,77,45,0.1)" : "#FF4D2D",
              color: sent ? "#FF4D2D" : "#fff",
              border: sent ? "1px solid #FF4D2D" : "none",
            }}
          >
            {sent ? "MESSAGE SENT — I'LL BE IN TOUCH." : sending ? "SENDING..." : "SEND MESSAGE →"}
          </button>
        </motion.form>
      </div>

      <motion.div
        className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      >
        <p className="font-mono text-[10px] text-[#333] tracking-widest uppercase">
          IBAD ULLAH ZUBERI © 2026 · LONDON
        </p>
        <p className="font-mono text-[10px] text-[#333] tracking-widest uppercase">
          Built with Next.js + Framer Motion
        </p>
      </motion.div>
    </section>
  );
}
