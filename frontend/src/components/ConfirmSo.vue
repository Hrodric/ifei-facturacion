<template>
  <b-container fluid>
    <b-container class="text-center" v-if="loading">
      <br/>
      <b-spinner variant="primary" label="Spinning"> </b-spinner>
      <h1>Cargando...</h1>
      <p>{{loadingMsg}}</p>
    </b-container>
    <h3>Alumno {{alumno.name}}, {{grupoFamiliar.name}}</h3>
    <b-card header="Verificar Información:" disabled>
      <b-list-group v-if="!loading">
        <b-list-group-item button>{{grupoFamiliar.name}}</b-list-group-item>
        <b-list-group-item button>Alumno: {{alumno.name}}</b-list-group-item>
        <b-list-group-item button>Producto: {{clase.name}}</b-list-group-item>
      </b-list-group>
      <br/>
      <b-button variant="outline-primary" @click="confirmarSo()">Confirmar Preinscripción</b-button>
      <p disabled>Este paso implica que se crea la orden de venta de la preinscripción y se confirma ocupando un cupo.</p>
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
      clase: {},
      loading: true,
      loadingMsg: ""
    };
  },
  created: async function() {
    //console.log(this.$session);
    this.alumno = this.$session.get("alumno");
    this.grupoFamiliar = this.$session.get("grupoFamiliar");
    this.clase = this.$session.get("clase");
    this.loading = false;
    console.log(this.alumno);
    console.log(this.grupoFamiliar);
    console.log(this.clase);
  },
  methods: {
    confirmarSo: async function() {
      this.loading = true;
      this.loadingMsg = "Creando Orden de Ventas";
      let orderLine = await ResPartnerService.confirmSo(
        this.grupoFamiliar,
        this.alumno,
        this.clase
      );
      this.loadingMsg = "Actualizando nombre de tarea";
      await ResPartnerService.updateTaskName(
        this.alumno,
        orderLine.data.orderLineId
      );
      this.$router.push("/alumnos");
      console.log(this.alumno.parent_id);
    },
    volver: function() {
      this.$router.push("/clases");
    }
  }
};
</script>
