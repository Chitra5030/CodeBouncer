import { nearestPopular } from "./levenshtein.js";
import { POPULAR } from "./popularPackages.js";

const DAY = 24 * 60 * 60 * 1000;

function daysSince(iso) {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / DAY);
}

// Each signal contributes risk points and a human-readable reason.
// Verdict thresholds: >=70 block, >=35 warn, else allow.
export function scorePackage(meta) {
  const reasons = [];
  let risk = 0;

  // 1) Registry unreachable -> we cannot vouch for it.
  if (meta.exists === null || meta.unreachable) {
    return {
      ...meta,
      risk: 50,
      verdict: "warn",
      reasons: [
        {
          signal: "registry-unreachable",
          severity: "medium",
          message: `Could not reach the ${meta.ecosystem} registry to verify this package. Treat as unverified.`,
        },
      ],
    };
  }

  // 2) Package does not exist -> almost certainly an AI hallucination.
  if (meta.exists === false) {
    const near = nearestPopular(meta.name, POPULAR[meta.ecosystem] || []);
    reasons.push({
      signal: "hallucinated",
      severity: "critical",
      message:
        `No package named "${meta.name}" exists in the ${meta.ecosystem} registry. ` +
        `This is a classic AI hallucination — do not run the install command. ` +
        `If an attacker registers this name later, it becomes a slopsquatting trap.`,
    });
    if (near && near.distance > 0) {
      reasons.push({
        signal: "did-you-mean",
        severity: "info",
        message: `Did you mean "${near.candidate}"? (the AI may have garbled a real package name)`,
      });
    }
    return { ...meta, risk: 95, verdict: "block", reasons };
  }

  // 3) Typosquat / lookalike of a popular package.
  const near = nearestPopular(meta.name, POPULAR[meta.ecosystem] || []);
  if (near && near.distance > 0 && near.distance <= 2) {
    risk += 55;
    reasons.push({
      signal: "typosquat",
      severity: "high",
      message:
        `Name is only ${near.distance} character(s) away from the popular package ` +
        `"${near.candidate}". Lookalike names are a common malware delivery trick.`,
    });
  }

  // 4) Very new package (freshly registered names are a slopsquat hallmark).
  const ageDays = daysSince(meta.created);
  if (ageDays !== null) {
    if (ageDays <= 14) {
      risk += 35;
      reasons.push({
        signal: "brand-new",
        severity: "high",
        message: `Published only ${ageDays} day(s) ago. Attackers register hallucinated names and wait for installs.`,
      });
    } else if (ageDays <= 90) {
      risk += 15;
      reasons.push({
        signal: "recent",
        severity: "medium",
        message: `Published ${ageDays} days ago. Relatively new — verify it is the package you intended.`,
      });
    }
  }

  // 5) Low adoption (npm only exposes downloads).
  if (meta.downloadsLastMonth !== null && meta.downloadsLastMonth !== undefined) {
    if (meta.downloadsLastMonth < 50) {
      risk += 25;
      reasons.push({
        signal: "low-adoption",
        severity: "medium",
        message: `Only ${meta.downloadsLastMonth} downloads last month. Almost no one uses this package.`,
      });
    } else if (meta.downloadsLastMonth < 1000) {
      risk += 10;
      reasons.push({
        signal: "modest-adoption",
        severity: "low",
        message: `${meta.downloadsLastMonth} downloads last month. Lower adoption than a mainstream library.`,
      });
    }
  }

  // 6) Single / few versions can indicate a placeholder package.
  if (meta.versionCount !== null && meta.versionCount <= 1 && ageDays !== null && ageDays <= 90) {
    risk += 10;
    reasons.push({
      signal: "single-version",
      severity: "low",
      message: "Only one published version. Often a placeholder or abandoned package.",
    });
  }

  if (reasons.length === 0) {
    reasons.push({
      signal: "looks-legit",
      severity: "info",
      message: "Exists, established, and widely used. No risk signals detected.",
    });
  }

  risk = Math.min(risk, 100);
  const verdict = risk >= 70 ? "block" : risk >= 35 ? "warn" : "allow";
  return { ...meta, risk, verdict, reasons };
}
