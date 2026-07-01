import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://task-manager-z7kj.onrender.com' 
    : '/api'
});

export default API;
