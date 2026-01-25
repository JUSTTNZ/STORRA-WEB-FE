import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const leaderboardApi = {
  async getLeaderboard(params = {}) {
    const { page = 1, limit = 10, timeframe = 'monthly', region = 'global' } = params;
    const response = await axiosInstance.get(ENDPOINTS.LEADERBOARD.GET_LEADERBOARD, {
      params: { page, limit, timeframe, region },
    });
    return response.data;
  },
};

export default leaderboardApi;
