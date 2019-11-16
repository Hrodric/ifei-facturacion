import Api from '@/services/Api';

export default {
  testGet() {
    return Api().get('testGet');
  },
  login(data) {
    return Api().post('testPost', data);
  },
};
