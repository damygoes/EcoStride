import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
});

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

axiosClient.interceptors.request.use(function (config) {
  if (authToken) {
    console.log("Auth Token", authToken);
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.error("Unauthorized");
    }
    return Promise.reject(error);
  },
);
