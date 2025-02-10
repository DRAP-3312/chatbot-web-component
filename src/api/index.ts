import axios from "axios";

export const createChatApi = (baseURL: string, token: string) => {
  const chatApi = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  chatApi.interceptors.request.use((request) => {
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
  });

  return chatApi;
};
