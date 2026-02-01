import api from './api';
import { ENDPOINTS } from './endpoints';

export const profileService = {
  // Upload profile picture
  async uploadProfilePicture(file, userId) {
    const formData = new FormData();
    formData.append('profile', file);
    if (userId) formData.append('userId', userId);

    const response = await api.post(ENDPOINTS.PROFILE.UPLOAD_PICTURE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default profileService;
