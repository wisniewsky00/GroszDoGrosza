import axios from 'axios';

export const backendApi = axios.create({
  baseURL: 'http://localhost:8080/api'
});

backendApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  const url = config.url || '';
  const isAuthRoute = url.startsWith('/auth') || url.startsWith('/api/auth');

  if (token && token !== "null" && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});