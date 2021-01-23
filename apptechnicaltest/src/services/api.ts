import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tst2.escolaapp.com/api/v1/Acesso/login',
});

export default api;
