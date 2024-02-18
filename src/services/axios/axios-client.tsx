import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
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
