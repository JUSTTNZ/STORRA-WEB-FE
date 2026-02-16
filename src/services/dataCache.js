import { courseService } from './courseService';
import { quizService } from './quizService';
import { leaderboardService } from './leaderboardService';
import { rewardsService } from './rewardsService';

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

// Fire all major API calls at once after login
// Each one is independent - if one fails, the rest still cache
export function prefetchAll() {
  const fetches = [
    courseService.getCourses().then(res => setCache('courses', res)).catch(() => {}),
    quizService.getStats().then(res => setCache('quizStats', res)).catch(() => {}),
    leaderboardService.getLeaderboard(1, 20).then(res => setCache('leaderboard', res)).catch(() => {}),
    rewardsService.getRewards().then(res => setCache('rewards', res)).catch(() => {}),
    rewardsService.getCalendar().then(res => setCache('rewardsCalendar', res)).catch(() => {}),
  ];

  Promise.all(fetches);
}
