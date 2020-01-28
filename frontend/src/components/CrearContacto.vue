<template>
  <b-card title=""><h5>{{grupoFamiliar.name}}</h5>
    <b-container fluid>
      <b-container class="text-center" v-if="loading">
        <br/>
        <b-spinner variant="primary" label="Spinning"> </b-spinner>
        <h5>Cargando...</h5>
        <p>{{loadingMsg}}</p>
      </b-container>
      <div v-if="!loading">
        <b-container style="padding: 20px">
          <b-row>
            <b-col>
              <h4>Crear Contacto</h4>
              <b-form-input type="text" v-model="nombre_contacto_nuevo" placeholder="Nombre"> </b-form-input>
              <b-form-input type="text" v-model="dni_contacto_nuevo" placeholder="DNI"> </b-form-input>
              <b-form-input type="text" v-model="tel_contacto_nuevo" placeholder="Teléfono"> </b-form-input>
<!--              <b-form-input type="text" v-model="rel_contacto_nuevo" placeholder="Relación"> </b-form-input>-->
              <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
              <b-button variant="outline-primary" @click="crearContacto()">Crear Contacto</b-button>
            </b-col>
            <b-col>
              <h4>Crear Alumno</h4>
              <b-form-input type="text" v-model="nombre_alumno_nuevo" placeholder="Nombre"> </b-form-input>
              <b-form-input type="text" v-model="dni_alumno_nuevo" placeholder="DNI"> </b-form-input>
              <b-button variant="outline-primary" @click="crearAlumno()">Crear Alumno</b-button>
            </b-col>
          </b-row>

        </b-container>
        <br/>
        <br/>

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
      tel_contacto_nuevo: "", //field added
      category_id: "", //field added
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
          this.dni_alumno_nuevo,
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
        this.loadingMsg = "Creando Contacto";
        let nuevoAlumno = await ResPartnerService.crearContacto(
          this.grupoFamiliar,
          this.nombre_contacto_nuevo,
          this.dni_contacto_nuevo,
          this.tel_contacto_nuevo, // phone field added
          // this.rel_contacto_nuevo // relation field added
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
