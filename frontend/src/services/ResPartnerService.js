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

  getPartnerFacturacion(id) {
    return Api().get('getPartnerFacturacion', {
      params: {
        id,
      },
    });
  },

  createPartnerFacturacion(partner) {
    return Api().post('createPartnerFacturacion', {
      partner
    })
  },

  getGrupoFamiliar(id) {
    return Api().get('getGrupoFamiliar?id=' + id)
  },

  getContactos(ids) {
    return Api().post('getGrupoFamiliarContactos', {
      ids,
    });
  },

  getTags(ids) {
    console.log(ids)
    return Api().post('getContactTags', {
      ids,
    });
  },

  updatePartnerDataOdoo(partner) {
    return Api().post('updatePartnerOdoo', {
      partner,
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
  updateTask(task) {
    return Api().post('updateTask', {
      task,
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
  updateTaskName(alumno, orderLineId) {
    return Api().post('updateTaskName', {
      alumno,
      orderLineId,
    });
  },
  getHorariosTaskCount(taskStageId, projectId) {
    return Api().get('stage_task_count', {
      params: {
        taskStageId,
        projectId,
      }
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
  getProyect(taskId) {
    return Api().get('getTaskProjectName', {
      params: {
        id: taskId,
      },
    });
  },
  getSoTask(id) {
    return Api().get('getSoTask', {
      params: {
        id,
      },
    });
  },
  getOrderLine(id) {
    console.log(id)
    return Api().get('getOrderLine', {
      params: {
        id,
      },
    });
  },
  crearFactura(grupoFamiliar) {
    return Api().post('crear_factura', {
      grupoFamiliar,
    });
  },
  crearLineaFactura(invoiceId, linea) {
    console.log(invoiceId);
    return Api().post('crear_linea_factura', {
      invoiceId,
      linea,
    });
  },
  getHorarios(id) {
    return Api().get('get_task_types', {
      params: {
        id,
      },
    });
  },
  crearContacto(grupoFamiliar, contacto, dni, telefono) {

    return Api().post('crear_contacto', {
      grupoFamiliar,
      contacto,
      dni,
      telefono, //field added
      relacion, //field added
    });
  },

};
