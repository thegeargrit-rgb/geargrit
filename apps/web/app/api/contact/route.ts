import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  website?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_TOPICS = new Set(["editorial", "business", "general"]);

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: ContactPayload): string[] {
  const errors: string[] = [];
  const name = clean(payload.name);
  const email = clean(payload.email);
  const topic = clean(payload.topic);
  const message = clean(payload.message);
  const website = clean(payload.website);

  if (website.length > 0) {
    errors.push("Spam check failed.");
  }
  if (name.length < 2 || name.length > 80) {
    errors.push("Name must be between 2 and 80 characters.");
  }
  if (!EMAIL_REGEX.test(email)) {
    errors.push("Email address is invalid.");
  }
  if (!ALLOWED_TOPICS.has(topic)) {
    errors.push("Topic is invalid.");
  }
  if (message.length < 20 || message.length > 3000) {
    errors.push("Message must be between 20 and 3000 characters.");
  }

  return errors;
}

async function sendViaResend(payload: Required<Pick<ContactPayload, "name" | "email" | "topic" | "message">>) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "editorial@thegeargrit.com";

  if (!apiKey) {
    return { mode: "mock" as const };
  }

  const subjectPrefix =
    payload.topic === "editorial"
      ? "Editorial"
      : payload.topic === "business"
        ? "Business"
        : "General";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "GearGrit Contact <onboarding@resend.dev>",
      to: [to],
      reply_to: payload.email,
      subject: `[${subjectPrefix}] New contact form submission`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Topic: ${payload.topic}`,
        "",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend send failed (${response.status}): ${errorBody}`);
  }

  return { mode: "sent" as const };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const errors = validate(body);

    if (errors.length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const payload = {
      name: clean(body.name),
      email: clean(body.email),
      topic: clean(body.topic),
      message: clean(body.message),
    };

    const result = await sendViaResend(payload);

    return NextResponse.json({ ok: true, mode: result.mode }, { status: 200 });
  } catch (error) {
    console.error("Contact API failed", error);
    return NextResponse.json(
      { ok: false, errors: ["Unable to send message right now. Please try again."] },
      { status: 500 },
    );
  }
}