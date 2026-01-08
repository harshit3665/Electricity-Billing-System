import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export const getMyUsage = (username) =>
  axios.get(`${API}/api/user/usage/${username}`);
