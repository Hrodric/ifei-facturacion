import Api from '@/services/Api';

export default {
  getPartner(id) {
    return Api().get('getPartner', {
      params: {
        id,
      },
    });
  },
};
