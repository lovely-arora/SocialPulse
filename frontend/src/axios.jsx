import axios from "axios";

export const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

export default makeRequest;
