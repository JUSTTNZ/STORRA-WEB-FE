import api from './api';
import { ENDPOINTS } from './endpoints';

export const leaderboardService = {
  // Get leaderboard with pagination
  async getLeaderboard(page = 1, limit = 10) {
    const response = await api.get(ENDPOINTS.LEADERBOARD.GET_LEADERBOARD, {
      params: { page, limit },
    });
    return response.data;
  },
};

export default leaderboardService;
