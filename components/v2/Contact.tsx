"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { SOCIALS } from "@/lib/site";
import { Heading } from "./Heading";

const EMAIL = "zuberi.ibad@gmail.com";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const izRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const on = () => {
      const el = izRef.current;
      if (!el || !el.parentElement) return;
      const r = el.parentElement.getBoundingClientRect();
      el.style.transform = `translateX(-50%) translateY(${(r.top - window.innerHeight / 2) * -0.15}px)`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not send");
      }
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="streak" aria-hidden="true" />
      <div className="contact-grid">
        <div className="col">
          <div className="eyebrow rv">06 — Contact</div>
          <Heading parts={["Let's ", { i: "Connect" }]} className="h-c" />
          <p className="sub rv">Got a project, an idea, or a role in mind? Send a message or reach me directly.</p>
          <a className="mail rv" href={`mailto:${EMAIL}`}>
            {EMAIL} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <form className="form rv" onSubmit={submit}>
          <label htmlFor="f-name">
            Name
            <input id="f-name" required name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label htmlFor="f-email">
            Email
            <input id="f-email" required type="email" name="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label htmlFor="f-msg">
            Message
            <textarea id="f-msg" required name="message" rows={5} placeholder="Tell me about your project" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          <button type="submit" disabled={status === "sending"}>
            <span>{status === "sending" ? "Sending…" : "Send message"}</span>
            <span aria-hidden="true">→</span>
          </button>
          <p className="status" role="status" aria-live="polite">
            {status === "sent" && "Message sent. Thank you, I will reply soon."}
            {status === "error" && (
              <>
                Could not send ({error}). Email me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </>
            )}
          </p>
        </form>
      </div>
      <div className="izwrap" aria-hidden="true">
        <div ref={izRef} className="iz">IZ</div>
      </div>
      <div className="socials">
        {SOCIALS.map((s) => (
          <a key={s.label} href={s.href} target={s.href.startsWith("http") || s.href.startsWith("/cv/") ? "_blank" : undefined} rel="noopener noreferrer">
            <span>{s.label}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <div className="foot">
        <span>© 2026 Ibad Ullah Zuberi · London, UK</span>
        <span>
          [phone removed] · <Link href="/play">Play penalties</Link>
        </span>
      </div>
    </section>
  );
}
