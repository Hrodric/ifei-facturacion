<template>
  <div>
    <button @click="logout">Salir</button>
    <div v-for="(alumno, key) in alumnos" v-bind:key="key">
      {{alumno.name}}
      <p>Nombre</p>

      <input type="text" v-model="alumno.name" />
      <p>Fecha de nacimiento</p>
      <input type="text" v-model="alumno.fax" />
      <p>Email</p>
      <input type="text" v-model="alumno.email" />
    </div>
    <button @click="updateStudents">Siguiente</button>
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
      console.log(this.alumnos);
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
    updateStudents: async function() {
      console.log(this.alumnos);
      this.alumnos.forEach(async element => {
        console.log(element);
        let response = await ResPartnerService.updateStudent(element);
        console.log(response);
      });
      //let response = await ResPartnerService.updatePartner(student);
    }
  }
};
</script>
