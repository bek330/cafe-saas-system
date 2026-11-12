const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const attempts = new Map();
let requestCount = 0;

function loginRateLimit(req, res, next) {
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  let entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    attempts.set(key, entry);
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    res.set('Retry-After', String(retryAfterSeconds));
    return res.status(429).json({
      error: 'Too many login attempts. Please try again later.',
    });
  }

  entry.count += 1;

  // Opportunistically remove expired entries so the map does not grow forever.
  requestCount += 1;
  if (requestCount % 100 === 0) {
    for (const [ip, value] of attempts) {
      if (value.resetAt <= now) attempts.delete(ip);
    }
  }

  return next();
}

module.exports = loginRateLimit;
