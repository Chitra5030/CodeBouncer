// Classic Levenshtein edit distance. Used to detect names that are a tiny
// edit away from a popular package (a common typosquat / slopsquat pattern).

export function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  let prev = new Array(n + 1);
  let curr = new Array(n + 1);

  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

// Returns the closest popular package within `maxDistance`, or null.
export function nearestPopular(name, popularList, maxDistance = 2) {
  let best = null;
  for (const candidate of popularList) {
    if (candidate === name) return { candidate, distance: 0 };
    const d = levenshtein(name, candidate);
    if (d <= maxDistance && (!best || d < best.distance)) {
      best = { candidate, distance: d };
    }
  }
  return best;
}
