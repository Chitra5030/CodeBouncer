// Extracts candidate package references from arbitrary text such as an AI
// assistant's reply, a code block, or a terminal command.
// Returns a de-duplicated list of { ecosystem, name }.

const NPM_INSTALL = /\b(?:npm\s+(?:i|install|add)|yarn\s+add|pnpm\s+add|bun\s+add)\s+([^\n`]+)/gi;
const PIP_INSTALL = /\b(?:pip3?|uv\s+pip|python\s+-m\s+pip)\s+install\s+([^\n`]+)/gi;

const JS_IMPORT = /\b(?:import\s+(?:[^'"]+\s+from\s+)?|require\(\s*)['"]([^'"./][^'"]*)['"]/g;
const PY_IMPORT = /^\s*(?:from\s+([a-zA-Z0-9_][\w]*)|import\s+([a-zA-Z0-9_][\w]*))/gm;

const NPM_FLAG = /^-/;
const SCOPED = /^@[^/]+\/[^@]+/;

function cleanNpmSpec(token) {
  if (NPM_FLAG.test(token)) return null;
  if (SCOPED.test(token)) {
    const at = token.indexOf("/") + 1;
    const rest = token.slice(at);
    const ver = rest.indexOf("@");
    return ver > 0 ? token.slice(0, at + ver) : token;
  }
  // strip version range: lodash@^4 -> lodash
  const at = token.indexOf("@");
  return at > 0 ? token.slice(0, at) : token;
}

function cleanPySpec(token) {
  if (token.startsWith("-")) return null;
  // strip extras and version pins: package[extra]==1.2 -> package
  return token.split(/[<>=!~\[ ]/)[0].trim();
}

// Map common Python import names to their PyPI distribution names.
const PY_IMPORT_TO_DIST = {
  cv2: "opencv-python",
  PIL: "pillow",
  sklearn: "scikit-learn",
  bs4: "beautifulsoup4",
  yaml: "pyyaml",
  dotenv: "python-dotenv",
  jwt: "pyjwt",
};

const PY_STDLIB = new Set([
  "os", "sys", "re", "json", "math", "time", "random", "datetime", "collections",
  "itertools", "functools", "typing", "pathlib", "subprocess", "threading",
  "asyncio", "logging", "unittest", "abc", "io", "csv", "sqlite3", "http",
]);

export function extractPackages(text) {
  const found = new Map(); // key `${eco}:${name}` -> {ecosystem,name}
  const add = (ecosystem, name) => {
    if (!name) return;
    const n = name.trim();
    if (!n) return;
    found.set(`${ecosystem}:${n}`, { ecosystem, name: n });
  };

  let m;

  while ((m = NPM_INSTALL.exec(text))) {
    for (const tok of m[1].trim().split(/\s+/)) {
      const name = cleanNpmSpec(tok);
      if (name) add("npm", name);
    }
  }

  while ((m = PIP_INSTALL.exec(text))) {
    for (const tok of m[1].trim().split(/\s+/)) {
      const name = cleanPySpec(tok);
      if (name) add("pypi", name);
    }
  }

  while ((m = JS_IMPORT.exec(text))) {
    let name = m[1];
    if (SCOPED.test(name)) {
      name = name.split("/").slice(0, 2).join("/");
    } else {
      name = name.split("/")[0];
    }
    if (!name.startsWith("node:")) add("npm", name);
  }

  while ((m = PY_IMPORT.exec(text))) {
    const raw = (m[1] || m[2] || "").split(".")[0];
    if (!raw || PY_STDLIB.has(raw)) continue;
    add("pypi", PY_IMPORT_TO_DIST[raw] || raw);
  }

  return [...found.values()];
}
