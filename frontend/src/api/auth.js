import axios from 'axios';

const API_BASE_URL = '/api/auth';

axios.defaults.withCredentials = true;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE_URL}/login`, credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/me`, { withCredentials: true });
  return response.data;
};

export const updateRole = async (userId, role, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/update-role`,
    { userId, role },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateUser = async (userData, token) => {
  const response = await axios.put(`${API_BASE_URL}/update`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const logoutUser = async (token) => {
  const response = await axios.post(`${API_BASE_URL}/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
