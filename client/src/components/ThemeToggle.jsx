import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => (typeof document !== "undefined" && document.documentElement.dataset.theme) || "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("cb-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  return (
    <button
      className="themebtn"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title="Toggle theme"
    >
      <span className="themebtn__icon">{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}
