import Api from '@/services/Api';

export default {

  crearGrupoFamiliar(gf) {
    return Api().post('npt_crear_grupo_familiar', {
      gf,
    });
  },
  crearAlumno(grupoFamiliar, alumno, dni) {
    return Api().post('npt_crear_alumno', {
      grupoFamiliar,
      alumno,
      dni,
    });
  },
  getPago(id) {
    console.log(id)
    return Api().get('npt_get_pago', {
      params: {
        id
      },
    })
  },
  getPagosMes(mes) {
    return Api().get('npt_get_pagos_mes', {
      params: {
        mes
      },
    })
  },
  registerInvoice(data) {
    return Api().post('npt_registrar_factura', {
      data
    })
  }
};
