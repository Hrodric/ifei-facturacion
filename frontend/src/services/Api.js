import axios from 'axios';
import store from '@/store/store';

export default () => {
  return axios.create({
    baseURL: 'https://ec2-34-207-161-170.compute-1.amazonaws.com:8082',
    //baseURL: 'http://localhost:8082',
    // baseURL: BACKEND_URL,
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
