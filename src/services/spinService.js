import api from './api';
import { ENDPOINTS } from './endpoints';

export const spinService = {
  // Spin the wheel
  async spinWheel() {
    const response = await api.post(ENDPOINTS.SPIN.SPIN_WHEEL);
    return response.data;
  },

  // Get wheel preview
  async getWheelPreview() {
    const response = await api.get(ENDPOINTS.SPIN.GET_PREVIEW);
    return response.data;
  },
};

export default spinService;
