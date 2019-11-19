import Api from '@/services/Api';

export default {
  getPartner(id) {
    return Api().get('getPartner', {
      params: {
        id,
      },
    });
  },
  updatePartner(partner) {
    return Api().post('updatePartner', {
      partner,
    });
  },
  updateStudent(student) {
    return Api().post('updateStudent', {
      student,
    });
  },
  getAlumnos(id) {
    return Api().get('getStudents', {
      params: {
        id,
      },
    });
  },
};
