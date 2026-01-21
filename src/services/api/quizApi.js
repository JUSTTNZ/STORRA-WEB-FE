import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const quizApi = {
  async getQuiz(quizId) {
    const response = await axiosInstance.get(ENDPOINTS.QUIZ.GET_QUIZ(quizId));
    return response.data;
  },

  async submitQuiz(quizId, answers) {
    const response = await axiosInstance.post(ENDPOINTS.QUIZ.SUBMIT_QUIZ(quizId), { answers });
    return response.data;
  },

  async getCourseProgress(courseId) {
    const response = await axiosInstance.get(ENDPOINTS.QUIZ.GET_PROGRESS(courseId));
    return response.data;
  },

  async getStats() {
    const response = await axiosInstance.get(ENDPOINTS.QUIZ.GET_STATS);
    return response.data;
  },
};

export default quizApi;
