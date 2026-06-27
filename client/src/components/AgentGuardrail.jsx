import { useState, useRef } from "react";
import { SCENARIOS } from "../scenarios.js";
import { PackageVerdict } from "./Verdict.jsx";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function AgentGuardrail() {
  const [activeId, setActiveId] = useState(null);
  const [agentText, setAgentText] = useState("");
  const [phase, setPhase] = useState("idle"); // idle | typing | scanning | done
  const [results, setResults] = useState([]);
  const [gate, setGate] = useState(null);
  const runToken = useRef(0);

  async function runScenario(scenario) {
    const token = ++runToken.current;
    setActiveId(scenario.id);
    setResults([]);
    setGate(null);
    setAgentText("");
    setPhase("typing");

    // 1) "Stream" the agent's suggestion in.
    for (let i = 1; i <= scenario.agent.length; i += 3) {
      if (runToken.current !== token) return;
      setAgentText(scenario.agent.slice(0, i));
      await sleep(8);
    }
    setAgentText(scenario.agent);

    // 2) Send the suggestion to the guardrail.
    setPhase("scanning");
    let data;
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: scenario.agent }),
      });
      data = await res.json();
    } catch {
      if (runToken.current === token) {
        setPhase("done");
        setGate("error");
      }
      return;
    }
    if (runToken.current !== token) return;

    // 3) Reveal verdicts one by one for a real-time interception feel.
    const revealed = [];
    for (const r of data.results) {
      if (runToken.current !== token) return;
      revealed.push({ ...r, verdict: "checking" });
      setResults([...revealed]);
      await sleep(450);
      revealed[revealed.length - 1] = r;
      setResults([...revealed]);
      await sleep(200);
    }

    if (runToken.current !== token) return;
    setGate(data.gate);
    setPhase("done");
  }

  return (
    <section className="panel">
      <div className="panel__head">
        <h2>Live agent guardrail</h2>
        <p>
          Pick a prompt. The AI assistant suggests packages to install — CodeBouncer intercepts
          every one and decides whether it is safe to install.
        </p>
      </div>

      <div className="scenarios">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            className={`scenario ${activeId === s.id ? "is-active" : ""}`}
            onClick={() => runScenario(s)}
            disabled={phase === "typing" || phase === "scanning"}
          >
            {s.title}
          </button>
        ))}
      </div>

      {activeId && (
        <div className="ide">
          <div className="ide__bar">
            <span className="dot dot--r" />
            <span className="dot dot--y" />
            <span className="dot dot--g" />
            <span className="ide__title">AI Coding Assistant</span>
          </div>

          <div className="ide__body">
            <div className="msg msg--agent">
              <span className="msg__who">assistant</span>
              <pre className="msg__text">{agentText}{phase === "typing" && <span className="caret" />}</pre>
            </div>

            {(phase === "scanning" || phase === "done") && (
              <div className="intercept">
                <div className="intercept__head">
                  <span className="shield">🛡️</span>
                  CodeBouncer intercepted {results.length || "…"} package
                  {results.length === 1 ? "" : "s"}
                </div>
                <div className="pkg-list">
                  {results.map((r) => (
                    <PackageVerdict key={`${r.ecosystem}:${r.name}`} pkg={r} />
                  ))}
                </div>
              </div>
            )}

            {gate && (
              <div className={`gate gate--${gate}`}>
                {gate === "block" && "⛔ Install blocked — dangerous packages detected. Review before proceeding."}
                {gate === "warn" && "⚠️ Proceed with caution — some packages look risky."}
                {gate === "allow" && "✅ All clear — these packages are safe to install."}
                {gate === "error" && "Could not reach the guardrail service. Is the API running?"}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
