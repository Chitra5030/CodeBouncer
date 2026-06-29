// NOTE: Update the founder name, short bio, and LinkedIn URL with your real details.
const FOUNDER = {
  name: "Chitra Rajesh Khade",
  title: "Founder & CEO",
  initials: "CK",
  blurb: "Software engineer turned founder, building the security layer for AI-assisted development.",
};

const tags = ["AI-First Security", "Developer Tool · B2B SaaS", "Launching 2026"];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">About Us</span>
          <h2>Securing how the world ships AI-written code</h2>
          <p>
            We're building the security layer for AI-assisted development — so teams can move at the
            speed of AI without inheriting its blind spots.
          </p>
        </div>

        <div className="about__body">
          <p>
            CodeBouncer is a security platform that inspects every dependency an AI tool suggests and
            verifies it against live registry data before it's installed. We serve individual
            developers, engineering teams, and the AI coding platforms that need to keep their users
            safe at scale.
          </p>
          <p>
            Our detection engine combines registry verification, typosquat analysis, package
            reputation, and a growing database of known hallucinated names — turning a confident but
            wrong AI suggestion into a caught threat instead of a silent breach.
          </p>
          <div className="tags">
            {tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        {/* Compact founder byline (distinct from a large profile card) */}
        <div className="byline">
          <span className="byline__avatar" aria-hidden="true">{FOUNDER.initials}</span>
          <div className="byline__text">
            <span className="byline__line">
              Built by <strong>{FOUNDER.name}</strong> · {FOUNDER.title}
            </span>
            <p>{FOUNDER.blurb}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
