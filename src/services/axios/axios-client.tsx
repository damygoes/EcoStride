import { ENV_VARIABLES } from "@lib/env";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: ENV_VARIABLES.BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && !error.config._retry) {
      error.config._retry = true; // Mark the request as retried
      try {
        // Attempt to refresh the token
        await axiosClient.post(`${ENV_VARIABLES.TOKEN_REFRESH_URL}`);
        // After successful refresh, retry the original request
        return axiosClient(error.config);
      } catch (refreshError) {
        // Handle failed refresh (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
