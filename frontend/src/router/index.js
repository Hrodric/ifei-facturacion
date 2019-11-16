import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Test from '@/components/Test';
import Paso1 from '@/components/Paso1';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/informacion_de_contacto',
      name: 'Grupo Familiar',
      component: Paso1,
    },
  ],
});
