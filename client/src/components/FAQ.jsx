import { useState } from "react";

const faqs = [
  {
    q: "What exactly is slopsquatting?",
    a: "Slopsquatting is a software supply-chain attack unique to the AI era. AI coding tools sometimes confidently suggest installing packages that don't actually exist. Attackers study which fake names AIs tend to invent, register those names on registries like npm and PyPI, and upload malware. The next developer or AI agent that runs the install command gets compromised. CodeBouncer stops that install before it happens.",
  },
  {
    q: "How does CodeBouncer decide a package is dangerous?",
    a: "Each suggested package is checked against the live registry and scored on several signals: whether it exists at all, how close its name is to a popular package (typosquatting), how recently it was published, how widely it's used, and how many versions exist. Those signals combine into a risk score and a clear allow, warn, or block verdict.",
  },
  {
    q: "Which package ecosystems do you support?",
    a: "Today CodeBouncer checks npm (JavaScript/TypeScript) and PyPI (Python) against their live registries. The same detection engine is designed to extend to Maven, Go modules, Cargo, and RubyGems, which are on our roadmap.",
  },
  {
    q: "Will it slow down my development?",
    a: "No. Checks are fast and cached, so they're designed to run inline — in your editor, your CI pipeline, or an AI agent loop — without becoming a bottleneck. Safe packages pass through instantly.",
  },
  {
    q: "How do I use it?",
    a: "CodeBouncer is built to meet you where you write code. You'll be able to run it as a command-line tool, a CI/CD check, a Git pre-commit hook, an IDE extension, or call it as an API from an AI coding agent. The same engine powers all of them.",
  },
  {
    q: "Does it produce false alarms?",
    a: "We tune detection to flag genuinely risky patterns and explain every verdict in plain language, so you can make an informed call. Teams can also maintain allowlists for internal or pre-approved packages to keep noise low.",
  },
  {
    q: "Is my code or data stored?",
    a: "CodeBouncer only needs package names to do its job — not your source code. Checks happen against public registry metadata, and results are cached. For teams and platforms, we offer self-hosted and private deployment options.",
  },
  {
    q: "When are you launching?",
    a: "We're building in the open and onboarding early users now. Join the waitlist for early access and to lock in launch pricing for life.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <div className="section__head">
          <span className="eyebrow">FAQ</span>
          <h2>Frequently asked questions</h2>
          <p>Everything you need to know about CodeBouncer before joining the waitlist.</p>
        </div>
        <div className="faq">
          {faqs.map((f, i) => (
            <div key={i} className={`faq__item ${open === i ? "is-open" : ""}`}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq__chevron">{open === i ? "–" : "+"}</span>
              </button>
              {open === i && <p className="faq__a">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
