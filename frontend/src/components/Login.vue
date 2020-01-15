<template>
  <b-container>
    <b-card>
      <p>Para crear un nuevo Grupo Familiar, presione:</p>
      <b-button
        style="margin-bottom: 10px"
        variant="outline-primary"
        @click="crearGF()">
        Crear</b-button>
      <br />
      <p>Para buscar un Grupo Familiar, presione:</p>
      <b-form-input
        v-model="search"
        @input="searchPartner"
        @change="searchPartner"
        @blur="handleBlur"
        placeholder="Buscar">
      </b-form-input>
      <ul v-if="!isLoading">
        <li
          v-for="(partner, key) in responseSearch"
          :key="key"
          style="display: block; margin-top: 10px;">
            <b-button-group size="sm">
              <b-button
                variant="outline-primary"
                @click="verPartnerEnOdoo(partner.id)">
                Ver en Odoo
              </b-button>
              <b-button
                v-if="!partner.parent_id"
                variant="outline-primary"
                @click="seleccionarGF(partner.id)">
                Seleccionar Grupo Familiar
              </b-button>
              <b-button
                v-if="partner.title[1] == 'Student'"
                variant="outline-secondary"
                @click="seleccionarAlumno(partner)">
                Seleccionar Alumno
              </b-button>
            </b-button-group>

          <span style="font-size:1em">{{ partner.name }},{{ partner.parent_id[1] }}</span>
        </li>
      </ul>
      <div class="text-center" v-if="isLoading">
        <br />
        <b-spinner variant="primary" label="Spinning"> </b-spinner>
        <h5>Cargando...</h5>
      </div>
    </b-card>
  </b-container>
</template>

<style scoped> </style>

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
    async searchPartner() {
      if (
        !this.isLoading &&
        this.searchingTerm != this.search &&
        this.search.length >= 3
      ) {
        this.isLoading = true;
        this.searchingTerm = this.search;
        let responseSearch = await ResPartnerService.search(this.search);
        this.isLoading = false;
        if (this.searchingTerm != this.search) {
          this.searchPartner();
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
