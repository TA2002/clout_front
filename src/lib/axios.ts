import Axios, { InternalAxiosRequestConfig } from "axios";

const API_URL = "https://api.clout.kz/";
// import { useNotificationStore } from "@/stores/notifications";
import { userStorage } from "@/utils/userStorage";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = userStorage.getAccessToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  console.log("header", config);
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message;
    // useNotificationStore.getState().addNotification({
    //   type: "error",
    //   title: "Error",
    //   message,
    // });

    return Promise.reject(error);
  }
);
