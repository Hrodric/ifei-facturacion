<template>
  <b-container fluid>
    <h3>Alumno {{alumno.name}}, {{grupoFamiliar.name}}</h3>
        <b-card header="Seleccionar Curso:" disabled>
          <button @click="verClasesEnOdoo()">Ver en Odoo</button>
          <b-list-group v-for="(clase , key) in this.clases.data"
                        :key="'clase'+key"
                        @click="seleccionarCurso(clase)">
            <b-list-group-item button>{{clase.name}}, $ {{clase.list_price}}</b-list-group-item>
          </b-list-group>
        </b-card>
    <b-button variant="outline-primary" @click="volver()">Volver</b-button>
  </b-container>
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
