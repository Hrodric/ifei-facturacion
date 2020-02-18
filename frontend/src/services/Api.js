import axios from 'axios';
import store from '@/store/store';

export default () => {
  return axios.create({
    baseURL: 'https://ec2-13-58-117-255.us-east-2.compute.amazonaws.com:8082',
    // baseURL: 'http://localhost:8082',
    // baseURL: BACKEND_URL,
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
