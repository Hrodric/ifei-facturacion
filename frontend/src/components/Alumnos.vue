<template>
  <b-container title=""><h4>{{grupoFamiliar.name}}</h4>
    <div class="container-fluid text-center" v-if="loading">
<!--      <br/>-->
      <b-spinner variant="primary" label="Spinning"> </b-spinner>
      <h1>Cargando...</h1>
<!--      <div>{{loadingMsg}}</div>-->
    </div>
    <div v-if="!loading">
      <b-button variant="outline-primary" size="sm" @click="crearContacto()">Nuevo Contacto/Alumno dentro de la Familia</b-button>
      <hr>
        <b-container>
          <b-col >
            <div > <!--//Todo: no funciona como debería -->
              <h5>Contactos en la {{grupoFamiliar.name}}:</h5>
              <b-card-group deck v-for="(contact, key) in contactos" :key="key">
                <b-card disabled v-if="contact.title[1] !== 'Student'"
                         border-variant="primary"
                         img-src="../static/adulto-tutor-300x225.png"
                         img-alt="adulto tutor"
                         img-top>
                  <b-card-title>{{contact.name}} </b-card-title>
                  <b-container>
                    <b-col sm="3" class="text-sm-right"><b>Tel:</b></b-col>
                    <b-col>{{contact.mobile}}</b-col>
                    <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                    <b-col>{{contact.email}}</b-col>
                    <b-col sm="3" class="text-sm-right"><b>Relación:</b></b-col>
                    <b-col>{{contact.category_id}}</b-col>
<!--                    <b-col sm="3" class="text-sm-right"><b>Dire:</b></b-col>-->
<!--                    <b-col>{{contact.street}}</b-col>-->
                    <b-col sm="3" class="text-sm-right"><b>DNI:</b></b-col>
                    <b-col>{{contact.main_id_number}}</b-col>
                  </b-container>
                  <b-button size="sm" style="margin-bottom: 10px" variant="outline-primary" @click="verPartnerEnOdoo(contact.id)">Ver en Odoo</b-button>
                </b-card>
              </b-card-group>

            </div>
          </b-col>
          <b-col>
            <h5>Alumnos existentes</h5>
            <b-card-group deck  v-for="(contact, key) in contactos" :key="'xx'+key">
              <b-card v-if="contact.title[1] == 'Student'"
                      border-variant="secondary"
                      img-src="../static/alumnx-300x225.png"
                      img-alt="adulto tutor"
                      img-top>
                <b-card-title>{{contact.name}}</b-card-title>
<!--                <b-row class="sm-2"><b-row>-->
                <b-container>
                  <b-col sm="3" class="text-sm-right"><b>Tel:</b></b-col>
                  <b-col>{{contact.mobile}}</b-col>
<!--                  Para editar el campo dentro de la tarjeta:
                  <b-col><b-form-input type="text" v-model="contact.mobile" @input="searchPartner" @change="searchPartner"> </b-form-input></b-col>                  <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>-->
                  <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                  <b-col>{{contact.email}}</b-col>
<!--                  <b-col sm="3" class="text-sm-right"><b>Dire:</b></b-col>-->
<!--                  <b-col>{{contact.street}}</b-col>-->
                  <b-col sm="3" class="text-sm-right"><b>DNI:</b></b-col>
                  <b-col>{{contact.main_id_number}}</b-col>
                </b-container>
                <b-button style="margin-bottom: 5px" variant="outline-primary"  size="sm" @click="verPartnerEnOdoo(contact.id)">Ver en Odoo</b-button>
                <b-button variant="outline-secondary" size="sm" @click="seleccionarAlumno(contact)">Seleccionar Clase</b-button>
              </b-card>
            </b-card-group>
            <br/>
          </b-col>
        </b-container>
      <br/>
        <hr>
      <h4>Ordenes de Venta</h4>
      <b-container>
        <b-container v-for="(contacto, key ) in contactos" :key="'co'+key">
          <ul v-if="contacto.sos">
            <li v-for="(so, key ) in contacto.sos.data" :key="'so'+key">
              {{so.name}}, {{so.partner_id[1]}}, {{so.product_id[1]}}, ${{so.amount_total}}
              <button
                @click="verSoEnOdoo(so.id)"
              >Ver SO</button>
              <b-button variant="outline-primary" size="sm" @click="seleccionarHorario(so.id)">Seleccionar Horario</b-button>
            </li>
          </ul>
        </b-container>
      </b-container>
      <b-button variant="outline-primary" size="sm" @click="volver()">Volver</b-button>
      <b-button variant="outline-primary" size="sm" @click="facturar()">Crear Factura Borrador</b-button>
    </div>
  </b-container>
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
      tel_contacto_nuevo: "", //field added
      category_id: "", //field added
      loading: true,
      loadingMsg: "",
      sos: []
    };
  },

//Begin Original Created.
//   created: async function() {
//     this.loadingMsg = "Cargando Grupo Familiar.";
//     this.grupoFamiliar = await ResPartnerService.getGrupoFamiliar(
//       this.$session.get("id_grupo_familiar")
//     );
//     this.grupoFamiliar = this.grupoFamiliar.data[0];
//     // console.log("data:" + this.grupoFamiliar.data[0]);
//     this.$session.set("grupoFamiliar", this.grupoFamiliar);
//     this.loadingMsg = "Cargando Contactos.";
//     this.contactos = await ResPartnerService.getContactos(
//       this.grupoFamiliar.child_ids
//     );
//     this.contactos = this.contactos.data;
//     console.log(this.contactos);
//
//   for (const contacto of this.contactos) {
//   this.loadingMsg = "Procesando Contactos:... " + contacto.name;
//   contacto.sos = await ResPartnerService.getSos(contacto.id);
// }
// this.loading = false;
// //sthis.sos = await ResPartnerService.getSos(this.grupoFamiliar.id);
// console.log(this.contactos);
// },
//End Original Created.

//Begin rodri test
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
    console.log(this.contactos);

    this.contactos = this.contactos.data[0];
    this.$session.set("contactos", this.contactos);
    this.loadingMsg = "Cargando datos complementarios...";
    this.tags = await ResPartnerService.getTags(
      this.contactos.parent_id
    );
    console.log(this.tags)

    this.loading = false;
  },
//End rodri test

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
    },
    verSoEnOdoo(sale_order_id) {
      let routeData =
        "http://ifei.moogah.com/web#id=" +
        sale_order_id +
        "&view_type=form&model=sale.order&menu_id=121&action=305";
      window.open(routeData, "_blank");
    },
    verPartnerEnOdoo(partner_id) {
      let routeData =
        "http://ifei.moogah.com/web#id=" +
        partner_id +
        "&view_type=form&model=res.partner&menu_id=70&action=77";
      window.open(routeData, "_blank");
    }
  }
};
</script>

<style>
  .card-deck {
    display: table-cell;
  }
</style>
