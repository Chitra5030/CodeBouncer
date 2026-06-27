const rows = [
  { feature: "Catches hallucinated (non-existent) packages", cb: "yes", sca: "partial", manual: "partial" },
  { feature: "Acts in real time, before install", cb: "yes", sca: "no", manual: "partial" },
  { feature: "Built for AI coding agents", cb: "yes", sca: "no", manual: "no" },
  { feature: "Typosquat & lookalike detection", cb: "yes", sca: "yes", manual: "partial" },
  { feature: "Plain-language reason for every verdict", cb: "yes", sca: "partial", manual: "yes" },
  { feature: "Keeps up at team scale", cb: "yes", sca: "yes", manual: "no" },
  { feature: "Effort per install", cb: "None", sca: "Low", manual: "High" },
];

function Cell({ v }) {
  if (v === "yes") return <span className="cmp__mark cmp__yes">✓</span>;
  if (v === "no") return <span className="cmp__mark cmp__no">✕</span>;
  if (v === "partial") return <span className="cmp__mark cmp__part">~</span>;
  return <span className="cmp__text">{v}</span>;
}

export default function Compare() {
  return (
    <section className="section" id="compare">
      <div className="container container--narrow">
        <div className="section__head">
          <span className="eyebrow">Why CodeBouncer</span>
          <h2>Not just another dependency scanner</h2>
          <p>
            Generic scanners check code after the fact, and manual review doesn't scale.
            CodeBouncer stops the threat at the door, automatically.
          </p>
        </div>

        <div className="cmp__wrap">
          <table className="cmp">
            <thead>
              <tr>
                <th className="cmp__rowhead"></th>
                <th className="cmp__col cmp__col--cb">CodeBouncer</th>
                <th className="cmp__col">Generic scanner</th>
                <th className="cmp__col">Manual review</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feature}>
                  <td className="cmp__feature">{r.feature}</td>
                  <td className="cmp__cell cmp__cell--cb"><Cell v={r.cb} /></td>
                  <td className="cmp__cell"><Cell v={r.sca} /></td>
                  <td className="cmp__cell"><Cell v={r.manual} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cmp__legend">✓ Full&nbsp;&nbsp;·&nbsp;&nbsp;~ Partial&nbsp;&nbsp;·&nbsp;&nbsp;✕ None</p>
      </div>
    </section>
  );
}
