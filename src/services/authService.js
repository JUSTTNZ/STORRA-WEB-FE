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

    // Backend returns: { statusCode, message, data: { profile, supabaseUser, accessToken } }
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    // Normalize response for AuthContext
    return {
      token: data.accessToken,
      user: data.profile || data.user,
      supabaseUser: data.supabaseUser,
    };
  },

  // Login user
  async login(credentials) {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, {
      email: credentials.email,
      password: credentials.password,
    });

    // Backend returns: { statusCode, message, data: { profile, supabaseUser, accessToken } }
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    // Normalize response for AuthContext
    return {
      token: data.accessToken,
      user: data.profile || data.user,
      supabaseUser: data.supabaseUser,
    };
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get(ENDPOINTS.AUTH.ME);
    // Backend returns flattened user object in data
    const apiResponse = response.data;
    return apiResponse.data || apiResponse;
  },

  // Reset password
  async resetPassword(email) {
    const response = await api.post(ENDPOINTS.AUTH.RESET_PASSWORD, { email });
    return response.data;
  },

  // Edit profile
  async editProfile(profileData) {
    const response = await api.put(ENDPOINTS.AUTH.EDIT_PROFILE, profileData);
    const apiResponse = response.data;
    return apiResponse.data || apiResponse;
  },
};

export default authService;
