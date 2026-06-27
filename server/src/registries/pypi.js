// Thin client for the public PyPI registry (JSON API).
// Returns normalized metadata or { exists: false } when the package is not found.

const BASE = "https://pypi.org/pypi";

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

function earliestUpload(releases) {
  let earliest = null;
  for (const files of Object.values(releases || {})) {
    for (const file of files || []) {
      const t = file.upload_time_iso_8601 || file.upload_time;
      if (t && (!earliest || t < earliest)) earliest = t;
    }
  }
  return earliest;
}

export async function lookupPypi(name) {
  const meta = await fetchJson(`${BASE}/${encodeURIComponent(name)}/json`);

  if (meta.status === 404) {
    return { ecosystem: "pypi", name, exists: false };
  }
  if (meta.status !== 200) {
    return { ecosystem: "pypi", name, exists: null, unreachable: true };
  }

  const data = meta.body;
  const releases = data.releases || {};
  const versionCount = Object.keys(releases).length;

  return {
    ecosystem: "pypi",
    name,
    exists: true,
    created: earliestUpload(releases),
    modified: null,
    versionCount,
    downloadsLastMonth: null, // PyPI does not expose this on the JSON API
    deprecated: false,
    maintainers: null,
    summary: data.info?.summary || null,
  };
}
