const steps = [
  {
    n: "01",
    title: "Your AI suggests packages",
    text: "An assistant or agent proposes an install command or import as part of writing your code.",
  },
  {
    n: "02",
    title: "CodeBouncer intercepts",
    text: "Before anything installs, every package name is sent to the guardrail for a live check.",
  },
  {
    n: "03",
    title: "We verify & score",
    text: "Each package is checked against the real registry and scored for hallucination, typosquatting, and reputation.",
  },
  {
    n: "04",
    title: "You get a verdict",
    text: "Safe packages pass, risky ones are flagged, and dangerous ones are blocked — with a clear reason for each.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section section--alt" id="how">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">How It Works</span>
          <h2>From AI suggestion to safe install in 4 steps</h2>
          <p>No config to wrestle with. CodeBouncer slots into the moment a package is about to be installed.</p>
        </div>
        <div className="steps">
          {steps.map((s) => (
            <div key={s.n} className="step card" data-n={s.n}>
              <span className="step__n">STEP {s.n}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
