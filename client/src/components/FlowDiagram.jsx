import BouncerLogo from "./BouncerLogo.jsx";

export default function FlowDiagram() {
  return (
    <section className="section section--alt" id="flow">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Where it sits</span>
          <h2>One checkpoint between AI and your codebase</h2>
          <p>
            CodeBouncer stands at the door, every package an AI suggests passes through it before
            anything touches your project.
          </p>
        </div>

        <div className="flow">
          <div className="flow__node">
            <span className="flow__icon">🤖</span>
            <h4>AI suggests</h4>
            <p>Copilot, Cursor, Claude or an agent proposes a package.</p>
          </div>

          <div className="flow__arrow" aria-hidden="true"><span /></div>

          <div className="flow__node flow__node--core">
            <div className="flow__logo"><BouncerLogo size={40} /></div>
            <h4>CodeBouncer checks</h4>
            <p>Live registry verification, typosquat &amp; reputation scoring.</p>
          </div>

          <div className="flow__arrow flow__arrow--split" aria-hidden="true"><span /></div>

          <div className="flow__outcomes">
            <div className="flow__node flow__node--ok">
              <span className="flow__icon">✓</span>
              <h4>Safe → installed</h4>
              <p>Trusted packages pass straight through.</p>
            </div>
            <div className="flow__node flow__node--block">
              <span className="flow__icon">✕</span>
              <h4>Risky → blocked</h4>
              <p>Hallucinated or malicious packages are stopped cold.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
