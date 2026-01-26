import api from './api';
import { ENDPOINTS } from './endpoints';

export const courseService = {
  // Get courses for user's current class
  // Backend returns: { statusCode, message, data: { subjects, className, educationLevel } }
  async getCourses() {
    // The endpoint needs classId, but we'll use a dynamic approach
    // The backend will use the user's currentClassId from the token
    const response = await api.get('/classes/courses');
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    // Return subjects array (courses)
    return data.subjects || data || [];
  },

  // Get topics/lessons for a specific course
  // Backend returns: { statusCode, message, data: { courseName, courseProgress, topics, quiz } }
  async getCourseTopics(courseId) {
    const response = await api.get(`/classes/courses/${courseId}/topics`);
    const apiResponse = response.data;
    const data = apiResponse.data || apiResponse;

    return {
      courseName: data.courseName,
      courseProgress: data.courseProgress,
      topics: data.topics || data.lessons || [],
      quiz: data.quiz,
    };
  },

  // Get single lesson details
  async getLesson(courseId, lessonId) {
    const response = await api.get(`/classes/courses/${courseId}/lessons/${lessonId}`);
    const apiResponse = response.data;
    return apiResponse.data || apiResponse;
  },
};

export default courseService;
