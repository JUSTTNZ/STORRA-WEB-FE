export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    RESET_PASSWORD: '/auth/reset-password',
    EDIT_PROFILE: '/auth/edit-profile',
  },
  ONBOARDING: {
    PERSONALIZATION: (userId) => `/onboarding/personalization/${userId}`,
    LEARNING_GOALS: (userId) => `/onboarding/learning-goals/${userId}`,
    CLASSES: '/onboarding/classes',
    SELECT_CLASS: (userId) => `/onboarding/select-class/${userId}`,
    MY_COURSES: '/onboarding/my-courses',
  },
  CLASSES: {
    GET_COURSES: (classId) => `/classes/${classId}/courses`,
    GET_COURSE_TOPICS: (classId, courseId) => `/classes/${classId}/courses/${courseId}/topics`,
  },
  QUIZ: {
    GET_QUIZ: (quizId) => `/quiz/${quizId}`,
    SUBMIT_QUIZ: (quizId) => `/quiz/${quizId}/submit`,
    GET_PROGRESS: (courseId) => `/quiz/progress/${courseId}`,
    GET_STATS: '/quiz/stats',
  },
  REWARDS: {
    GET_REWARDS: '/rewards',
    CLAIM_DAILY: '/rewards/claim-daily',
    CLAIM_ACHIEVEMENT: (achievementId) => `/rewards/claim/${achievementId}`,
    GET_CALENDAR: '/rewards/calendar',
  },
  PROFILE: {
    UPLOAD_PICTURE: '/profile/upload-picture',
  },
  LEADERBOARD: {
    GET_LEADERBOARD: '/leaderboard',
  },
  PROGRESS: {
    STATS: '/progress/stats',
    BOOKMARKS: '/progress/bookmarks',
    COURSE_OVERVIEW: (courseId) => `/progress/course/${courseId}`,
    LESSONS: (courseId) => `/progress/course/${courseId}/lessons`,
    LESSON: (lessonId) => `/progress/lesson/${lessonId}`,
    UPDATE_LESSON: (lessonId) => `/progress/lesson/${lessonId}`,
    COMPLETE_LESSON: (lessonId) => `/progress/lesson/${lessonId}/complete`,
    TOGGLE_BOOKMARK: (lessonId) => `/progress/lesson/${lessonId}/bookmark`,
    UPDATE_NOTES: (lessonId) => `/progress/lesson/${lessonId}/notes`,
  },
  SPIN: {
    SPIN_WHEEL: '/spin/spin',
    GET_PREVIEW: '/spin/preview',
  },
  DAILY: {
    GET_INFO: '/daily/info',
    CLAIM: '/daily/claim',
  },
};

export default ENDPOINTS;
