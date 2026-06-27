// Thin client for the public npm registry.
// Returns normalized metadata or { exists: false } when the package is not found.

const REGISTRY = "https://registry.npmjs.org";
const DOWNLOADS = "https://api.npmjs.org/downloads/point/last-month";

async function fetchJson(url, timeoutMs = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (res.status === 404) return { status: 404 };
    if (!res.ok) return { status: res.status, error: true };
    return { status: 200, body: await res.json() };
  } catch (err) {
    return { status: 0, error: true, message: String(err?.message || err) };
  } finally {
    clearTimeout(timer);
  }
}

export async function lookupNpm(name) {
  const meta = await fetchJson(`${REGISTRY}/${encodeURIComponent(name)}`);

  if (meta.status === 404) {
    return { ecosystem: "npm", name, exists: false };
  }
  if (meta.status !== 200) {
    return { ecosystem: "npm", name, exists: null, unreachable: true };
  }

  const data = meta.body;
  const created = data.time?.created || null;
  const modified = data.time?.modified || null;
  const versionCount = data.versions ? Object.keys(data.versions).length : 0;

  // Downloads are best-effort; failures should not break the lookup.
  let downloadsLastMonth = null;
  const dl = await fetchJson(`${DOWNLOADS}/${encodeURIComponent(name)}`);
  if (dl.status === 200) downloadsLastMonth = dl.body?.downloads ?? null;

  return {
    ecosystem: "npm",
    name,
    exists: true,
    created,
    modified,
    versionCount,
    downloadsLastMonth,
    deprecated: Boolean(data.versions?.[data["dist-tags"]?.latest]?.deprecated),
    maintainers: Array.isArray(data.maintainers) ? data.maintainers.length : null,
  };
}
