import { useState } from "react";
import BouncerLogo from "./BouncerLogo.jsx";
import LegalModal from "./LegalModal.jsx";

export default function Footer() {
  const [doc, setDoc] = useState(null);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="logo">
            <BouncerLogo size={30} />
            <span className="logo__text">Code<span className="logo__accent">Bouncer</span></span>
          </a>
          <p>Supply-chain protection for the AI coding era.</p>
        </div>
        <nav className="footer__cols">
          <div>
            <h5>Product</h5>
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#demo">Live demo</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div>
            <h5>Company</h5>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#waitlist">Waitlist</a>
          </div>
          <div>
            <h5>Legal</h5>
            <button className="footer__link" onClick={() => setDoc("privacy")}>Privacy Policy</button>
            <button className="footer__link" onClick={() => setDoc("terms")}>Terms &amp; Conditions</button>
            <a href="mailto:customer.support@codebouncer.online">Support</a>
          </div>
        </nav>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} CodeBouncer. All rights reserved.</span>
        <span className="footer__legal-inline">
          <button className="footer__link" onClick={() => setDoc("privacy")}>Privacy Policy</button>
          <span aria-hidden="true">·</span>
          <button className="footer__link" onClick={() => setDoc("terms")}>Terms &amp; Conditions</button>
        </span>
      </div>

      {doc && <LegalModal doc={doc} onClose={() => setDoc(null)} />}
    </footer>
  );
}
