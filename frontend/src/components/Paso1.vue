<template>
  <div>
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
      data: {},
    };
  },
  created: async () => {
    try {
      const response = await ResPartnerService.getPartner();
      console.log('asdasdasd');
      console.log(response);
      //alert(response.data);
    } catch (error) {
      console.log(error);
      //this.error = error.response.data.error;
    }
  },
};
</script>
