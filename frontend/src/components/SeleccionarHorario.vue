<template>
  <div>
    <b-container v-if="loading">
<!--      <h1>Cargando...</h1>-->
      <p>{{loadingMsg}}</p>
    </b-container>
    <b-container fluid>
      <b-card header="Inscripción:" disabled>
        <b-list-group v-if="!loading">
          <b-list-group-item button>{{this.task.partner_id[1]}}, {{this.task.project_id[1]}}</b-list-group-item>
          <b-list-group-item button>Horario Seleccionado: {{this.task.stage_id[1]}}</b-list-group-item>
          <b-list-group-item buttonv-for="item in this.horarios"
                             :key="item.id"
                             @click="seleccionarHorario(item.id)"
                            >{{ item.name }}
          </b-list-group-item>
        </b-list-group>
        <br/>
        <b-button variant="outline-primary" @click="confirmarSo()">Confirmar Preinscripción</b-button>
        <p disabled>Este paso implica que se crea la orden de venta de la preinscripción y se confirma ocupando un cupo.</p>
      </b-card>
      <b-button variant="outline-primary" @click="volver()">Volver</b-button>
    </b-container>
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
