import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus({ state: "success", message: data.message });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({ state: "error", message: err.message });
    }
  }

  return (
    <section className="section section--alt" id="contact">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Get In Touch</span>
          <h2>Let's make AI-assisted coding safe together</h2>
          <p>Have a question, a partnership idea, or want early access for your team? We'd love to hear from you.</p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <div className="contact__item">
              <h4>Customer Support</h4>
              <a href="mailto:customer.support@codebouncer.online">customer.support@codebouncer.online</a>
            </div>
            <div className="contact__item">
              <h4>Founder &amp; Partnerships</h4>
              <a href="mailto:founder@codebouncer.online">founder@codebouncer.online</a>
            </div>
            <div className="contact__item">
              <h4>Location</h4>
              <p>Remote-first · Global</p>
            </div>
            <div className="contact__item">
              <h4>Response time</h4>
              <p>We reply within 24 hours</p>
            </div>
          </div>

          <form className="contact__form card" onSubmit={submit}>
            {status.state === "success" ? (
              <div className="waitlist__ok" role="status">🎉 {status.message}</div>
            ) : (
              <>
                <label>
                  Name
                  <input type="text" required value={form.name} onChange={update("name")} placeholder="Jane Developer" />
                </label>
                <label>
                  Email
                  <input type="email" required value={form.email} onChange={update("email")} placeholder="you@company.com" />
                </label>
                <label>
                  Message
                  <textarea required rows={4} value={form.message} onChange={update("message")} placeholder="How can we help?" />
                </label>
                {status.state === "error" && <p className="waitlist__err" role="alert">{status.message}</p>}
                <button className="btn btn--primary" type="submit" disabled={status.state === "loading"}>
                  {status.state === "loading" ? "Sending…" : "Send message"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
