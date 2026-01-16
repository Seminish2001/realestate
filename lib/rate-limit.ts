type RateLimitRecord = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, RateLimitRecord>();

export const rateLimit = (key: string, limit = 10, windowMs = 60_000) => {
  const now = Date.now();
  const current = store.get(key);
  if (!current || current.expiresAt < now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  current.count += 1;
  store.set(key, current);
  return { allowed: true, remaining: limit - current.count };
};
