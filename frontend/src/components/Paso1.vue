<template>
  <div>
    <button @click="logout">Salir</button>
    <h1>Completa tus datos</h1>
    <p>
      Hola {{ nombre }}, como adulto responsable, para que podamos conocerte
      mas.
    </p>
    <p>todos los campos son obligatorios</p>
    <p>Familia</p>
    <input type="text" v-bind:value="familia.nombre" />
    <p>Relación</p>
    <input type="text" v-bind:value="responsable.title" />
    <p>Nombre y Apellido</p>
    <input type="text" v-bind:value="responsable.nombre" />
    <p>Email</p>
    <input type="text" v-bind:value="responsable.email" />
    <p>Celular</p>
    <input type="text" v-bind:value="responsable.celular" />
    <p>Dirección</p>
    <input type="text" v-bind:value="responsable.direccion" />
    <p>DNI Número</p>
    <input type="text" v-bind:value="responsable.nombre" />
  </div>
</template>

<script>
import ResPartnerService from '@/services/ResPartnerService';
import { async } from 'q';
export default {
  data() {
    return {
      familia: {},
      responsable: {},
      id: '',
      nombre: '',
    };
  },
  created: async function() {
    try {
      this.nombre = this.$session.get('nombre');

      let response = await ResPartnerService.getPartner(
        this.$session.get('id_contacto'),
      );
      console.log(response);
      this.responsable = {
        id: response.data.id,
        nombre: response.data.name,
        title: response.data.title[1],
        email: response.data.email,
        celular: response.data.mobile,
        direccion: response.data.street,
      };
      this.familia = {
        id: response.data.parent_id[0],
        nombre: response.data.parent_id[1],
      };

      console.log(this.familia);
      //alert(response.data);
    } catch (error) {
      console.log(error);
      //this.error = error.response.data.error;
    }
  },
  beforeCreate: function() {
    console.log(this.$session.exists());
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
