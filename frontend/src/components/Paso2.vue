<template>
  <div>
    <button @click="logout">Salir</button>
    <div v-for="(alumno, key) in alumnos" v-bind:key="key">{{alumno.name}}</div>
  </div>
</template>

<script>
import ResPartnerService from "@/services/ResPartnerService";
import { async } from "q";
export default {
  data() {
    return {
      alumnos: {}
    };
  },
  created: async function() {
    try {
      this.nombre = this.$session.get("nombre");
      let response = await ResPartnerService.getAlumnos(
        this.$session.get("id_familia")
      );
      this.alumnos = response.data;
    } catch (error) {
      console.log(error);
      //this.error = error.response.data.error;
    }
  },
  beforeCreate: function() {
    console.log(this.$session.exists());
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  },
  methods: {
    logout: function() {
      this.$session.destroy();
      this.$router.push("/");
    },
    guardarAlumno: async function(student) {
      let response = await ResPartnerService.updatePartner(student);
    }
  }
};
</script>
