// API Endpoints based on backend routes
// Base: /api/v1

export const ENDPOINTS = {
  // ============ STUDENT/USER ROUTES (/student) ============
  AUTH: {
    REGISTER: '/student/registeruser',
    LOGIN: '/student/loginuser',
    ME: '/student/me',
    RESET_PASSWORD: '/student/resetpassword',
    EDIT_PROFILE: '/student/editprofile',
  },

  // ============ ONBOARDING ROUTES (/onboarding) ============
  ONBOARDING: {
    PERSONALIZATION: (userId) => `/onboarding/personalization/${userId}`,
    LEARNING_GOALS: (userId) => `/onboarding/learning-goals/${userId}`,
    GET_CLASSES: (userId) => `/onboarding/classes/${userId}`,
    SELECT_CLASS: (userId) => `/onboarding/select-class/${userId}`,
    MY_COURSES: (userId) => `/onboarding/my-courses/${userId}`,
  },

  // ============ CLASS ROUTES (/classes) ============
  CLASSES: {
     fiGET_COURSES: '/classes/courses',
    GET_COURSE_TOPICS: (courseId) => `/classes/courses/${courseId}/topics`,
  },

  // ============ QUIZ ROUTES (/quiz) ============
  QUIZ: {
    GET_QUIZ: (courseId, quizId) => `/quiz/course/${courseId}/quiz/${quizId}`,
    SUBMIT_QUIZ: (courseId, quizId) => `/quiz/course/${courseId}/quiz/${quizId}/submit`,
    GET_COURSE_PROGRESS: (courseId) => `/quiz/course/${courseId}/progress`,
    GET_STATS: '/quiz/stats',
  },

  // ============ REWARDS ROUTES (/rewards) ============
  REWARDS: {
    GET_REWARDS: '/rewards',
    CLAIM_DAILY: '/rewards/daily-claim',
    CLAIM_ACHIEVEMENT: (achievementId) => `/rewards/achievement/${achievementId}/claim`,
    GET_CALENDAR: '/rewards/calendar',
  },

  // ============ PROFILE ROUTES (/profile) ============
  PROFILE: {
    UPLOAD_PICTURE: '/profile/upload-profile',
  },

  // ============ LEADERBOARD ROUTES (/leaderboard) ============
  LEADERBOARD: {
    GET_LEADERBOARD: '/leaderboard',
  },

  // ============ LESSON PROGRESS ROUTES (/progress) ============
  PROGRESS: {
    GET_STATS: '/progress/stats',
    GET_BOOKMARKS: '/progress/bookmarks',
    GET_COURSE_OVERVIEW: (courseId) => `/progress/course/${courseId}`,
    GET_COURSE_LESSONS: (courseId) => `/progress/course/${courseId}/lessons`,
    GET_LESSON: (lessonId) => `/progress/lesson/${lessonId}`,
    UPDATE_LESSON: (lessonId) => `/progress/lesson/${lessonId}`,
    COMPLETE_LESSON: (lessonId) => `/progress/lesson/${lessonId}/complete`,
    TOGGLE_BOOKMARK: (lessonId) => `/progress/lesson/${lessonId}/bookmark`,
    UPDATE_NOTES: (lessonId) => `/progress/lesson/${lessonId}/notes`,
  },

  // ============ SPIN THE WHEEL ROUTES (/spin) ============
  SPIN: {
    SPIN_WHEEL: '/spin/spinthewheel',
    GET_PREVIEW: '/spin/wheel-preview',
  },

  // ============ DAILY ROUTES (/daily) ============
  DAILY: {
    GET_INFO: '/daily/info',
    CLAIM: '/daily/claim',
  },
};
