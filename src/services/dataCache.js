const cache = new Map();

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export function setCache(key, data, ttlMs = DEFAULT_TTL) {
  cache.set(key, {
    data,
    expiry: Date.now() + ttlMs,
  });
}

export function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function clearCache() {
  cache.clear();
}
