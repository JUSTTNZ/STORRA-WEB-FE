import quizApi from "./api/quizApi";

export const quizService = {
  // Get quiz by courseId and quizId
  async getQuiz(courseId, quizId) {
    return quizApi.getQuiz(courseId, quizId);
  },

  // Submit quiz attempt
  async submitQuiz(courseId, quizId, answers, timeSpent) {
    return quizApi.submitQuiz(courseId, quizId, answers, timeSpent);
  },

  // Get course quiz progress
  async getCourseProgress(courseId) {
    return quizApi.getCourseProgress(courseId);
  },

  // Get user's quiz stats
  async getStats() {
    return quizApi.getStats();
  },
};

export default quizService;
