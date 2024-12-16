import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default axiosInstance;