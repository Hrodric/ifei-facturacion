<template>
  <b-container>
    <b-card title="">
      <b-button variant="outline-primary" @click="crearGF()">Crear Grupo Familiar</b-button>
      <br />
      <b-form-input v-model="search" @input="searchPartner" @change="searchPartner" @blur="handleBlur" placeholder="Buscar familiar/alumno existente"> </b-form-input>

      <ul v-if="!isLoading">
        <li v-for="(partner, key) in responseSearch" :key="key">
          <button
            v-if="partner.parent_id == false"
            @click="seleccionarGF(partner.id)"
          >Seleccionar Grupo Familiar</button>
          <button
            v-if="((partner.title[1] != 'Madre/Padre') && (partner.parent_id != false))"
            @click="seleccionarAlumno(partner)"
          >Seleccionar Alumno</button>
          <span style="font-size:2em">{{partner.name}},{{partner.parent_id[1]}}</span>
        </li>
      </ul>
      <div v-if="isLoading">
        <h1>Cargando...</h1>
      </div>
    </b-card>
  </b-container>
</template>

<style scoped>
</style>

<script>
import AuthenticationService from "@/services/AuthenticationService";

import ResPartnerService from "@/services/ResPartnerService";

export default {
  data() {
    return {
      dni: "32165498",
      pass: "123",
      error: null,
      search: "",
      responseSearch: [],
      isLoading: false,
      changed: false,
      searchingTerm: ""
    };
  },
  created: function() {
    this.$session.start();
  },
  methods: {
    crearGF() {
      this.$router.push("/grupo_familiar");
    },
    seleccionarGF(id) {
      this.$session.set("id_grupo_familiar", id);

      this.$router.push("/alumnos");
    },
    async seleccionarAlumno(alumno) {
      this.isLoading = true;
      this.$session.set("id_grupo_familiar", alumno.parent_id[0]);
      let alumnox = await ResPartnerService.getPartner(alumno.id);
      this.$session.set("alumno", alumnox.data);
      this.$router.push("/clases");
    },
    async searchPartner({ type, target }) {
      if (
        !this.isLoading &&
        this.searchingTerm != this.search &&
        this.search.length >= 3
      ) {
        this.isLoading = true;
        this.searchingTerm = this.search;
        let responseSearch = await ResPartnerService.search(target.value);
        this.isLoading = false;
        if (this.searchingTerm != this.search) {
          this.searchPartner({ type, target });
        } else {
          this.responseSearch = responseSearch.data;
          console.log(responseSearch);
        }
      }
    },
    async login() {
      const response = await AuthenticationService.login({
        dni: this.dni,
        pass: this.pass,
        responseA: {}
      });

      console.log(response);
      if (response.status === 200) {
        this.$session.start();
        this.$session.set("jwt", response.data.token);
        this.$session.set("id_contacto", response.data.id);
        this.$session.set("nombre", response.data.nombre);
        this.$router.push("/informacion_de_contacto");
      }
    },
    handleBlur() {}
  }
};
</script>
