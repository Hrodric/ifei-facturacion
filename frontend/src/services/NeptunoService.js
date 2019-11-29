import Api from '@/services/Api';

export default {

  crearGrupoFamiliar(gf) {
    return Api().post('npt_crear_grupo_familiar', {
      gf,
    });
  },
  crearAlumno(grupoFamiliar, alumno) {
    return Api().post('npt_crear_alumno', {
      grupoFamiliar,
      alumno,
    });
  },
};
