import api from './api';
import { ENDPOINTS } from './endpoints';

export const authService = {
  // Register a new user
  async register(userData) {
    const response = await api.post(ENDPOINTS.AUTH.REGISTER, {
      fullName: userData.fullName,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      parentPhoneNumber: userData.parentPhoneNumber || undefined,
    });

    return response.data;
  },

  // Login user
  async login(credentials) {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get(ENDPOINTS.AUTH.ME);
    return response.data;
  },

  // Reset password
  async resetPassword(email) {
    const response = await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, { email });
    return response.data;
  },

  // Edit profile
  async editProfile(profileData) {
    const response = await api.put(ENDPOINTS.AUTH.EDIT_PROFILE, profileData);
    return response.data;
  },
};

export default authService;
