import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const quizApi = {
  // Get quiz by courseId and quizId
  async getQuiz(courseId, quizId) {
    const response = await axiosInstance.get(ENDPOINTS.QUIZ.GET_QUIZ(courseId, quizId));
    return response.data;
  },

  // Submit quiz attempt
  async submitQuiz(courseId, quizId, answers, timeSpent) {
    const response = await axiosInstance.post(ENDPOINTS.QUIZ.SUBMIT_QUIZ(courseId, quizId), {
      answers,
      timeSpent,
    });
    return response.data;
  },

  // Get user's quiz progress for a course
  async getCourseProgress(courseId) {
    const response = await axiosInstance.get(ENDPOINTS.QUIZ.GET_PROGRESS(courseId));
    return response.data;
  },

  // Get all user's quiz statistics
  async getStats() {
    const response = await axiosInstance.get(ENDPOINTS.QUIZ.GET_STATS);
    return response.data;
  },
};

export default quizApi;
