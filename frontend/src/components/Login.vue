<template>
  <div>
    <input v-model="search" @input="searchPartner" @change="searchPartner" />
    <button @click="crearGF()">Crear Grupo Familiar</button>
    <ul v-if="!isLoading">
      <li v-for="(partner, key) in responseSearch" :key="key">
        {{partner.name}},{{partner.parent_id[1]}}
        <button
          v-if="partner.parent_id == false"
          @click="seleccionarGF(partner.id)"
        >Seleccionar Grupo Familiar</button>
        <button v-if="partner.parent_id[0]" @click="seleccionarAlumno()">Seleccionar Alumno</button>
      </li>
    </ul>
    <div v-if="isLoading">
      <h1>Awantaaa!!</h1>
      <img
        src="https://media1.tenor.com/images/a7f37b8aaa8a6123211037d81487df6e/tenor.gif?itemid=5953099"
        width="433"
        height="149.06584362139915"
        alt="Aguanta Mucho GIF - Goku DragonballZ Power GIFs"
        style="max-width: 833px; background-color: rgb(63, 63, 63);"
      />
    </div>
    <!-- <input v-model="dni" placeholder="DNI" />
    <input v-model="pass" placeholder="Password" />
    <button @click="login()">Log In</button>-->
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
      changed: false
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
    seleccionarAlumno() {
      this.$router.push("/preinscripcion?id=" + id);
    },
    async searchPartner({ type, target }) {
      if (!this.isLoading) {
        console.log(String(target.value));
        this.isLoading = true;
        let responseSearch = await ResPartnerService.search(target.value);
        this.isLoading = false;

        if (this.changed) {
          let responseSearch = await ResPartnerService.search(target.value);
          this.changed = false;
          this.responseSearch = responseSearch.data;
          this.isLoading = false;
        } else {
          this.responseSearch = responseSearch.data;
          this.isLoading = false;
        }
      } else {
        this.changed = true;
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
    }
  }
};
</script>
