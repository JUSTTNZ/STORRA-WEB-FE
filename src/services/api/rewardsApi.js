import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const rewardsApi = {
  async getRewards() {
    const response = await axiosInstance.get(ENDPOINTS.REWARDS.GET_REWARDS);
    return response.data;
  },

  async claimDaily() {
    const response = await axiosInstance.post(ENDPOINTS.REWARDS.CLAIM_DAILY);
    return response.data;
  },

  async claimAchievement(achievementId) {
    const response = await axiosInstance.post(ENDPOINTS.REWARDS.CLAIM_ACHIEVEMENT(achievementId));
    return response.data;
  },

  async getCalendar() {
    const response = await axiosInstance.get(ENDPOINTS.REWARDS.GET_CALENDAR);
    return response.data;
  },

  async spinWheel() {
    const response = await axiosInstance.post(ENDPOINTS.SPIN.SPIN_WHEEL);
    return response.data;
  },

  async getWheelPreview() {
    const response = await axiosInstance.get(ENDPOINTS.SPIN.GET_PREVIEW);
    return response.data;
  },

  async getDailyInfo() {
    const response = await axiosInstance.get(ENDPOINTS.DAILY.GET_INFO);
    return response.data;
  },

  async claimDailyReward() {
    const response = await axiosInstance.post(ENDPOINTS.DAILY.CLAIM);
    return response.data;
  },
};

export default rewardsApi;
