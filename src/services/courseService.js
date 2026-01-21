import api from './api';
import { ENDPOINTS } from './endpoints';

export const courseService = {
  // Get courses for user's current class
  async getCourses() {
    const response = await api.get(ENDPOINTS.CLASSES.GET_COURSES);
    return response.data;
  },

  // Get topics for a specific course
  async getCourseTopics(courseId) {
    const response = await api.get(ENDPOINTS.CLASSES.GET_COURSE_TOPICS(courseId));
    return response.data;
  },
};

export default courseService;
