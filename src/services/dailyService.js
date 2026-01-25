import api from './api';
import { ENDPOINTS } from './endpoints';

export const dailyService = {
  // Get daily reward info
  async getInfo() {
    const response = await api.get(ENDPOINTS.DAILY.GET_INFO);
    return response.data;
  },

  // Claim daily login reward
  async claim() {
    const response = await api.post(ENDPOINTS.DAILY.CLAIM);
    return response.data;
  },
};

export default dailyService;
