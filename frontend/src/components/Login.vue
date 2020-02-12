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

          // let dat = responseSearch.data;


          // for (let i=0, rows = responseSearch[i]["parent_id"].length; i<rows; i++){
          //   console.log(rows)
          // }
          // let rows = datos.length;

          // for (let i=0, len = datos.length; i<len; i++){
          //   // console.log("Datosssss: " + datos[i]); //letra por letra como un string
          //   // console.log("Datosssss: " + datos);
          //
          // }
          // let rows = responseSearch.data.length;

          // const index = responseSearch.data.findIndex(function (todo, index) {
          //   return todo.parent_id !== 0
          // });
          // console.log("Rta3: ", index);
          // Array.isArray(responseSearch.data);
          // console.log("-------------");

          // const findTodo = function (dat, parent_id) { //findField
          //   const index = dat.findIndex(function (dat, index) {
          //     return dat.parent_id !== 0
          //   })
          //   return dat[index]
          // }
          // let printMe = findTodo()


          //myTodos tendría que ser un array pero para mi caso son los campos completos del modelo, en este
          //caso en particular creo que sería respartner. Así el índice tiene siempre los mismos datos.
          // Method 1
          // const myTodos = ['parent_id', 'title', 'main_id_number', 'id', 'name']; //Los datos que trae responseSearch.data
          // const dat = responseSearch.data;//newTodos
          // console.log("Rta: ", dat);
          // const index = dat.findIndex(function (anyDat, index) { //todo se debería llamar field
          //   console.log(anyDat);
          //   return anyDat.main_id_number !== 0//Condición para buscar índice
          // });
          // console.log("Index", index);
          // const findTodo = function (dat, title) {
          //   const index = myTodos.findIndex(function (anyDat, index) {
          //     return anyDat.title !== false
          //   })
          //   return myTodos[index]
          // }
          // let printMe = findTodo(newTodos, 'partner_id')
          // console.log(printMe);


          //Method 2
          // const findTodo = function (myTodos, title) {
          //   const titleReturned = myTodos.find(function (todo, index) {
          //     return todo.title.toLowerCase() === title.toLowerCase()
          //   });
          //   return titleReturned
          // };
          // let printMe = findTodo(newTodos, 'partner_id');
          // console.log(printMe);



          // An array of objects
          // Find if the array contains an object by comparing the property value
          // const dat = responseSearch.data;
          // if (dat.some(da => da.parent_id !== 0)){
          //   alert ("Object found inside the array============");
          // }else{
          //   alert("Object not found.");
          // }



          //muy buena función:
          //fuente: https://stackoverflow.com/questions/12462318/find-a-value-in-an-array-of-objects-in-javascript
          // function search(nameKey, myArray){
          //   for (var i=0; i < myArray.length; i++) {
          //     if (myArray[i].name === nameKey) {
          //       return myArray[i];
          //     }
          //   }
          // }
          // var array = [
          //   { name:"string 1", value:"this", other: "that" },
          //   { name:"string 2", value:"this", other: "that" }
          // ];
          //
          // var resultObject = search("string 1", array);

          //---------------------------------------------
          // Other way would be:
            let arr = responseSearch.data;

          let obj = arr.find(o => o.name === 'Familia');

          console.log(obj);

          //Replacing the array element:
          // let arr = [
          //   { name:"string 1", value:"this", other: "that" },
          //   { name:"string 2", value:"this", other: "that" }
          // ];
          //
          // let obj = arr.find((o, i) => {
          //   if (o.name === 'string 1') {
          //     arr[i] = { name: 'new string', value: 'this', other: 'that' };
          //     return true; // stop searching
          //   }
          // });

          console.log(arr);
// fin buena función.

          //Para determinar si es un Array:
          Array.isArray(responseSearch.data);
          //cantidad de objetos (en este caso) en una Array:
          console.log(responseSearch.data.length); //7

          const objEnArr = responseSearch.data;
          // objEnArr.forEach( obj => console.log(obj) );

          let rows = responseSearch.data.length; //objetos
          for (let i=0; i<rows; i++){ //7 iteraciones
            for (let key in responseSearch.data[i]){ //propiedades en cada objeto del array
              if(responseSearch.data[i].hasOwnProperty(key)){
                console.log("Rta: ", `${key} : ${responseSearch.data[i][key]}`)
              }
            }
            const obj = {
              id:1,
              name: "gowtham",
              active: true
            }

            Object.keys(rows).forEach(key=>{
              console.log(`${key} : ${rows[key]}`);
            });
            // let items = responseSearch.data[i]; //En vez de esto debería buscar en cada row si parent_id != 0
            // console.log(i, items);

            // for(let n=0; n<items; n++){
            //   // console.log(responseSearch.data[i][n]);
            // }
          }
          // -------------------------------------










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
