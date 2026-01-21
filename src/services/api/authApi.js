import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const authApi = {
  async register(userData) {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.REGISTER, {
      fullName: userData.fullName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      parentPhoneNumber: userData.parentPhoneNumber || undefined,
    });
    return response.data;
  },

  async login(credentials) {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.LOGIN, {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await axiosInstance.get(ENDPOINTS.AUTH.ME);
    return response.data;
  },

  async resetPassword(email) {
    const response = await axiosInstance.post(ENDPOINTS.AUTH.RESET_PASSWORD, { email });
    return response.data;
  },

  async editProfile(profileData) {
    const response = await axiosInstance.put(ENDPOINTS.AUTH.EDIT_PROFILE, profileData);
    return response.data;
  },

  logout() {
    // Clear any stored data if needed
    // This is handled by Redux now
  },
};

export default authApi;
