import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const createUser = (data) =>
  axios.post(`${API}/api/admin/create-user`, data);

export const addComponent = (data) =>
  axios.post(`${API}/api/admin/add-component`, data);

export const addUsage = (data) =>
  axios.post(`${API}/api/admin/add-usage`, data);

export const getUserUsage = (username) =>
  axios.get(`${API}/api/admin/usage/${username}`);

export const getAllUsages = () =>
  axios.get(`${API}/api/admin/all-usages`);
