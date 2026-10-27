import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Reset user password
 * @param {Object} data { email, newPassword, confirmPassword }
 */
export const resetPassword = async ({ email, newPassword, confirmPassword }) => {
  const res = await api.post("/auth/reset-password", {
    email,
    newPassword,
    confirmPassword,
  });
  return res.data;
};

/**
 * Get courses currently in progress for user
 * @param {string} userId
 */
export const getInProgressCourses = async (userId) => {
  const res = await api.get(`/courses/in-progress/${userId}`);
  return res.data;
};

/**
 * Get AI-recommended courses based on user history
 * @param {string} userId
 */
export const getAIRecommendations = async (userId) => {
  const res = await api.get(`/courses/recommendations/${userId}`);
  return res.data;
};

/**
 * Update course progress
 * @param {Object} payload { userId, courseId, progressPercentage, timeLeft }
 */
export const updateCourseProgress = async (payload) => {
  const res = await api.post("/courses/progress/update", payload);
  return res.data;
};

/**
 * Fetch all available courses
 * @param {Object} params { category, level }
 */
export const getAllCourses = async (params = {}) => {
  const res = await api.get("/courses", { params });
  return res.data;
};

/**
 * Enroll current user in a course
 * @param {Object} payload { userId, courseId }
 */
export const enrollCourse = async (payload) => {
  const res = await api.post("/courses/enroll", payload);
  return res.data;
};

export default api;
