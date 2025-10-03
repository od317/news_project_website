// import axios from "axios";

// const base_url = process.env.API_BASE_URL;

// const apiClient = axios.create({
//   baseURL: base_url,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = "";
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.request.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry)
//       originalRequest._retry = true;
//     try {
//       // await refreshToken();
//       return apiClient(originalRequest);
//     } catch (refreshError) {
//       // removeTokens()
//       window.location.href = "/login";
//       return Promise.reject(refreshError);
//     }
//   }
// );

// export default apiClient;
