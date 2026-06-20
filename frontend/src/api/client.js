import axios from "axios";

export const AUTH_TOKEN_KEY = "rbsolarcare_token";

const client = axios.create({

  baseURL: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use((config) => {

  const token = localStorage.getItem(
    AUTH_TOKEN_KEY
  );

  if (token) {

    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export default client;
