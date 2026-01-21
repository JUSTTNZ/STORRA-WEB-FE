import api from './api';
import { ENDPOINTS } from './endpoints';

export const rewardsService = {
  // Get user's rewards dashboard
  async getRewards() {
    const response = await api.get(ENDPOINTS.REWARDS.GET_REWARDS);
    return response.data;
  },

  // Claim daily login reward
  async claimDaily() {
    const response = await api.post(ENDPOINTS.REWARDS.CLAIM_DAILY);
    return response.data;
  },

  // Claim achievement reward
  async claimAchievement(achievementId) {
    const response = await api.post(ENDPOINTS.REWARDS.CLAIM_ACHIEVEMENT(achievementId));
    return response.data;
  },

  // Get daily rewards calendar
  async getCalendar() {
    const response = await api.get(ENDPOINTS.REWARDS.GET_CALENDAR);
    return response.data;
  },
};

export default rewardsService;
