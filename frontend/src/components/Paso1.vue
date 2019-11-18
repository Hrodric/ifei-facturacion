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
    <input type="text" v-model="familia.nombre" />
    <p>Nombre y Apellido</p>
    <input type="text" v-model="responsable.nombre" />
    <p>Email</p>
    <input type="text" v-model="responsable.email" />
    <p>Celular</p>
    <input type="text" v-model="responsable.celular" />
    <p>Dirección</p>
    <input type="text" v-model="responsable.direccion" />
    <p>a</p>
    <button @click="guardarContacto">Continuar</button>
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
      console.log(response.data.mobile);
      if (!response.data.mobile) {
        response.data.mobile = ' ';
      }
      if (!response.data.email) {
        response.data.email = ' ';
      }
      if (!response.data.street) {
        response.data.street = ' ';
      }

      this.responsable = {
        id: response.data.id,
        nombre: response.data.name,
        email: response.data.email,
        celular: response.data.mobile,
        direccion: response.data.street,
      };
      this.familia = {
        id: response.data.parent_id[0],
        nombre: response.data.parent_id[1],
      };
      this.$session.set('id_familia', response.data.parent_id[0]);

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
    guardarContacto: async function() {
      console.log(this.responsable.title);
      console.log(this.responsable.nombre);
      console.log(this.responsable.email);
      console.log(this.responsable.celular);
      console.log(this.responsable.direccion);
      let response = await ResPartnerService.updatePartner(this.responsable);
      this.$router.push('/informacion_de_alumnos');
    },
  },
};
</script>
