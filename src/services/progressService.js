import api from './api';
import { ENDPOINTS } from './endpoints';

export const progressService = {
  // Get user's learning stats
  async getStats() {
    const response = await api.get(ENDPOINTS.PROGRESS.STATS);
    return response.data;
  },

  // Get bookmarked lessons
  async getBookmarks() {
    const response = await api.get(ENDPOINTS.PROGRESS.BOOKMARKS);
    return response.data;
  },

  // Get course progress overview
  async getCourseOverview(courseId) {
    const response = await api.get(ENDPOINTS.PROGRESS.COURSE_OVERVIEW(courseId));
    return response.data;
  },

  // Get course lessons progress
  async getCourseLessons(courseId) {
    const response = await api.get(ENDPOINTS.PROGRESS.LESSONS(courseId));
    return response.data;
  },

  // Get lesson progress
  async getLessonProgress(lessonId) {
    const response = await api.get(ENDPOINTS.PROGRESS.LESSON(lessonId));
    return response.data;
  },

  // Update lesson progress (for text lessons)
  async updateLessonProgress(lessonId, progressData) {
    const response = await api.put(ENDPOINTS.PROGRESS.UPDATE_LESSON(lessonId), progressData);
    return response.data;
  },

  // Mark lesson as completed (manual completion)
  async completeLesson(lessonId, courseId) {
    const response = await api.post(ENDPOINTS.PROGRESS.COMPLETE_LESSON(lessonId), { courseId });
    return response.data;
  },

  // Mark video as played (auto-complete for video lessons)
  async markVideoPlayed(lessonId, courseId) {
    const response = await api.post(ENDPOINTS.PROGRESS.MARK_VIDEO_PLAYED(lessonId), { courseId });
    return response.data;
  },

  // Mark audio as played (auto-complete for audio lessons)
  async markAudioPlayed(lessonId, courseId) {
    const response = await api.post(ENDPOINTS.PROGRESS.MARK_AUDIO_PLAYED(lessonId), { courseId });
    return response.data;
  },

  // Toggle lesson bookmark
  async toggleBookmark(lessonId, courseId) {
    const response = await api.put(ENDPOINTS.PROGRESS.TOGGLE_BOOKMARK(lessonId), { courseId });
    return response.data;
  },

  // Update lesson notes
  async updateNotes(lessonId, courseId, notes) {
    const response = await api.put(ENDPOINTS.PROGRESS.UPDATE_NOTES(lessonId), { courseId, notes });
    return response.data;
  },
};

export default progressService;
