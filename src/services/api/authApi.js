import api from '../api';
import { ENDPOINTS } from '../endpoints';

export const authApi = {
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

  async login(credentials) {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get(ENDPOINTS.AUTH.ME);
    return response.data;
  },

  async resetPassword(email) {
    const response = await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, { email });
    return response.data;
  },

  async editProfile(profileData) {
    const response = await api.put(ENDPOINTS.AUTH.EDIT_PROFILE, profileData);
    return response.data;
  },

  logout() {
    // Handled by Redux
  },
};

export default authApi;
