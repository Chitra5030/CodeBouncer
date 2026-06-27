# CodeBouncer

**The bouncer for AI-suggested code — a real-time guardrail that intercepts AI-suggested packages and blocks hallucinated, typosquatted, or malicious dependencies before they're installed.**

## The problem

AI coding tools (Copilot, Cursor, Claude, etc.) frequently *hallucinate* package names — they confidently suggest `npm install` / `pip install` commands for packages that don't exist. Attackers have learned which fake names AIs tend to invent, register those names on npm/PyPI, and upload malware. The next developer or AI agent that runs the install command gets compromised. This attack is called **slopsquatting**.

With ~41% of code now AI-generated (projected ~60% by end of 2026) and ~45% of AI-generated code carrying a known vulnerability class, this is a fast-growing software supply-chain threat.

## What CodeBouncer does

It sits between the AI agent and the package registry and checks every suggested package, like a bouncer checking IDs at the door:

1. **Existence** — does the package actually exist in the registry, or did the AI hallucinate it?
2. **Typosquat detection** — is the name a 1–2 character edit away from a popular package? (Levenshtein distance)
3. **Freshness** — was it registered suspiciously recently (a slopsquat hallmark)?
4. **Adoption** — does anyone actually use it? (npm download counts)
5. **Verdict** — combines signals into a risk score and an `allow` / `warn` / `block` decision, then gates the install.

## Architecture

```
codebouncer/
├── server/                 # Node + Express API (the detection engine)
│   ├── index.js            # /api/check, /api/scan, /api/health, /api/waitlist, /api/contact
│   └── src/
│       ├── registries/     # live npm + PyPI clients
│       ├── risk/           # scoring, Levenshtein, popular-package list
│       └── parser.js       # extracts packages from install commands / imports
└── client/                 # React + Vite UI (full landing page + live demo)
    └── src/components/      # hero, about, mission, features, pricing, FAQ, contact + the live guardrail demo
```

### Why it scales
- **Stateless checks** → scale horizontally behind a load balancer.
- **Caching** → repeated lookups don't hit registries; cost per check falls with volume.
- **Multi-ecosystem** → the same engine extends to Maven, Go, Cargo, RubyGems.
- **One engine, many surfaces** → IDE extension, CI check, Git hook, agent guardrail.
- **Data moat** → every catch feeds a proprietary hallucinated/malicious-name database; detection improves with scale.

## Getting started

```bash
npm run install:all   # install root + server + client
npm run dev           # run API (5001) + UI (5174) together
```

- UI: http://localhost:5174
- API: http://localhost:5001

The Vite dev server proxies `/api` to the backend.

## API

| Method | Route          | Body                          | Description                              |
| ------ | -------------- | ----------------------------- | ---------------------------------------- |
| GET    | `/api/health`  | —                             | Health check                             |
| POST   | `/api/check`   | `{ ecosystem, name }`         | Score a single package                   |
| POST   | `/api/scan`    | `{ text }`                    | Extract & score all packages in text     |
| POST   | `/api/waitlist`| `{ email }`                   | Waitlist signup                          |
| POST   | `/api/contact` | `{ name, email, message }`    | Contact form                             |

## Notes / next steps
- Checks hit live npm and PyPI registries, so the demo needs outbound internet.
- The "popular packages" list is static here; production would pull live download rankings.
- Update the founder details in `client/src/components/About.jsx` and contact emails in `Contact.jsx` / `Footer.jsx`.
- Roadmap: persistent reputation DB, more ecosystems, an editor extension, and an MCP/proxy guardrail that AI agents call before executing installs.
