import api from './api';
import { ENDPOINTS } from './endpoints';

export const courseService = {
  // Get courses for user's current class
  // Backend returns: { statusCode, message, data: { subjects, className, educationLevel } }
  async getCourses() {
    const response = await api.get(ENDPOINTS.CLASSES.GET_COURSES);
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    // Return subjects array (courses)
    return data.subjects || data || [];
  },

  // Get topics for a specific course
  // Backend returns: { statusCode, message, data: { courseName, courseProgress, topics, quiz } }
  async getCourseTopics(courseId) {
    const response = await api.get(ENDPOINTS.CLASSES.GET_COURSE_TOPICS(courseId));
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    return {
      courseName: data.courseName,
      courseProgress: data.courseProgress,
      topics: data.topics || [],
      quiz: data.quiz,
    };
  },
};

export default courseService;
