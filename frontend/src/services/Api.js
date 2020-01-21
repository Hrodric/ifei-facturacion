import axios from 'axios';
import store from '@/store/store';

export default () => {
  return axios.create({
    baseURL: 'http://ec2-3-82-149-140.compute-1.amazonaws.com:8082/',
<<<<<<< HEAD
    // baseURL: BACKEND_URL,
=======
    //baseURL: BACKEND_URL,
>>>>>>> msoule
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
