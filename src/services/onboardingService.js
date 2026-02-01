import api from './api';
import { ENDPOINTS } from './endpoints';

export const onboardingService = {
  // Update personalization (name, school, etc.)
  async updatePersonalization(userId, data) {
    const response = await api.patch(ENDPOINTS.ONBOARDING.PERSONALIZATION(userId), data);
    return response.data;
  },

  // Update learning goals
  async updateLearningGoals(userId, data) {
    const response = await api.patch(ENDPOINTS.ONBOARDING.LEARNING_GOALS(userId), data);
    return response.data;
  },

  // Get available classes for user
  async getClasses(userId) {
    const response = await api.get(ENDPOINTS.ONBOARDING.GET_CLASSES(userId));
    return response.data;
  },

  // Select a class
  async selectClass(userId, classId) {
    const response = await api.post(ENDPOINTS.ONBOARDING.SELECT_CLASS(userId), { classId });
    return response.data;
  },

  // Get user's courses based on selected class
  async getMyCourses(userId) {
    const response = await api.get(ENDPOINTS.ONBOARDING.MY_COURSES(userId));
    return response.data;
  },
};

export default onboardingService;
