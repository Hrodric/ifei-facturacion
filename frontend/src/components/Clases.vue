<template>
  <div>
    <div>
      <button @click="volver()">Volver</button>
    </div>
    <h1>{{grupoFamiliar.name}}, {{alumno.name}}</h1>
    <ul>
      <li
        v-for="(clase , key) in this.clases.data"
        :key="'clase'+key"
        @click="seleccionarCurso(clase)"
      >{{clase.name}}, $ {{clase.list_price}}</li>
    </ul>
  </div>
</template>

<script>
import ResPartnerService from "@/services/ResPartnerService";
import NeptunoService from "@/services/NeptunoService";
import { async } from "q";

export default {
  data() {
    return {
      alumno: {},
      grupoFamiliar: {},
      clases: {}
    };
  },
  created: async function() {
    //console.log(this.$session);
    this.alumno = this.$session.get("alumno");
    console.log(this.alumno);
    this.grupoFamiliar = this.$session.get("grupoFamiliar");
    this.clases = await ResPartnerService.getProductos();
  },
  methods: {
    seleccionarCurso: async function(clase) {
      this.$session.set("clase", clase);
      this.$router.push("/confirm_so");
    },
    volver: function() {
      this.$router.push("/alumnos");
    }
  }
};
</script>
