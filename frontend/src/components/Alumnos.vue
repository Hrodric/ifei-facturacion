<template>
  <div>
    <div>
      <button @click="volver()">Volver</button>
    </div>
    <div v-if="loading">
      <h1>Cargando...</h1>
      <p>{{loadingMsg}}</p>
    </div>
    <div v-if="!loading">
      <h2>{{grupoFamiliar.name}}</h2>
      <button @click="crearContacto()">Nuevo Contacto / Alumno</button>

      <h3>Contactos</h3>
      <div v-for="(contact, key) in contactos" :key="key">
        <div v-if="contact.title[1] !== 'Student'">{{contact.name}}</div>
      </div>
      <h4>Alumnos existentes</h4>
      <div v-for="(contact, key) in contactos" :key="'xx'+key">
        <div v-if="contact.title[1] == 'Student'">
          <button @click="seleccionarAlumno(contact)">Seleccionar Clase</button>
          {{contact.name}}
        </div>
      </div>
      <h2>Ordenes de Venta</h2>

      <div>
        <div v-for="(contacto, key ) in contactos" :key="'co'+key">
          <ul v-if="contacto.sos">
            <li v-for="(so, key ) in contacto.sos.data" :key="'so'+key">
              {{so.name}}, {{so.partner_id[1]}}, {{so.product_id[1]}}, ${{so.amount_total}}
              <button
                @click="seleccionarHorario(so.id)"
              >Seleccionar Horario</button>
            </li>
          </ul>
        </div>
      </div>
      <button @click="facturar()">Crear Factura Borrador</button>
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
      dni_alumno_nuevo: "",
      nombre_contacto_nuevo: "",
      dni_contacto_nuevo: "",
      loading: true,
      loadingMsg: "",
      sos: []
    };
  },
  created: async function() {
    this.loadingMsg = "Cargando Grupo Familiar.";
    this.grupoFamiliar = await ResPartnerService.getGrupoFamiliar(
      this.$session.get("id_grupo_familiar")
    );
    this.grupoFamiliar = this.grupoFamiliar.data[0];
    this.$session.set("grupoFamiliar", this.grupoFamiliar);
    this.loadingMsg = "Cargando Contactos.";
    this.contactos = await ResPartnerService.getContactos(
      this.grupoFamiliar.child_ids
    );
    this.contactos = this.contactos.data;

    for (const contacto of this.contactos) {
      this.loadingMsg = "Procesando Contactos:... " + contacto.name;
      contacto.sos = await ResPartnerService.getSos(contacto.id);
    }
    this.loading = false;
    //sthis.sos = await ResPartnerService.getSos(this.grupoFamiliar.id);
    console.log(this.contactos);
  },
  methods: {
    seleccionarAlumno: async function(alumno) {
      console.log(alumno);
      this.$session.set("alumno", alumno);
      this.$router.push("/clases");
    },
    eliminarSo: async function(sale_order_id) {
      alert(sale_order_id);
    },
    volver: function() {
      this.$router.push("/");
    },
    facturar: function() {
      this.$router.push("/facturar");
    },
    crearContacto() {
      this.$router.push("/crear_contacto");
    },
    seleccionarHorario(sale_order_id) {
      this.$session.set("saleOrderId", sale_order_id);
      this.$router.push("/seleccionar_horario");
    }
  }
};
</script>
