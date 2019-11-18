<template>
  <div>
    <input v-model="dni" placeholder="DNI" />

    <input v-model="pass" placeholder="Password" />

    <button @click="login()">Log In</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
export default {
  data() {
    return {
      dni: '30395691',
      pass: '123',
      error: null,
    };
  },
  methods: {
    async login() {
      const response = await AuthenticationService.login({
        dni: this.dni,
        pass: this.pass,
        responseA: {},
      });

      console.log(response);
      if (response.status === 200) {
        this.$session.start();
        this.$session.set('jwt', response.data.token);
        this.$router.push('/informacion_de_contacto');
      }
    },
  },
};
</script>
