const META = {
  allow: { label: "ALLOW", icon: "✓", cls: "v-allow" },
  warn: { label: "WARN", icon: "!", cls: "v-warn" },
  block: { label: "BLOCK", icon: "✕", cls: "v-block" },
  checking: { label: "CHECKING", icon: "…", cls: "v-checking" },
};

export function VerdictBadge({ verdict }) {
  const m = META[verdict] || META.checking;
  return (
    <span className={`badge ${m.cls}`}>
      <span className="badge__icon">{m.icon}</span>
      {m.label}
    </span>
  );
}

export function PackageVerdict({ pkg }) {
  const m = META[pkg.verdict] || META.checking;
  return (
    <div className={`pkg ${m.cls}`}>
      <div className="pkg__head">
        <div className="pkg__id">
          <span className="pkg__eco">{pkg.ecosystem}</span>
          <code className="pkg__name">{pkg.name}</code>
        </div>
        <div className="pkg__right">
          {typeof pkg.risk === "number" && (
            <span className="pkg__risk">risk {pkg.risk}</span>
          )}
          <VerdictBadge verdict={pkg.verdict} />
        </div>
      </div>
      {pkg.reasons?.length > 0 && (
        <ul className="pkg__reasons">
          {pkg.reasons.map((r, i) => (
            <li key={i} className={`reason reason--${r.severity}`}>
              <span className="reason__sig">{r.signal}</span>
              {r.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
