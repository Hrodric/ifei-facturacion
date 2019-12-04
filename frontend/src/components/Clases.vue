<template>
  <div>
    <div>
      <button @click="volver()">Volver</button>
    </div>
    <h2>Alumno</h2>
    <h3>{{alumno.name}}, {{grupoFamiliar.name}}</h3>
    <h2>Seleccionar Curso</h2>
    <button @click="verClasesEnOdoo()">Ver en Odoo</button>
    <ul>
      <li
        v-for="(clase , key) in this.clases.data"
        :key="'clase'+key"
        @click="seleccionarCurso(clase)"
      >
        <h4>{{clase.name}}, $ {{clase.list_price}}</h4>
      </li>
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
    this.grupoFamiliar = await ResPartnerService.getGrupoFamiliar(
      this.$session.get("id_grupo_familiar")
    );
    this.grupoFamiliar = this.grupoFamiliar.data[0];

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
