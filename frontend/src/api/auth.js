import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/auth';

axios.defaults.withCredentials = true;

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials, {
      withCredentials: true,
    });
    console.log('Ответ сервера на login:', response.data); 
    return response.data;
  } catch (error) {
    console.error('Ошибка в loginUser:', error.response?.data || error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      withCredentials: true, // Убедитесь, что токен из cookies отправляется
    });
    console.log('Ответ сервера на /auth/me:', response.data); // Логируем ответ
    return response.data; // Возвращаем данные пользователя
  } catch (error) {
    console.error('Ошибка при проверке авторизации:', error.response?.data || error.message);
    throw error; // Если ошибка, пробрасываем её
  }
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

export const logoutUser = async () => {
  const response = await axios.post(`${API_BASE_URL}/logout`, {}, { withCredentials: true });
  return response.data;
};
