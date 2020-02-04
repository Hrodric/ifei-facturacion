import axios from 'axios';
import store from '@/store/store';

export default () => {
  return axios.create({
    baseURL: 'http://ec2-3-82-149-140.compute-1.amazonaws.com:8082/',
    //baseURL: 'http://localhost:8082',
    // baseURL: BACKEND_URL,
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
