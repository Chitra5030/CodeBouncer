import WaitlistForm from "./WaitlistForm.jsx";
import BouncerLogo from "./BouncerLogo.jsx";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="pill">🚫 AI Supply-Chain Security</span>
          <h1 className="hero__title">
            Stop AI from installing <span className="grad">malware</span> into your code
          </h1>
          <p className="hero__tagline">The bouncer for AI-suggested code.</p>
          <p className="hero__sub">
            AI coding tools hallucinate package names that don't exist — and attackers register
            those names with malware. CodeBouncer sits between your AI agent and the package
            registry, catching hallucinated, typosquatted, and suspicious dependencies in real
            time, before a single install runs.
          </p>

          <div id="waitlist">
            <WaitlistForm />
          </div>

          <ul className="hero__notes">
            <li>✓ Works with npm &amp; PyPI today</li>
            <li>✓ Plugs into IDEs, CI &amp; AI agents</li>
            <li>✓ No credit card needed</li>
          </ul>
        </div>

        <div className="hero__preview" aria-hidden="true">
          <div className="preview">
            <div className="preview__bar">
              <span className="dot dot--r" /><span className="dot dot--y" /><span className="dot dot--g" />
              <span className="preview__title">ai-agent · terminal</span>
            </div>
            <div className="preview__body">
              <div className="pline"><span className="pline__who">agent</span> npm install express jwt-secure-helper</div>
              <div className="pline pline__guard">🛡️ CodeBouncer scanning 2 packages…</div>
              <div className="pline pline__ok">✓ express — trusted (457M downloads)</div>
              <div className="pline pline__block">✕ jwt-secure-helper — does not exist · hallucination</div>
              <div className="pline pline__gate">⛔ Install blocked before it could run</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
