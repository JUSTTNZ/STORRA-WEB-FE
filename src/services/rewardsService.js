import api from './api';
import { ENDPOINTS } from './endpoints';

export const rewardsService = {
  // Get user's rewards dashboard
  // Backend returns full UserRewards document
  async getRewards() {
    const response = await api.get(ENDPOINTS.REWARDS.GET_REWARDS);
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    // Normalize to match frontend expectations
    return {
      balance: data.totalCoins || 0,
      points: data.totalPoints || 0,
      diamonds: data.totalDiamonds || 0,
      spinChances: data.spinChances || 0,
      level: data.currentStreak >= 30 ? 'Gold' : data.currentStreak >= 7 ? 'Silver' : 'Bronze',
      pointsToNextLevel: 100 - (data.totalPoints % 100),
      currentStreak: data.currentStreak || 0,
      longestStreak: data.longestStreak || 0,
      achievements: data.achievements || [],
      dailyRewards: data.dailyRewards || [],
      transactionHistory: data.transactionHistory || [],
      available: [], // Map achievements that are unlocked but not claimed
      history: (data.transactionHistory || []).slice(0, 10).map((t, i) => ({
        id: i + 1,
        title: t.description || t.source,
        points: t.amount,
        date: t.timestamp ? new Date(t.timestamp).toLocaleDateString() : 'Recently',
      })),
    };
  },

  // Claim daily login reward
  async claimDaily() {
    const response = await api.post(ENDPOINTS.REWARDS.CLAIM_DAILY);
    const apiResponse = response.data;
    return apiResponse.data || apiResponse;
  },

  // Claim achievement reward
  async claimAchievement(achievementId) {
    const response = await api.post(ENDPOINTS.REWARDS.CLAIM_ACHIEVEMENT(achievementId));
    const apiResponse = response.data;
    return apiResponse.data || apiResponse;
  },

  // Get daily rewards calendar
  async getCalendar() {
    const response = await api.get(ENDPOINTS.REWARDS.GET_CALENDAR);
    const apiResponse = response.data;
    return apiResponse.data || apiResponse;
  },
};

export default rewardsService;
