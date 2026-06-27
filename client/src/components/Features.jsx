const features = [
  {
    icon: "👻",
    title: "Hallucination detection",
    text: "Instantly verifies whether a suggested package actually exists in the registry, or was simply invented by the AI.",
  },
  {
    icon: "🎭",
    title: "Typosquat & lookalike analysis",
    text: "Flags names that are a character or two away from popular packages — the classic disguise for malware.",
  },
  {
    icon: "📅",
    title: "Freshness & reputation scoring",
    text: "Weighs how new a package is, how widely it's used, and how many versions exist to surface suspicious newcomers.",
  },
  {
    icon: "⛔",
    title: "Real-time install gate",
    text: "Returns an allow / warn / block verdict fast enough to intercept installs live in an IDE or agent workflow.",
  },
  {
    icon: "📦",
    title: "Multi-ecosystem coverage",
    text: "Protects npm and PyPI today, with the same engine extending to Maven, Go, Cargo, and RubyGems next.",
  },
  {
    icon: "🧩",
    title: "Fits your workflow",
    text: "Use it as a CLI, a CI check, a Git pre-commit hook, an editor extension, or an API for AI agents.",
  },
];

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Features</span>
          <h2>Everything you need to trust AI-suggested dependencies</h2>
          <p>From verification to verdict, CodeBouncer handles every step of dependency safety.</p>
        </div>
        <div className="grid grid--3">
          {features.map((f) => (
            <article key={f.title} className="card feature">
              <div className="feature__icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
