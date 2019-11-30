<template>
  <div>
    <button @click="volver()">Volver</button>
    <h1>Confirmar Preinscripcion</h1>
    <h2>{{grupoFamiliar.name}}</h2>
    <h3>{{alumno.name}}</h3>
    <h4>{{clase.name}}</h4>
    <button @click="confirmarSo()">Confirmar Preinscripcion</button>
    <p>Este paso implica que se crea la orden de venta de la preinscripcion y se confirma ocupando un cupo</p>
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
      clase: {}
    };
  },
  created: async function() {
    //console.log(this.$session);
    this.alumno = this.$session.get("alumno");
    this.grupoFamiliar = this.$session.get("grupoFamiliar");
    this.clase = this.$session.get("clase");
    console.log(this.alumno);
    console.log(this.grupoFamiliar);
    console.log(this.clase);
  },
  methods: {
    confirmarSo: async function() {
      await ResPartnerService.confirmSo(
        this.grupoFamiliar,
        this.alumno,
        this.clase
      );
      this.$router.push("/alumnos");
    },
    volver: function() {
      this.$router.push("/clases");
    }
  }
};
</script>
