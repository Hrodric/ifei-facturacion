<template>
  <div>
    <div v-if="loading">
      <h1>Cargando...</h1>
      <p>{{loadingMsg}}</p>
    </div>
    <div v-if="!loading">
      <button @click="volver()">Volver</button>
      <h1>Confirmar Preinscripcion</h1>
      <h2>{{grupoFamiliar.name}}</h2>
      <h3>{{alumno.name}}</h3>
      <h4>{{clase.name}}</h4>
      <button @click="confirmarSo()">Confirmar Preinscripcion</button>
      <p>Este paso implica que se crea la orden de venta de la preinscripcion y se confirma ocupando un cupo</p>
    </div>
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
