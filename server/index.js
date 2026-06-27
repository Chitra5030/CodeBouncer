import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { lookupNpm } from "./src/registries/npm.js";
import { lookupPypi } from "./src/registries/pypi.js";
import { scorePackage } from "./src/risk/score.js";
import { extractPackages } from "./src/parser.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const CLIENT_DIST = path.join(__dirname, "..", "client", "dist");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Origins allowed to call the API from a browser. Same-origin (the served site)
// always works; this list covers the production domains and local dev.
const ALLOWED_ORIGINS = [
  "https://codebouncer.online",
  "https://www.codebouncer.online",
  "https://codebouncer.onrender.com",
  "http://localhost:5174",
  "http://localhost:5001",
];

const PORT = process.env.PORT || 5001;
const app = express();
// Render (and most PaaS) put the app behind a proxy; trust it so rate limiting
// and IP detection use the real client IP from X-Forwarded-For.
app.set("trust proxy", 1);

// --- security headers ---
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://api.emailjs.com"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        upgradeInsecureRequests: [],
      },
    },
    // Allow social/crawler fetches of the OG image cross-origin.
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin(origin, cb) {
      // Allow same-origin / server-to-server (no Origin header) and listed origins.
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "256kb" }));

// --- rate limiting (protects the public demo + registry lookups from abuse) ---
const rl = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: message },
  });

// Expensive endpoints that hit live npm/PyPI on cache miss.
const checkLimiter = rl(60 * 1000, 30, "Too many checks. Please slow down and try again shortly.");
// Form submissions: keep spam/bots in check.
const formLimiter = rl(60 * 60 * 1000, 10, "Too many submissions. Please try again later.");

// Serve the built client (single-service deploy). Skipped in dev where Vite serves it.
if (existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
}

// --- simple flat-file storage for waitlist + contact (swap for a DB later) ---
async function appendJson(file, entry) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const full = path.join(DATA_DIR, file);
  let list = [];
  try {
    list = JSON.parse(await fs.readFile(full, "utf8"));
  } catch {
    list = [];
  }
  list.push(entry);
  await fs.writeFile(full, JSON.stringify(list, null, 2), "utf8");
  return list.length;
}

// --- tiny in-memory cache (the "cheap scale" lever) ---
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const cache = new Map();
function cacheGet(key) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_TTL) return hit.value;
  cache.delete(key);
  return null;
}
function cacheSet(key, value) {
  cache.set(key, { at: Date.now(), value });
}

async function lookup(ecosystem, name) {
  if (ecosystem === "npm") return lookupNpm(name);
  if (ecosystem === "pypi") return lookupPypi(name);
  return { ecosystem, name, exists: null, unreachable: true };
}

// Check a single package and return a scored verdict.
async function checkOne(ecosystem, name) {
  const key = `${ecosystem}:${name.toLowerCase()}`;
  const cached = cacheGet(key);
  if (cached) return { ...cached, cached: true };

  const meta = await lookup(ecosystem, name);
  const scored = scorePackage(meta);
  cacheSet(key, scored);
  return scored;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "codebouncer", ecosystems: ["npm", "pypi"] });
});

// Waitlist signup: POST { email }
app.post("/api/waitlist", formLimiter, async (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  try {
    const count = await appendJson("waitlist.json", {
      email,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json({ message: "You're on the waitlist! We'll be in touch.", position: count });
  } catch {
    res.status(500).json({ error: "Could not save your signup. Try again." });
  }
});

// Contact form: POST { name, email, message }
app.post("/api/contact", formLimiter, async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim().toLowerCase();
  const message = String(req.body?.message || "").trim();
  if (!name || !EMAIL_RE.test(email) || !message) {
    return res.status(400).json({ error: "Name, a valid email, and a message are all required." });
  }
  try {
    await appendJson("contact.json", { name, email, message, createdAt: new Date().toISOString() });
    res.status(201).json({ message: "Thanks! We'll reply within 24 hours." });
  } catch {
    res.status(500).json({ error: "Could not send your message. Try again." });
  }
});

// Check one package: POST { ecosystem, name }
app.post("/api/check", checkLimiter, async (req, res) => {
  const ecosystem = String(req.body?.ecosystem || "npm").toLowerCase();
  const name = String(req.body?.name || "").trim();
  if (!name) return res.status(400).json({ error: "A package name is required." });
  if (!["npm", "pypi"].includes(ecosystem)) {
    return res.status(400).json({ error: "Supported ecosystems: npm, pypi." });
  }
  try {
    const result = await checkOne(ecosystem, name);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Check failed.", detail: String(err?.message || err) });
  }
});

// Scan free text (an AI reply, code block, or command) for all packages,
// returning a verdict per package plus an overall gate decision.
app.post("/api/scan", checkLimiter, async (req, res) => {
  const text = String(req.body?.text || "");
  if (!text.trim()) return res.status(400).json({ error: "Provide text to scan." });

  const packages = extractPackages(text);
  const results = await Promise.all(
    packages.map((p) => checkOne(p.ecosystem, p.name))
  );

  const blocked = results.filter((r) => r.verdict === "block");
  const warned = results.filter((r) => r.verdict === "warn");

  res.json({
    scanned: results.length,
    gate: blocked.length > 0 ? "block" : warned.length > 0 ? "warn" : "allow",
    summary: {
      allow: results.filter((r) => r.verdict === "allow").length,
      warn: warned.length,
      block: blocked.length,
    },
    results,
  });
});

// SPA fallback: any non-API GET serves the React app (single-service deploy).
if (existsSync(CLIENT_DIST)) {
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(path.join(CLIENT_DIST, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`CodeBouncer API listening on http://localhost:${PORT}`);
});
