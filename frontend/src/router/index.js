import Login from '@/components/Login';
import Paso1 from '@/components/Paso1';
import Paso2 from '@/components/Paso2';
import GrupoFamiliar from '@/components/GrupoFamiliar';
import Preinscripcion from '@/components/Preinscripcion';
import Alumnos from '@/components/Alumnos';
import Clases from '@/components/Clases';
import ConfirmSo from '@/components/ConfirmSo';
import CrearContacto from '@/components/CrearContacto';
import SeleccionarHorario from '@/components/SeleccionarHorario';
import Facturar from '@/components/Facturar';

const routes = [{
    path: '/',
    component: Login,
  },
  {
    path: '/informacion_de_contacto',
    component: Paso1,
  },
  {
    path: '/informacion_de_alumnos',
    component: Paso2,
  },
  {
    path: '/grupo_familiar',
    component: GrupoFamiliar,
  },
  {
    path: '/alumnos',
    component: Alumnos,
  },
  {
    path: '/clases',
    component: Clases,
  },
  {
    path: '/confirm_so',
    component: ConfirmSo,
  },
  {
    path: '/preinscripcion',
    component: Preinscripcion,
  },
  {
    path: '/crear_contacto',
    component: CrearContacto,
  },
  {
    path: '/seleccionar_horario',
    component: SeleccionarHorario,
  },
  {
    path: '/facturar',
    component: Facturar,
  },
];

export default routes;
