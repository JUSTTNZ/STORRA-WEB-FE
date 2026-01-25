import api from './api';
import { ENDPOINTS } from './endpoints';

export const quizService = {
  // Get quiz by ID
  async getQuiz(courseId, quizId) {
    const response = await api.get(ENDPOINTS.QUIZ.GET_QUIZ(courseId, quizId));
    return response.data;
  },

  // Submit quiz attempt
  async submitQuiz(courseId, quizId, answers) {
    const response = await api.post(ENDPOINTS.QUIZ.SUBMIT_QUIZ(courseId, quizId), { answers });
    return response.data;
  },

  // Get course quiz progress
  async getCourseProgress(courseId) {
    const response = await api.get(ENDPOINTS.QUIZ.GET_COURSE_PROGRESS(courseId));
    return response.data;
  },

  // Get user's quiz stats
  async getStats() {
    const response = await api.get(ENDPOINTS.QUIZ.GET_STATS);
    return response.data;
  },
};

export default quizService;
