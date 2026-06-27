import { useState } from "react";
import { sendWaitlistEmail, waitlistEmailConfigured } from "../lib/email";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      // Fire the branded welcome email (no-op if EmailJS isn't configured yet).
      let message = data.message;
      if (waitlistEmailConfigured()) {
        try {
          await sendWaitlistEmail({ email, position: data.position });
          message = "You're on the waitlist! Check your inbox for a confirmation.";
        } catch {
          message = "You're on the waitlist! (We couldn't send the confirmation email just now.)";
        }
      }

      setStatus({ state: "success", message });
      setEmail("");
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  if (status.state === "success") {
    return <div className="waitlist__ok" role="status">🎉 {status.message}</div>;
  }

  return (
    <form className="waitlist" onSubmit={submit}>
      <input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <button className="btn btn--primary" type="submit" disabled={status.state === "loading"}>
        {status.state === "loading" ? "Joining…" : "Join waitlist"}
      </button>
      {status.state === "error" && <p className="waitlist__err" role="alert">{status.message}</p>}
    </form>
  );
}
