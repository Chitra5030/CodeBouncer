import { useState } from "react";
import { PackageVerdict } from "./Verdict.jsx";

const PLACEHOLDER = `Paste an AI reply, code block, or command. For example:

npm install express jsonwebtoken express-jwt-helper
pip install pandas requestz`;

export default function Scanner() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function scan() {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Scan failed.");
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel">
      <div className="panel__head">
        <h2>Scan anything yourself</h2>
        <p>Paste real text from any AI tool and see what CodeBouncer catches.</p>
      </div>

      <textarea
        className="scanner__input"
        value={text}
        placeholder={PLACEHOLDER}
        onChange={(e) => setText(e.target.value)}
        rows={6}
      />
      <button className="btn btn--primary" onClick={scan} disabled={loading || !text.trim()}>
        {loading ? "Scanning…" : "Scan for slopsquatting"}
      </button>

      {error && <p className="scanner__error">{error}</p>}

      {data && (
        <div className="scanner__results">
          <div className={`gate gate--${data.gate}`}>
            Scanned {data.scanned} package{data.scanned === 1 ? "" : "s"} —{" "}
            {data.summary.block} blocked, {data.summary.warn} warned, {data.summary.allow} allowed.
          </div>
          <div className="pkg-list">
            {data.results.map((r) => (
              <PackageVerdict key={`${r.ecosystem}:${r.name}`} pkg={r} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
