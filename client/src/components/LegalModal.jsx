import { useEffect } from "react";

const PRIVACY = {
  title: "Privacy Policy",
  updated: "Last updated: June 2026",
  intro:
    'CodeBouncer ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.',
  sections: [
    [
      "Information We Collect",
      "We collect information you voluntarily provide, including your name, email address, and any messages sent through our contact form. When you join our waitlist, we store your email address to notify you about product updates and launch information.",
    ],
    [
      "How We Use Your Information",
      "We use collected information to: communicate with you about our product, send waitlist updates and launch notifications, respond to your inquiries and support requests, and improve our website and services. We do not sell your personal information to third parties.",
    ],
    [
      "Package Data & Processing",
      "When you use CodeBouncer to check dependencies, we process only the package names and ecosystem (such as npm or PyPI) needed to verify them against public registry data. We do not require, read, or store your source code. Verification results may be cached to improve performance and detection quality.",
    ],
    [
      "Data Security",
      "We implement industry-standard security measures including encryption in transit (TLS 1.3), encrypted storage, and access controls. However, no method of electronic transmission is 100% secure, and we cannot guarantee absolute security.",
    ],
    [
      "Your Rights",
      "You may request access to, correction of, or deletion of your personal data at any time by contacting us at founder@codebouncer.online. We will respond to your request within 30 days.",
    ],
    [
      "Contact Us",
      "If you have questions about this Privacy Policy, please contact us at founder@codebouncer.online.",
    ],
  ],
};

const TERMS = {
  title: "Terms & Conditions",
  updated: "Last updated: June 2026",
  intro:
    "Welcome to CodeBouncer. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. Please read them carefully.",
  sections: [
    [
      "Acceptance of Terms",
      "By using CodeBouncer, you agree to these Terms. If you do not agree to these Terms, do not use our services. We may update these Terms from time to time, and your continued use constitutes acceptance of those changes.",
    ],
    [
      "Use of Service & Account Responsibilities",
      "You are responsible for maintaining the confidentiality of your account credentials. You agree not to use the service for any illegal or unauthorized purpose, and not to interfere with or disrupt the integrity or performance of the service.",
    ],
    [
      "Content Ownership & Rights",
      "You retain all ownership rights to the source code and projects you work on. CodeBouncer only analyzes package names and public registry metadata to produce verification results, and those results are provided to you for your own use. We do not claim ownership of your code.",
    ],
    [
      "Acceptable Use Policy",
      "You agree not to misuse the service, use our API abusively, attempt to reverse-engineer our proprietary detection models, or use CodeBouncer to facilitate any unlawful activity. We reserve the right to suspend or terminate accounts that violate this policy.",
    ],
    [
      "Limitation of Liability",
      'CodeBouncer is provided "as is" without any warranties, express or implied. While we strive for high accuracy, we do not guarantee that every malicious or unsafe package will be detected, or that safe packages will never be flagged. You remain responsible for reviewing and securing your own software.',
    ],
    [
      "Subscriptions and Payments",
      "Paid plans are billed on a recurring basis. You may cancel your subscription at any time; however, there are no refunds for partially used billing periods unless required by law.",
    ],
    [
      "Contact Us",
      "If you have any questions about these Terms, please contact us at founder@codebouncer.online.",
    ],
  ],
};

const DOCS = { privacy: PRIVACY, terms: TERMS };

export default function LegalModal({ doc, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const content = DOCS[doc];
  if (!content) return null;

  return (
    <div className="legal" role="dialog" aria-modal="true" aria-label={content.title} onClick={onClose}>
      <div className="legal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="legal__head">
          <h2>{content.title}</h2>
          <button className="legal__close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="legal__body">
          <p className="legal__eff">{content.updated}</p>
          <p className="legal__intro">{content.intro}</p>
          {content.sections.map(([heading, text], i) => (
            <section key={heading} className="legal__section">
              <h3>{i + 1}. {heading}</h3>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
