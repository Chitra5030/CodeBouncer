import AgentGuardrail from "./AgentGuardrail.jsx";
import Scanner from "./Scanner.jsx";

export default function Demo() {
  return (
    <section className="section" id="demo">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Live Demo</span>
          <h2>See it catch a real threat right now</h2>
          <p>
            This isn't a mockup — every check below queries the live npm and PyPI registries. Run
            a scenario or paste your own AI output.
          </p>
        </div>
        <div className="demo__stack">
          <AgentGuardrail />
          <Scanner />
        </div>
      </div>
    </section>
  );
}
