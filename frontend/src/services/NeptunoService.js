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
//get Classes - added
  getClases(id, clase){
    return Api().get('class_names', {
      id,
      short,
    });
  },
};
