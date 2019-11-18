import Login from '@/components/Login';
import Paso1 from '@/components/Paso1';

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/informacion_de_contacto',
    component: Paso1,
  },
];

export default routes;
