const plans = [
  {
    name: "Developer",
    price: "Free",
    period: "forever",
    blurb: "For individual developers who want to code with AI safely.",
    features: [
      "Unlimited checks in CLI & IDE",
      "npm & PyPI coverage",
      "Hallucination + typosquat detection",
      "Community support",
    ],
    cta: "Get started free",
    featured: false,
    href: "#top",
  },
  {
    name: "Team",
    price: "$15",
    period: "/ developer / month",
    blurb: "For engineering teams that want guardrails in every pipeline.",
    features: [
      "Everything in Developer",
      "CI/CD & Git hook enforcement",
      "Shared policies & allowlists",
      "Reputation database access",
      "Priority support",
    ],
    cta: "Join waitlist — Team",
    featured: true,
    href: "#top",
  },
  {
    name: "Platform",
    price: "Custom",
    period: "usage-based",
    blurb: "For AI coding platforms protecting their own users at scale.",
    features: [
      "Everything in Team",
      "High-throughput guardrail API",
      "Custom ecosystems & rules",
      "SSO & audit logs",
      "SLA & dedicated support",
    ],
    cta: "Contact sales",
    featured: false,
    href: "#contact",
  },
];

export default function Pricing() {
  return (
    <section className="section section--alt" id="pricing">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Pricing</span>
          <h2>Simple, transparent pricing</h2>
          <p>Free for individuals. Early waitlist members lock in launch pricing for life.</p>
        </div>
        <div className="grid grid--3">
          {plans.map((p) => (
            <article key={p.name} className={`card price ${p.featured ? "price--featured" : ""}`}>
              {p.featured && <span className="price__badge">Most popular</span>}
              <h3>{p.name}</h3>
              <div className="price__amount">
                <strong>{p.price}</strong>
                <span>{p.period}</span>
              </div>
              <p className="price__blurb">{p.blurb}</p>
              <ul className="ticks">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className={`btn ${p.featured ? "btn--primary btn--glow" : "btn--ghost"}`} href={p.href}>
                {p.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="price__note">Pricing shown is indicative for launch and may evolve as we add ecosystems.</p>
      </div>
    </section>
  );
}
