import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const courseApi = {
  async getCourses(classId) {
    const response = await axiosInstance.get(ENDPOINTS.CLASSES.GET_COURSES(classId));
    return response.data;
  },

  async getCourseTopics(classId, courseId) {
    const response = await axiosInstance.get(ENDPOINTS.CLASSES.GET_COURSE_TOPICS(classId, courseId));
    return response.data;
  },

  async getCourseOverview(courseId) {
    const response = await axiosInstance.get(ENDPOINTS.PROGRESS.COURSE_OVERVIEW(courseId));
    return response.data;
  },

  async getCourseLessons(courseId) {
    const response = await axiosInstance.get(ENDPOINTS.PROGRESS.LESSONS(courseId));
    return response.data;
  },

  async getLessonProgress(lessonId) {
    const response = await axiosInstance.get(ENDPOINTS.PROGRESS.LESSON(lessonId));
    return response.data;
  },

  async updateLessonProgress(lessonId, progress) {
    const response = await axiosInstance.put(ENDPOINTS.PROGRESS.UPDATE_LESSON(lessonId), { progress });
    return response.data;
  },

  async completeLesson(lessonId) {
    const response = await axiosInstance.post(ENDPOINTS.PROGRESS.COMPLETE_LESSON(lessonId));
    return response.data;
  },

  async toggleBookmark(lessonId) {
    const response = await axiosInstance.post(ENDPOINTS.PROGRESS.TOGGLE_BOOKMARK(lessonId));
    return response.data;
  },

  async updateNotes(lessonId, notes) {
    const response = await axiosInstance.put(ENDPOINTS.PROGRESS.UPDATE_NOTES(lessonId), { notes });
    return response.data;
  },
};

export default courseApi;
