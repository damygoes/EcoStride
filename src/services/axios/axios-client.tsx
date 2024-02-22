import { ENV_VARIABLES } from "@lib/env";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: ENV_VARIABLES.BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized");
    } else {
      console.error("An error occurred", error);
    }
    return Promise.reject(error);
  },
);
