import api from './api';
import { ENDPOINTS } from './endpoints';

export const progressService = {
  // Get user's learning stats
  async getStats() {
    const response = await api.get(ENDPOINTS.PROGRESS.GET_STATS);
    return response.data;
  },

  // Get bookmarked lessons
  async getBookmarks() {
    const response = await api.get(ENDPOINTS.PROGRESS.GET_BOOKMARKS);
    return response.data;
  },

  // Get course progress overview
  async getCourseOverview(courseId) {
    const response = await api.get(ENDPOINTS.PROGRESS.GET_COURSE_OVERVIEW(courseId));
    return response.data;
  },

  // Get course lessons progress
  async getCourseLessons(courseId) {
    const response = await api.get(ENDPOINTS.PROGRESS.GET_COURSE_LESSONS(courseId));
    return response.data;
  },

  // Get lesson progress
  async getLessonProgress(lessonId) {
    const response = await api.get(ENDPOINTS.PROGRESS.GET_LESSON(lessonId));
    return response.data;
  },

  // Update lesson progress
  async updateLessonProgress(lessonId, progressData) {
    const response = await api.put(ENDPOINTS.PROGRESS.UPDATE_LESSON(lessonId), progressData);
    return response.data;
  },

  // Mark lesson as completed
  async completeLesson(lessonId) {
    const response = await api.post(ENDPOINTS.PROGRESS.COMPLETE_LESSON(lessonId));
    return response.data;
  },

  // Toggle lesson bookmark
  async toggleBookmark(lessonId) {
    const response = await api.put(ENDPOINTS.PROGRESS.TOGGLE_BOOKMARK(lessonId));
    return response.data;
  },

  // Update lesson notes
  async updateNotes(lessonId, notes) {
    const response = await api.put(ENDPOINTS.PROGRESS.UPDATE_NOTES(lessonId), { notes });
    return response.data;
  },
};

export default progressService;
