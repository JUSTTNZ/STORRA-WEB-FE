import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const userApi = {
  async editProfile(profileData) {
    const response = await axiosInstance.put(ENDPOINTS.AUTH.EDIT_PROFILE, profileData);
    return response.data;
  },

  async uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('profilePicture', file);

    const response = await axiosInstance.post(ENDPOINTS.PROFILE.UPLOAD_PICTURE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async updatePersonalization(userId, data) {
    const response = await axiosInstance.put(ENDPOINTS.ONBOARDING.PERSONALIZATION(userId), data);
    return response.data;
  },

  async updateLearningGoals(userId, data) {
    const response = await axiosInstance.put(ENDPOINTS.ONBOARDING.LEARNING_GOALS(userId), data);
    return response.data;
  },

  async getClasses() {
    const response = await axiosInstance.get(ENDPOINTS.ONBOARDING.CLASSES);
    return response.data;
  },

  async selectClass(userId, classId) {
    const response = await axiosInstance.post(ENDPOINTS.ONBOARDING.SELECT_CLASS(userId), { classId });
    return response.data;
  },

  async getMyCourses() {
    const response = await axiosInstance.get(ENDPOINTS.ONBOARDING.MY_COURSES);
    return response.data;
  },
};

export default userApi;
