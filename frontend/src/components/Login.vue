<template>
  <b-container>
    <b-card>
      <b-container>
        <p>Para crear un nuevo Grupo Familiar, presione:</p>
        <b-button
          size="sm"
          style="margin-bottom: 10px"
          variant="outline-primary"
          @click="crearGF()">
          Crear</b-button>
      </b-container>
      <br />
      <b-container>
        <p>Para buscar un Grupo Familiar, complete el siguiente campo:</p>
        <b-form-input
          v-model="search"
          @input="searchPartner"
          @change="searchPartner"
          @blur="handleBlur"
          placeholder="Buscar">
        </b-form-input>
      </b-container>
      <ul v-if="!isLoading">
        <li v-for="(partner, key) in responseSearch" :key="key"style="display: block; margin-top: 10px;">
            <b-button-group size="sm">
              <b-button @click="verPartnerEnOdoo(partner.id)"
                variant="outline-primary">
                Ver en Odoo
              </b-button>
              <b-button @click="seleccionarGF(partner.id)"
                v-if="!partner.parent_id"
                variant="outline-primary">
                Seleccionar Grupo Familiar
              </b-button>

<!--              Inicio Alumnos-->

              <b-button @click="seleccionarAlumno(partner)"
                v-if="partner.title[1] == 'Student'"
                variant="outline-secondary">
                Seleccionar Alumno
              </b-button>

<!--              Fin Alumnos-->
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

    //Todo: Esta funcion es la que tiene que ejecutar en Alumnos\SeleccionarHorario:

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
        this.searchingTerm !== this.search &&
        this.search.length >= 3
      ) {
        this.isLoading = true;
        this.searchingTerm = this.search;
        let responseSearch = await ResPartnerService.search(this.search);
        this.isLoading = false;
        if (this.searchingTerm !== this.search) {
          this.searchPartner();
        } else {
          this.responseSearch = responseSearch.data;
          console.log("=====Rta:" + JSON.stringify(responseSearch.data));


// Inicio  indentación del Alumno
          // responseSearch.data.forEach(output);
          // function output(item, index, array) {
          // }

          // let rows = responseSearch.data.length;
          // for (let i=0; i<rows; i++){
          //   let items = responseSearch.data[i].length;
          //   console.log(i, items);
          //   for(let n=0; n<items; n++){
          //     console.log(responseSearch.data[i][n]);
          //   }
          // }

          let datos = responseSearch.data;
          for (let i=0, len = datos.length; i<len; i++){
            console.log(datos[i]);
          }


//           primer paso: si el contacto tiene parent_id entonces es un alumno...
//           segundo paso: si es alumno entonces pertenece a un grupo familiar, cual?
//           tercer paso: renderear este alumno indentado bajo su parent.


//           let rows = this.responseSearch.data.length;


//           si es alumno entonces hago una iteración en el array y comparo
//           si parent_id es igual al id de gf entonces que renderee indentado bajo ese gf.
// Fin indentación del Alumno
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
