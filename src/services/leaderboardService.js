import api from './api';
import { ENDPOINTS } from './endpoints';

export const leaderboardService = {
  // Get leaderboard with pagination
  // Backend returns: { statusCode, message, data: { leaderboard, meta } }
  async getLeaderboard(page = 1, limit = 10) {
    const response = await api.get(ENDPOINTS.LEADERBOARD.GET_LEADERBOARD, {
      params: { page, limit },
    });
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    // Return formatted leaderboard data
    return {
      leaderboard: (data.leaderboard || []).map((user) => ({
        rank: user.rank,
        name: user.fullname || user.username || 'User',
        score: user.totalPoints || 0,
        change: 0, // Backend doesn't track rank changes yet
        avatar: user.profilePictureUrl || '👤',
        id: user.userId,
        classLevel: user.currentClassLevel,
        educationLevel: user.educationLevel,
      })),
      meta: data.meta || { total: 0, page, limit, totalPages: 0 },
    };
  },
};

export default leaderboardService;
