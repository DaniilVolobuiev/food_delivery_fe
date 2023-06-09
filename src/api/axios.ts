import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_SERVER_URL}`,
});

export default instance;
