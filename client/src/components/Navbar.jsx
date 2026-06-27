import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import BouncerLogo from "./BouncerLogo.jsx";

const links = [
  { href: "#about", label: "About" },
  { href: "#mission", label: "Mission" },
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#demo", label: "Live demo" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#top" className="logo" aria-label="CodeBouncer home">
          <BouncerLogo size={34} />
          <span className="logo__text">
            Code<span className="logo__accent">Bouncer</span>
          </span>
        </a>

        <nav className={`nav__links ${open ? "is-open" : ""}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a className="btn btn--primary btn--glow nav__cta" href="#top" onClick={() => setOpen(false)}>
            Join waitlist <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
        </nav>

        <div className="nav__right">
          <ThemeToggle />
          <button
            className="nav__toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
