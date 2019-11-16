<template>
  <div>
    <input v-model="email" placeholder="email" />
    <p>El mensaje es: {{ email }}</p>
    <input v-model="password" placeholder="pass" />
    <p>El mensaje es: {{ password }}</p>
    <button @click="testGet()">Test Get</button>
    <button @click="testPost()">Test Post</button>
  </div>
</template>

<script>
import TestService from '@/services/TestService';
export default {
  data() {
    return {
      email: 'asd',
      password: 'asd',
      error: null,
    };
  },
  methods: {
    async testGet() {
      try {
        const response = await TestService.login({
          email: this.email,
          password: this.password,
          responseA: {},
        });
        alert(response.data);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>
