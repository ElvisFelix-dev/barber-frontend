import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-barber-v2.onrender.com'
});

export default api;