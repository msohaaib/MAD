import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MANUAL_URL = '';

function getDevHost() {
  const candidates = [
    Constants.expoConfig?.hostUri,
    Constants.linkingUri,
    Constants.expoGoConfig?.debuggerHost,
  ].filter(Boolean);

  for (const value of candidates) {
    const match = String(value).match(/(\d+\.\d+\.\d+\.\d+)/);
    if (match) return match[1];
  }

  if (Platform.OS === 'android') return '10.0.2.2';
  return 'localhost';
}

export const API_PORT = 5050;
export const BASE_URL = MANUAL_URL || `http://${getDevHost()}:${API_PORT}`;

export async function api(path, options = {}) {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch (error) {
    throw new Error(
      `Network request failed. Check BASE_URL (${BASE_URL}) and that the server is running.`
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
}

export const authApi = {
  login: (email, password) =>
    api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (payload) =>
    api('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  me: () => api('/api/auth/me'),
};

export const menuApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, value]) => value))
    ).toString();
    return api(`/api/menu${query ? `?${query}` : ''}`);
  },
  get: (id) => api(`/api/menu/${id}`),
  create: (item) =>
    api('/api/menu', { method: 'POST', body: JSON.stringify(item) }),
  update: (id, item) =>
    api(`/api/menu/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
  remove: (id) => api(`/api/menu/${id}`, { method: 'DELETE' }),
};

export const orderApi = {
  place: (payload) =>
    api('/api/orders', { method: 'POST', body: JSON.stringify(payload) }),
  mine: () => api('/api/orders/my'),
  all: () => api('/api/orders'),
  updateStatus: (id, status) =>
    api(`/api/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

export const reservationApi = {
  create: (payload) =>
    api('/api/reservations', { method: 'POST', body: JSON.stringify(payload) }),
  mine: () => api('/api/reservations/my'),
  all: () => api('/api/reservations'),
  update: (id, status) =>
    api(`/api/reservations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

export const tableApi = {
  list: () => api('/api/tables'),
};
