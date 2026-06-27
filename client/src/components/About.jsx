// NOTE: Update the founder name, bio, and LinkedIn URL below with your real details.
const FOUNDER = {
  name: "Chitra Rajesh Khade",
  title: "Founder & CEO",
  initials: "CK",
  bio: "Software engineer turned founder, focused on securing the new way software gets built. CodeBouncer was born from a simple realization: as AI writes more of our code, it also quietly invites a brand-new class of supply-chain attacks — and almost nobody is guarding that door yet.",
  linkedin: "#",
};

const tags = ["AI-First Security", "Developer Tool · B2B SaaS", "Launching 2026"];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">About Us</span>
          <h2>The team behind CodeBouncer</h2>
          <p>
            We're building the security layer for AI-assisted development — so teams can move at
            the speed of AI without inheriting its blind spots.
          </p>
        </div>

        <div className="about__grid">
          <article className="founder card">
            <div className="founder__avatar">{FOUNDER.initials}</div>
            <h3>{FOUNDER.name}</h3>
            <span className="founder__role">{FOUNDER.title}</span>
            <p>{FOUNDER.bio}</p>
            <a className="founder__link" href={FOUNDER.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </article>

          <div className="about__copy">
            <h3>Securing how the world ships AI-written code</h3>
            <p>
              CodeBouncer is a security platform that inspects every dependency an AI tool suggests
              and verifies it against live registry data before it's installed. We serve
              individual developers, engineering teams, and the AI coding platforms that need to
              keep their users safe at scale.
            </p>
            <p>
              Our detection engine combines registry verification, typosquat analysis, package
              reputation, and a growing database of known hallucinated names — turning a confident
              but wrong AI suggestion into a caught threat instead of a silent breach.
            </p>
            <div className="tags">
              {tags.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
