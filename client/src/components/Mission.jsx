const highlights = [
  {
    icon: "⚡",
    title: "Catch threats in milliseconds",
    text: "Verdicts return fast enough to sit inline in an IDE or agent loop, so security never slows the developer down.",
  },
  {
    icon: "🧠",
    title: "Detection that learns",
    text: "Every hallucinated or malicious name we catch feeds a shared reputation database — so the whole network gets safer with scale.",
  },
  {
    icon: "🔌",
    title: "Built for where code is written",
    text: "One engine powers an IDE extension, a CI check, a Git hook, and an agent guardrail. Protect the moment of install, wherever it happens.",
  },
];

export default function Mission() {
  return (
    <section className="section section--alt" id="mission">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Our Mission</span>
          <h2>AI made coding faster. It also opened a new door for attackers.</h2>
          <p>
            We believe developers shouldn't have to choose between shipping fast with AI and
            staying safe. CodeBouncer closes the gap automatically.
          </p>
        </div>

        <div className="mission__lead card">
          <h3>The blind spot nobody is watching</h3>
          <p>
            When an AI assistant suggests <code>pip install</code> for a package that doesn't
            exist, most developers just run it. Attackers know this. They study which fake names
            AI models invent, register those names with malware, and wait. The next install
            command silently hands over API keys, credentials, and source code.
          </p>
          <p>
            CodeBouncer watches that exact moment. It checks every suggested package against the
            real registry, scores its risk, and stops the dangerous ones before they're ever
            installed — turning a brand-new attack surface into a solved problem.
          </p>
        </div>

        <div className="grid grid--3">
          {highlights.map((h) => (
            <article key={h.title} className="card highlight">
              <div className="highlight__icon">{h.icon}</div>
              <h4>{h.title}</h4>
              <p>{h.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
