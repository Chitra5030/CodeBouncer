import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Hero from "./components/Hero.jsx";
import TrustStrip from "./components/TrustStrip.jsx";
import About from "./components/About.jsx";
import Mission from "./components/Mission.jsx";
import StatBand from "./components/StatBand.jsx";
import Features from "./components/Features.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import FlowDiagram from "./components/FlowDiagram.jsx";
import Demo from "./components/Demo.jsx";
import Compare from "./components/Compare.jsx";
import Pricing from "./components/Pricing.jsx";
import FAQ from "./components/FAQ.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".section__head, .card, .step, .tag, .mission__lead, .preview"
    );
    if (!("IntersectionObserver" in window) || targets.length === 0) return;

    // Add the hidden state only via JS, so content is never hidden if JS fails.
    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-delay", `${(i % 4) * 70}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();
  return (
    <>
      <div className="bg-fx" aria-hidden="true">
        <span className="bg-fx__grid" />
        <span className="bg-fx__glow bg-fx__glow--1" />
        <span className="bg-fx__glow bg-fx__glow--2" />
      </div>
      <Navbar />
      <ScrollProgress />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Mission />
        <StatBand />
        <Features />
        <HowItWorks />
        <FlowDiagram />
        <Demo />
        <Compare />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
