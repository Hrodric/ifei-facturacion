import axios from 'axios';
import store from '@/store/store';

export default () => {
  return axios.create({
    baseURL: 'http://ec2-3-82-149-140.compute-1.amazonaws.com:8082/',
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
