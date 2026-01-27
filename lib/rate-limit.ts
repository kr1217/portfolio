import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60, // per 60 seconds by IP
});

export async function rateLimit(ip: string) {
  try {
    await rateLimiter.consume(ip);
    return { success: true };
  } catch {
    return { success: false };
  }
}
