<template>
  <div>
    <div>
      <button @click="volver()">Volver</button>
    </div>
    <div v-if="loading">
      <h1>Cargando...</h1>
      <p>{{loadingMsg}}</p>
    </div>
    <div v-if="!loading">
      <h2>Inscripcion</h2>
      <h3>{{this.task.partner_id[1]}}, {{this.task.project_id[1]}}</h3>
      <h4>Horario Seleccionado: {{this.task.stage_id[1]}}</h4>
      <h3>Horarios Disponibles:</h3>
      <h5
        v-for="item in this.horarios"
        :key="item.id"
        @click="seleccionarHorario(item.id)"
      >{{ item.name }}</h5>
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
      loading: true,
      loadingMsg: ""
    };
  },
  created: async function() {
    this.loadingMsg = "Cargando Inscripcion.";
    this.task = await ResPartnerService.getSoTask(
      this.$session.get("saleOrderId")
    );
    this.task = this.task.data[0];
    console.log(this.task);
    this.loadingMsg = "Cargando horarios disponibles.";
    this.horarios = await ResPartnerService.getHorarios(
      this.task.project_id[0]
    );
    console.log(this.horarios);
    for (const horario of this.horarios.data) {
      horario.inscriptos = await ResPartnerService.getHorariosTaskCount(
        horario.id,
        this.task.project_id[0]
      );
    }
    this.horarios = this.horarios.data;
    console.log(this.horarios);
    this.loading = false;
  },
  methods: {
    volver: function() {
      this.$router.push("/alumnos");
    },
    seleccionarHorario: async function(id) {
      this.loading = true;
      this.loadingMsg = "Cargando";
      this.task.stage_id = id;
      await ResPartnerService.updateTask(this.task);
      this.$router.push("/alumnos");
    }
  }
};
</script>
