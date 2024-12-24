import axios from 'axios';

const API_BASE_URL = '/api/employees';

export const fetchEmployees = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await axios.post(`${API_BASE_URL}`, employeeData);
  return response.data;
};

export const updateEmployee = async (employeeId, employeeData) => {
  const response = await axios.put(`${API_BASE_URL}/${employeeId}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (employeeId) => {
  const response = await axios.delete(`${API_BASE_URL}/${employeeId}`);
  return response.data;
};
