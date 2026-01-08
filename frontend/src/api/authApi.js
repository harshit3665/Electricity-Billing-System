import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const login = (data) =>
  axios.post(`${API}/api/auth/login`, data);
