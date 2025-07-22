import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "/api",
  withCredentials: true
});

export default makeRequest;
