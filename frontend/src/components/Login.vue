<template>
  <div>
    <h3>Crear un nuevo grupo Familiar</h3>
    <button @click="crearGF()">Crear Grupo Familiar</button>
    <br />
    <h3>Buscar un grupo familiar / alumno existente</h3>
    <input v-model="search" @input="searchPartner" @change="searchPartner" @blur="handleBlur" />

    <ul v-if="!isLoading">
      <li v-for="(partner, key) in responseSearch" :key="key">
        <button @click="verPartnerEnOdoo(partner.id)">Ver en Odoo</button>
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
  </div>
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
    verPartnerEnOdoo(partner_id) {
      let routeData =
        "http://ifei.moogah.com/web#id=" +
        partner_id +
        "&view_type=form&model=res.partner&menu_id=70&action=77";
      window.open(routeData, "_blank");
    },
    handleBlur() {}
  }
};
</script>
