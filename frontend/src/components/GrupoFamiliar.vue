<template>
  <b-container fluid>
    <div v-if="!isLoading">
      <b-card title="Crear Grupo Familiar">
        <b-form-input type="text" v-model="gf.name" placeholder="Apellido"> </b-form-input>
        <b-form-input type="text" v-model="gf.contact_name" placeholder="Nombre de Contacto"> </b-form-input>
        <b-form-input type="text" v-model="gf.id_number" placeholder="DNI"> </b-form-input>
        <b-form-input type="text" v-model="gf.direccion" placeholder="Dirección"> </b-form-input>
        <b-form-input type="text" v-model="gf.telefono" placeholder="Teléfono de Contacto"> </b-form-input>
        <b-form-input type="text" v-model="gf.email" placeholder="Email"> </b-form-input>
        <br />
        <b-button variant="outline-primary" size="sm" @click="volver()">Volver</b-button>
        <b-button variant="outline-primary" size="sm" @click="crearGrupo()">Crear</b-button>
      </b-card>
    </div>
    <div v-if="isLoading"><h1>Cargando...</h1><p>{{mensajeCargando}}</p></div>
  </b-container>
</template>

<script>
import ResPartnerService from "@/services/ResPartnerService";
import NeptunoService from "@/services/NeptunoService";

export default {
  data() {
    return {
      gf: {
        name: "",
        email: "",
        id_number: "",
        telefono: "",
        contact_name: "",
        direccion: ""
      },
      isLoading: false,
      mensajeCargando: ""
    };
  },
  methods: {
    crearGrupo: async function() {
      this.isLoading = true;
      this.mensajeCargando = "Creando al grupo familiar";
      let grupoFamiliar = await NeptunoService.crearGrupoFamiliar(this.gf);
      this.$session.set("id_grupo_familiar", grupoFamiliar.data);
      this.$router.push("/alumnos");
    },
    volver: function() {
      this.$router.push("/");
    }
  }
};
</script>
