import axios from 'axios';
import { API_BASE_URL } from './app.config';

/**
 * HTTP 客户端
 */
export const apiHttpClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * 设置本地存储
 */
export const setStroage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获得本地存储
 */
export const getStroage = (key: string) => {
  const data = localStorage.getItem(key);

  return data ? JSON.parse(key) : null;
};
