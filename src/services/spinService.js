import api from './api';
import { ENDPOINTS } from './endpoints';

export const spinService = {
  // Spin the wheel
  // Backend returns: { status, message, data: { reward, balances } }
  async spinWheel() {
    const response = await api.post(ENDPOINTS.SPIN.SPIN_WHEEL);
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    return {
      reward: data.reward,
      prize: data.reward?.name || data.reward?.description,
      balances: data.balances,
      spinChancesRemaining: data.balances?.spinChances || 0,
    };
  },

  // Get wheel preview
  // Backend returns preview rewards for the wheel display
  async getWheelPreview() {
    const response = await api.get(ENDPOINTS.SPIN.GET_PREVIEW);
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    // Format segments for the wheel
    const defaultColors = ['#FF4D82', '#FFB84D', '#A855F7', '#5DD4E8', '#FF8C42', '#3B9CFF', '#FF5555', '#8B92A0'];

    const segments = (Array.isArray(data) ? data : data.segments || []).map((reward, index) => ({
      text: reward.name || reward.text || `Prize ${index + 1}`,
      color: defaultColors[index % defaultColors.length],
      type: reward.type,
      angle: index * (360 / (Array.isArray(data) ? data.length : 8)),
    }));

    return {
      segments,
      canSpin: data.canSpin !== false,
      spinChances: data.spinChances || 0,
      nextSpinTime: data.nextSpinTime,
    };
  },
};

export default spinService;
