<template>
  <div>
    <button @click="logout">Salir</button>
    <h1>Completa tus datos</h1>
    <p>como adulto responsable, para que podamos conocerte mas.</p>
    <p>todos los campos son obligatorios</p>
    <label for="">Familia</label>
    <!-- <input v-model="email" placeholder="email" /> -->
  </div>
</template>

<script>
import ResPartnerService from '@/services/ResPartnerService';
export default {
  data() {
    return {
      user: 'asd',
    };
  },
  created: async () => {
    try {
      const response = await ResPartnerService.getPartner();
      console.log(this.user);

      console.log(response);
      //alert(response.data);
    } catch (error) {
      console.log(error);
      //this.error = error.response.data.error;
    }
  },
  beforeCreate: function() {
    if (!this.$session.exists()) {
      this.$router.push('/');
    }
  },
  methods: {
    logout: function() {
      this.$session.destroy();
      this.$router.push('/');
    },
  },
};
</script>
