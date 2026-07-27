import axios from 'axios';

// Base API URL configuration.
// If running in development without Nginx, fallback to localhost:8080.
const API_BASE_URL = window.location.hostname === 'localhost' && window.location.port === '3000' 
  ? 'http://localhost:8080/api/employees' 
  : '/api/employees';

export const getEmployees = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addEmployee = async (employeeData) => {
  const response = await axios.post(API_BASE_URL, employeeData);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
