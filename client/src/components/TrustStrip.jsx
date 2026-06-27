const ITEMS = [
  { label: "npm", icon: "📦" },
  { label: "PyPI", icon: "🐍" },
  { label: "GitHub Copilot", icon: "🤖" },
  { label: "Cursor", icon: "🖱️" },
  { label: "Claude Code", icon: "✳️" },
  { label: "CI / CD", icon: "⚙️" },
  { label: "Git hooks", icon: "🔗" },
  { label: "VS Code", icon: "🧩" },
];

export default function TrustStrip() {
  // Duplicated track for a seamless marquee loop.
  const track = [...ITEMS, ...ITEMS];
  return (
    <section className="trust" aria-label="Works with the tools you already use">
      <div className="container">
        <p className="trust__label">Protects the ecosystems and AI tools you already use</p>
      </div>
      <div className="trust__viewport">
        <div className="trust__track">
          {track.map((it, i) => (
            <span className="trust__item" key={i}>
              <span className="trust__icon">{it.icon}</span>
              {it.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
