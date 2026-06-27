import emailjs from "@emailjs/browser";

// EmailJS config is read from Vite env vars (client/.env). See client/.env.example.
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const WAITLIST_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WAITLIST_TEMPLATE_ID;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;

let initialized = false;
function ensureInit() {
  if (initialized) return;
  if (PUBLIC_KEY) {
    emailjs.init({ publicKey: PUBLIC_KEY });
    initialized = true;
  }
}

/** Waitlist email is fully wired when the service + waitlist template + key exist. */
export function waitlistEmailConfigured() {
  return Boolean(PUBLIC_KEY && SERVICE_ID && WAITLIST_TEMPLATE_ID);
}

/** Contact email is fully wired when the service + contact template + key exist. */
export function contactEmailConfigured() {
  return Boolean(PUBLIC_KEY && SERVICE_ID && CONTACT_TEMPLATE_ID);
}

/**
 * Send the "you're on the waitlist" welcome email to the subscriber.
 * Template variables available: {{email}}, {{to_email}}, {{position}}.
 */
export async function sendWaitlistEmail({ email, position }) {
  if (!waitlistEmailConfigured()) return false;
  ensureInit();
  await emailjs.send(SERVICE_ID, WAITLIST_TEMPLATE_ID, {
    email,
    to_email: email,
    position: position ?? "",
  });
  return true;
}

/**
 * Send the contact message. Template variables available:
 * {{name}}, {{email}}, {{reply_to}}, {{message}}.
 */
export async function sendContactEmail({ name, email, message }) {
  if (!contactEmailConfigured()) return false;
  ensureInit();
  await emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, {
    name,
    email,
    reply_to: email,
    to_email: email,
    message,
  });
  return true;
}
