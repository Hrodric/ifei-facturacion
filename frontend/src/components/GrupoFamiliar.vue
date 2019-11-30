<template>
  <div>
    <div v-if="!isLoading">
      <div>
        <button @click="volver()">volver</button>
      </div>
      <h3>Crear Grupo Familiar</h3>
      <input type="text" v-model="gf.name" />
      Apellido
      <br />
      <input type="text" v-model="gf.contact_name" />
      Nombre de Contacto
      <br />
      <input type="text" v-model="gf.id_number" />
      DNI
      <br />
      <input type="text" v-model="gf.direccion" />
      Direccion
      <br />
      <input type="text" v-model="gf.telefono" />
      Telefono de contacto
      <br />
      <input type="text" v-model="gf.email" />
      Email
      <br />
      <button @click="crearGrupo()">Crear</button>
    </div>
    <div v-if="isLoading">
      <h1>Cargando...</h1>
      <p>{{mensajeCargando}}</p>
    </div>
  </div>
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
