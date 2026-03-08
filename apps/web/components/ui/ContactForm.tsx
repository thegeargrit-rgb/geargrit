"use client";

import { useState, type FormEvent } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  topic: "editorial" | "business" | "general";
  message: string;
  website: string;
};

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  topic: "editorial",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as
        | { ok: true; mode: "mock" | "sent" }
        | { ok: false; errors?: string[] };

      if (!response.ok || !result.ok) {
        setStatus("error");
        setFeedback(result.ok ? "Something went wrong." : (result.errors?.[0] ?? "Something went wrong."));
        return;
      }

      setStatus("success");
      setFeedback(
        result.mode === "sent"
          ? "Thanks. Your message was sent successfully."
          : "Thanks. Form is working in preview mode (email delivery not enabled yet).",
      );
      setForm(INITIAL_STATE);
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again.");
    }
  }

  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Name</span>
        <input
          required
          minLength={2}
          maxLength={80}
          className="rounded-md border bg-background px-3 py-2 text-sm"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-medium">Email</span>
        <input
          required
          type="email"
          className="rounded-md border bg-background px-3 py-2 text-sm"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-medium">Topic</span>
        <select
          className="rounded-md border bg-background px-3 py-2 text-sm"
          value={form.topic}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              topic: event.target.value as FormState["topic"],
            }))
          }
        >
          <option value="editorial">Editorial & Corrections</option>
          <option value="business">Business & Partnerships</option>
          <option value="general">General</option>
        </select>
      </label>

      <label className="grid gap-1">
        <span className="text-sm font-medium">Message</span>
        <textarea
          required
          minLength={20}
          maxLength={3000}
          rows={6}
          className="rounded-md border bg-background px-3 py-2 text-sm"
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
        />
      </label>

      <input
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        value={form.website}
        onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {feedback ? (
        <p
          className={cn(
            "text-sm",
            status === "success" ? "text-green-600" : "text-red-600",
          )}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
