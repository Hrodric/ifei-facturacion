import Login from '@/components/Login';
import Paso1 from '@/components/Paso1';
import Paso2 from '@/components/Paso2';

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
  }
];

export default routes;
