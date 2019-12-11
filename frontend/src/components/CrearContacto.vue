<template>
  <b-card title=""><h4>{{grupoFamiliar.name}}</h4>
    <b-container fluid>
      <b-container class="text-center" v-if="loading">
        <br/>
        <b-spinner variant="primary" label="Spinning"> </b-spinner>
        <h1>Cargando...</h1>
        <p>{{loadingMsg}}</p>
      </b-container>
      <div v-if="!loading">
        <h4>Crear Contacto</h4>
        <b-form-input type="text" v-model="nombre_contacto_nuevo" placeholder="Nombre"> </b-form-input>
        <b-form-input type="text" v-model="dni_contacto_nuevo" placeholder="DNI"> </b-form-input>
        <b-button variant="outline-primary" @click="crearContacto()">Crear Contacto</b-button>
        <br/>
        <br/>
        <h4>Crear Alumno</h4>
        <b-form-input type="text" v-model="nombre_alumno_nuevo" placeholder="Nombre"> </b-form-input>
        <b-form-input type="text" v-model="dni_alumno_nuevo" placeholder="DNI"> </b-form-input>
        <b-button variant="outline-primary" @click="crearAlumno()">Crear Alumno</b-button>
      </div>
    </b-container>
    <br/>
    <b-container>
      <b-button variant="outline-primary" size="sm" @click="volver()">Volver</b-button>
    </b-container>
  </b-card>

</template>

<script>
import ResPartnerService from "@/services/ResPartnerService";
import NeptunoService from "@/services/NeptunoService";
import { async } from "q";

export default {
  data() {
    return {
      grupoFamiliar: {},
      contactos: [],
      nombre_alumno_nuevo: "",
      dni_alumno_nuevo: "",
      nombre_contacto_nuevo: "",
      dni_contacto_nuevo: "",
      loading: true,
      loadingMsg: "",
      sos: []
    };
  },
  created: async function() {
    this.loadingMsg = "Cargando Grupo Familiar.";
    this.grupoFamiliar = await ResPartnerService.getGrupoFamiliar(
      this.$session.get("id_grupo_familiar")
    );
    this.grupoFamiliar = this.grupoFamiliar.data[0];
    this.$session.set("grupoFamiliar", this.grupoFamiliar);

    this.loading = false;
  },
  methods: {
    crearAlumno: async function() {
      if (this.nombre_alumno_nuevo == "") {
        alert("El nombre no puede estar vacio.");
      } else if (this.dni_alumno_nuevo == "") {
        alert("El dni no puede estar vacio.");
      } else {
        this.loading = true;
        this.loadingMsg = "Creado Alumno";
        let nuevoAlumno = await NeptunoService.crearAlumno(
          this.grupoFamiliar,
          this.nombre_alumno_nuevo,
          this.dni_alumno_nuevo
        );
        this.$session.set("alumno", nuevoAlumno);
        this.$router.push("/alumnos");
      }
    },
    crearContacto: async function() {
      if (this.nombre_contacto_nuevo == "") {
        alert("El nombre no puede estar vacio.");
      } else if (this.dni_contacto_nuevo == "") {
        alert("El dni no puede estar vacio.");
      } else {
        this.loading = true;
        this.loadingMsg = "Creado Contacto";
        let nuevoAlumno = await ResPartnerService.crearContacto(
          this.grupoFamiliar,
          this.nombre_contacto_nuevo,
          this.dni_contacto_nuevo
        );
        this.$session.set("alumno", nuevoAlumno);
        this.$router.push("/alumnos");
      }
    },

    volver: function() {
      this.$router.push("/alumnos");
    }
  }
};
</script>
