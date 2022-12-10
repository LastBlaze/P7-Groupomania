import axios from "axios";
const BASE_URL = "http://localhost:3001/";

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default instance;
