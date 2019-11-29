<template>
  <div>
    <div>
      <button @click="volver()">Volver</button>
    </div>
    <div v-if="loading">
      <h1>Awantaaa!!</h1>
      <img
        src="https://media1.tenor.com/images/a7f37b8aaa8a6123211037d81487df6e/tenor.gif?itemid=5953099"
        width="433"
        height="149.06584362139915"
        alt="Aguanta Mucho GIF - Goku DragonballZ Power GIFs"
        style="max-width: 833px; background-color: rgb(63, 63, 63);"
      />
    </div>
    <h1>Grupo Familiar</h1>
    <div v-if="!loading">
      <h2>{{grupoFamiliar.name}}</h2>
      <h3>Contactos</h3>
      <div v-for="(contact, key) in contactos" :key="key">
        <h4 v-if="contact.title[1] == 'Madre/Padre'">{{contact.name}}</h4>
      </div>
      <h3>Alumnos</h3>
      <div v-for="(contact, key) in contactos" :key="'xx'+key">
        <div v-if="contact.title[1] == 'Student'" style="border:1px solid #666">
          <h4>{{contact.name}}</h4>
          <button @click="seleccionarAlumno(contact)">Seleccionar Alumno</button>
        </div>
      </div>
      <h3>Crear Alumno</h3>
      <input type="text" v-model="nombre_alumno_nuevo" />
      <button @click="crearAlumno()">crear Alumno</button>
      <h2>Preinscripcion</h2>
      <div style="border:1px solid #666">
        <div v-for="(contacto, key ) in contactos" :key="'co'+key">
          <ul v-if="contacto.sos">
            <li v-for="(so, key ) in contacto.sos.data" :key="'so'+key">
              {{so.name}}, {{so.partner_id[1]}}, {{so.product_id[1]}}, ${{so.amount_total}}
              <button
                @click="eliminarSo(so.id)"
              >Eliminar</button>
              <button>Seleccionar Horario</button>
            </li>
          </ul>
        </div>
        <button>Confirmar Preinscripcion</button>
      </div>
    </div>
  </div>
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
      loading: true
    };
  },
  created: async function() {
    this.grupoFamiliar = await ResPartnerService.getGrupoFamiliar(
      this.$session.get("id_grupo_familiar")
    );
    this.grupoFamiliar = this.grupoFamiliar.data[0];
    this.$session.set("grupoFamiliar", this.grupoFamiliar);
    this.contactos = await ResPartnerService.getContactos(
      this.grupoFamiliar.child_ids
    );
    this.contactos = this.contactos.data;
    for (const contacto of this.contactos) {
      contacto.sos = await ResPartnerService.getSos(contacto.id);
    }
    this.loading = false;
    //sthis.sos = await ResPartnerService.getSos(this.grupoFamiliar.id);
    console.log(this.contactos);
  },
  methods: {
    crearAlumno: async function() {
      if (this.nombre_alumno_nuevo == "") {
        alert("El nombre no puede estar vacio.");
      } else {
        this.loading = true;
        let nuevoAlumno = await NeptunoService.crearAlumno(
          this.grupoFamiliar,
          this.nombre_alumno_nuevo
        );
        console.log(nuevoAlumno);
        this.$session.set("alumno", nuevoAlumno);
        //this.$router.push("/clases");
      }
    },
    seleccionarAlumno: async function(alumno) {
      console.log(alumno);
      this.$session.set("alumno", alumno);
      //this.$router.push("/clases");
    },
    eliminarSo: async function(alumno) {
      alert(alumno);
    },
    volver: function() {
      this.$router.push("/");
    }
  }
};
</script>
