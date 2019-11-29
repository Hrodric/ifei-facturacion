<template>
  <div>
    <div v-if="!isLoading">
      <div>
        <button @click="volver()">volver</button>
      </div>
      <h1>Crear Grupo Familiar</h1>Apellido
      <input type="text" v-model="gf.name" />
      <br />Nombre de Contacto
      <input type="text" v-model="gf.contact_name" />
      <br />DNI
      <input type="text" v-model="gf.id_number" />
      <br />direccion
      <input type="text" v-model="gf.direccion" />
      <br />Telefono de contacto
      <input type="text" v-model="gf.telefono" />
      <br />Email
      <input type="text" v-model="gf.email" />
      <br />
      <button @click="crearGrupo()">Crear</button>
    </div>
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
  </div>
</template>

<script>
import ResPartnerService from "@/services/ResPartnerService";
import NeptunoService from "@/services/NeptunoService";

export default {
  data() {
    return {
      gf: { name: "", email: "", id_number: "", contact_name: "" },
      isLoading: false
    };
  },
  methods: {
    crearGrupo: async function() {
      this.isLoading = true;
      let grupoFamiliar = await NeptunoService.crearGrupoFamiliar(this.gf);
      console.log(grupoFamiliar);
      this.$session.set("id_grupo_familiar", grupoFamiliar.data);
      this.$router.push("/alumnos");
    },
    volver: function() {
      this.$router.push("/");
    }
  }
};
</script>
