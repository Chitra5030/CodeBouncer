import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 41, suffix: "%", decimals: 0, label: "of new code is now AI-generated" },
  { value: 45, suffix: "%", decimals: 0, label: "of AI code ships a known vuln class" },
  { value: 1.7, suffix: "×", decimals: 1, label: "more bugs than human-written code" },
  { value: 100, suffix: "%", decimals: 0, label: "of suggested packages verified live" },
];

function useCountUp(target, decimals, run) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return val.toFixed(decimals);
}

function Stat({ stat, run }) {
  const display = useCountUp(stat.value, stat.decimals, run);
  return (
    <div className="statband__item">
      <span className="statband__num">
        {display}
        <span className="statband__suffix">{stat.suffix}</span>
      </span>
      <span className="statband__label">{stat.label}</span>
    </div>
  );
}

export default function StatBand() {
  const [run, setRun] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="statband" ref={ref} aria-label="Key statistics">
      <div className="container statband__grid">
        {STATS.map((s) => (
          <Stat key={s.label} stat={s} run={run} />
        ))}
      </div>
      <p className="statband__src container">
        Sources: industry analyses of AI-generated code adoption and quality, 2025–2026.
      </p>
    </section>
  );
}
