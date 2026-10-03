"use client";
import { useState, type FormEvent } from "react";
import { profile } from "@/lib/data";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
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

  const field = "mt-1 w-full rounded-lg border border-line/15 bg-bg px-4 py-3 text-text placeholder:text-muted focus:border-blue";
  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="c-name" className="text-sm text-muted">Name</label>
        <input id="c-name" required autoComplete="name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label htmlFor="c-email" className="text-sm text-muted">Email</label>
        <input id="c-email" type="email" required autoComplete="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <label htmlFor="c-msg" className="text-sm text-muted">Message</label>
        <textarea id="c-msg" required rows={5} className={field} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <button type="submit" disabled={status === "sending"} className="rounded-full bg-blue-strong px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p aria-live="polite" className="text-sm">
        {status === "sent" && <span className="text-text">Thanks, message sent.</span>}
        {status === "error" && (
          <span role="alert" className="text-text">
            Could not send ({error}). Email me directly at{" "}
            <a className="text-blue underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
          </span>
        )}
      </p>
    </form>
  );
}
