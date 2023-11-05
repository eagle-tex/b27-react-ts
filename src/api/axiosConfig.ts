import axios from 'axios';

export const BASE_URL = 'http://localhost:3030';

const Axios = axios.create({
  baseURL: BASE_URL,
});

export default Axios;
