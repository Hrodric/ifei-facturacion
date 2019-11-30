import Api from '@/services/Api';

export default {

  search(searchTerm) {
    return Api().post('search', {
      searchTerm,
    });
  },

  getPartner(id) {
    return Api().get('getPartner', {
      params: {
        id,
      },
    });
  },

  getGrupoFamiliar(id) {
    return Api().get('getGrupoFamiliar?id=' + id)
  },

  getContactos(ids) {
    return Api().post('getGrupoFamiliarContactos', {
      ids,
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
  getProductos() {
    return Api().get('getProductos', {});
  },
  confirmSo(grupoFamiliar, student, clase) {
    return Api().post('confirmSo', {
      grupoFamiliar,
      student,
      clase,
    });
  },
  getSos(studentId) {

    console.log(studentId);
    return Api().get('getSos', {
      params: {
        studentId,
      },
    });
  },
  crearContacto(grupoFamiliar, contacto, dni) {

    return Api().post('crear_contacto', {
      grupoFamiliar,
      contacto,
      dni,
    });
  },
};
