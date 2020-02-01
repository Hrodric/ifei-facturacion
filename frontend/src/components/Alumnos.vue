<template>
  <b-container title>
    <h4>{{ grupoFamiliar.name }}</h4>
    <div class="container-fluid text-center" v-if="loading">
      <!--      <br/>-->
      <b-spinner variant="primary" label="Spinning"></b-spinner>
      <h1>Cargando...</h1>
      <!--      <div>{{loadingMsg}}</div>-->
    </div>
    <div v-if="!loading">
      <b-container>
        <b-row>
          <b-col>Direccion: <br />{{ grupoFamiliar.street }}</b-col>
          <b-col>Dni: <br />{{ grupoFamiliar.main_id_number }}</b-col>
          <b-col>email: <br />{{ grupoFamiliar.email }}</b-col>
          <b-col>tel: <br />{{ grupoFamiliar.phone }}</b-col>
          <b-col><b>cel:</b> <br />{{ grupoFamiliar.mobile }}</b-col>
        </b-row>
        <b-row style="margin-top:10px;">
          <b-button
            size="sm"
            variant="outline-primary"
            @click="verPartnerEnOdoo(grupoFamiliar.id)"
            >Ver en Odoo</b-button
          >
          <b-button variant="outline-primary" size="sm" @click="crearContacto()"
            >Nuevo Contacto/Alumno dentro de la Familia</b-button
          >
        </b-row>
      </b-container>
      <hr />
      <b-container>
        <b-col>
          <div>
            <!--//Todo: no funciona como debería -->
            <h5>Contactos en la {{ grupoFamiliar.name }}:</h5>
            <b-card-group deck v-for="(contact, key) in contactos" :key="key">
              <b-card
                disabled
                v-if="contact.title[1] !== 'Student'"
                border-variant="primary"
                img-src="../static/adulto-tutor-300x225.png"
                img-alt="adulto tutor"
                img-top
              >
                <b-card-title v-if="!contact.editable">{{
                  contact.name
                }}</b-card-title>
                <div v-if="contact.editable">
                  <b-container>
                    <div role="group">
                      <label>Nombre:</label>
                      <b-form-input
                        v-model="contact.name"
                        placeholder="Nombre"
                        trim
                      ></b-form-input>
                      <label for="">Telefono</label>
                      <b-form-input
                        type="text"
                        v-model="contact.phone"
                        placeholder="Tel:"
                      ></b-form-input>
                      <label for="">Celular</label>
                      <b-form-input
                        type="text"
                        v-model="contact.mobile"
                        placeholder="Cel:"
                      ></b-form-input>
                      <label for=""> Email</label>
                      <b-form-input
                        type="text"
                        v-model="contact.email"
                        placeholder="Email:"
                      ></b-form-input>
                      <label for="">DNI</label>
                      <b-form-input
                        type="text"
                        v-model="contact.main_id_number"
                        placeholder="DNI"
                      ></b-form-input>
                    </div>
                  </b-container>
                </div>
                <div v-else>
                  <b-container>
                    <b-row class="text-sm-right">
                      <b>Tel: </b> {{ contact.phone }}
                    </b-row>

                    <b-row class="text-sm-right">
                      <b>Cel: {{ contact.mobile }}</b>
                    </b-row>

                    <b-row class="text-sm-right">
                      <b>Email: </b> {{ contact.email }}
                    </b-row>

                    <b-row class="text-sm-right">
                      <b>Direccion: </b> {{ contact.street }}
                    </b-row>
                    <b-row class="text-sm-right">
                      <b>Relacion:</b>
                      <div v-for="(val, key) in contact.tags.data" :key="key">
                        <b-badge>{{ val }}</b-badge>
                      </div>
                    </b-row>
                    <b-row sm="3" class="text-sm-right">
                      <b>DNI: </b>{{ contact.main_id_number }}
                    </b-row>
                  </b-container>
                </div>
                <b-button
                  size="sm"
                  style="margin-bottom: 5px"
                  variant="outline-primary"
                  v-if="!contact.editable"
                  @click="verPartnerEnOdoo(contact.id)"
                  >Ver en Odoo</b-button
                >
                <b-button
                  style="margin-bottom: 5px"
                  variant="outline-primary"
                  size="sm"
                  v-if="!contact.editable"
                  @click="contact.editable = !contact.editable"
                  >Editar</b-button
                >
                <b-button
                  style="margin-bottom: 5px"
                  variant="outline-primary"
                  size="sm"
                  v-if="contact.editable"
                  @click="contact.editable = !contact.editable"
                  >Cancelar</b-button
                >
                <!--                  <b-button style="margin-bottom: 5px" variant="outline-primary"  size="sm" @click="partner.editable = ! partner.editable">Editar</b-button>-->
                <b-button
                  style="margin-bottom: 5px"
                  variant="outline-primary"
                  size="sm"
                  v-if="contact.editable"
                  @click="guardarPartner(contact)"
                  >Guardar</b-button
                >
              </b-card>
            </b-card-group>
          </div>
        </b-col>
        <b-col>
          <h5>Alumnos existentes</h5>
          <b-card-group
            deck
            v-for="(contact, key) in contactos"
            :key="'xx' + key"
          >
            <b-card
              v-if="contact.title[1] === 'Student'"
              border-variant="secondary"
              img-src="../static/alumnx-300x225.png"
              img-alt="adulto tutor"
              img-top
            >
              <b-card-title>{{ contact.name }}</b-card-title>
              <div v-if="contact.editable !== undefined && contact.editable">
                <b-container>
                  <label for="input-tel">Telefono:</label>
                  <b-form-input
                    type="text"
                    id="input-tel"
                    v-model="contact.mobile"
                    placeholder="Tel:"
                  ></b-form-input>
                  <b-form-input
                    type="text"
                    v-model="contact.email"
                    placeholder="Email:"
                  ></b-form-input>
                  <b-form-input
                    type="text"
                    v-model="contact.main_id_number"
                    placeholder="DNI"
                  ></b-form-input>
                </b-container>
              </div>
              <div v-if="contact.editable === undefined || !contact.editable">
                <b-container>
                  <b-col sm="3" class="text-sm-right">
                    <b>Tel:</b>
                  </b-col>
                  <b-col>{{ contact.mobile }}</b-col>
                  <b-col sm="3" class="text-sm-right">
                    <b>Email:</b>
                  </b-col>
                  <b-col>{{ contact.email }}</b-col>
                  <!--                    <b-col sm="3" class="text-sm-right"><b>Relación: {{tags.name}}</b></b-col> <&#45;&#45;! v-bind:key="id" v-for="res.partner.category_id == res.partner.category.id then method" &ndash;&gt;-->
                  <!--                    <b-col>{{contact.tags.name}}</b-col>-->
                  <!--                    <b-col sm="3" class="text-sm-right"><b>Dire:</b></b-col>-->
                  <!--                    <b-col>{{contact.street}}</b-col>-->
                  <b-col sm="3" class="text-sm-right">
                    <b>DNI:</b>
                  </b-col>
                  <b-col>{{ contact.main_id_number }}</b-col>
                </b-container>
              </div>
              <b-button
                size="sm"
                style="margin-bottom: 10px"
                variant="outline-primary"
                @click="verPartnerEnOdoo(contact.id)"
                >Ver en Odoo</b-button
              >
              <b-button
                style="margin-bottom: 5px"
                variant="outline-primary"
                size="sm"
                @click="editarPartner(key)"
                >Editar</b-button
              >
              <!--                  <b-button style="margin-bottom: 5px" variant="outline-primary"  size="sm" @click="partner.editable = ! partner.editable">Editar</b-button>-->
              <b-button
                style="margin-bottom: 5px"
                variant="outline-primary"
                size="sm"
                @click="guardarPartner()"
                >Guardar</b-button
              >
            </b-card>
          </b-card-group>
        </b-col>
        <b-col>
          <h5>Alumnos existentes</h5>
          <b-card-group
            deck
            v-for="(contact, key) in contactos"
            :key="'xx' + key"
          >
            <b-card
              v-if="contact.title[1] === 'Student'"
              border-variant="secondary"
              img-src="../static/alumnx-300x225.png"
              img-alt="adulto tutor"
              img-top
            >
              <b-card-title>{{ contact.name }}</b-card-title>
              <!--                <b-row class="sm-2"><b-row>-->
              <b-container>
                <b-col sm="3" class="text-sm-right">
                  <b>Tel:</b>
                </b-col>
                <b-col>{{ contact.mobile }}</b-col>
                <!--                  Para editar el campo dentro de la tarjeta:
                <b-col><b-form-input type="text" v-model="contact.mobile" @input="searchPartner" @change="searchPartner"> </b-form-input></b-col>                  <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>-->
                <b-col sm="3" class="text-sm-right">
                  <b>Email:</b>
                </b-col>
                <b-col>{{ contact.email }}</b-col>
                <!--                  <b-col sm="3" class="text-sm-right"><b>Dire:</b></b-col>-->
                <!--                  <b-col>{{contact.street}}</b-col>-->
                <b-col sm="3" class="text-sm-right">
                  <b>DNI:</b>
                </b-col>
                <b-col>{{ contact.main_id_number }}</b-col>
              </b-container>
              <b-button
                style="margin-bottom: 5px"
                variant="outline-primary"
                size="sm"
                @click="verPartnerEnOdoo(contact.id)"
                >Ver en Odoo</b-button
              >
              <b-button
                variant="outline-secondary"
                size="sm"
                @click="seleccionarAlumno(contact)"
                >Seleccionar Clase</b-button
              >
            </b-card>
          </b-card-group>
          <br />
        </b-col>
      </b-container>
      <br />
      <hr />
      <h4>Ordenes de Venta</h4>
      <b-container>
        <b-container v-for="(contacto, key) in contactos" :key="'co' + key">
          <ul v-if="contacto.sos">
            <li v-for="(so, key) in contacto.sos.data" :key="'so' + key">
              {{ so.name }}, {{ so.partner_id[1] }}, {{ so.product_id[1] }}, ${{
                so.amount_total
              }}
              <button @click="verSoEnOdoo(so.id)">Ver SO</button>
              <b-button
                variant="outline-primary"
                size="sm"
                @click="seleccionarHorario(so.id)"
                >Seleccionar Horario</b-button
              >
            </li>
          </ul>
        </b-container>
      </b-container>
      <b-button variant="outline-primary" size="sm" @click="volver()"
        >Volver</b-button
      >
      <b-button variant="outline-primary" size="sm" @click="facturar()"
        >Crear Factura Borrador</b-button
      >
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
      loading: true,
      loadingMsg: "",
      sos: [],
      //Inicio rodri:
      tel_contacto_nuevo: "", //field added
      category_id: "" //field added
      //Fin rodri.
    };
  },

  //Begin Original Created.
  created: async function() {
    this.loadingMsg = "Cargando Grupo Familiar.";
    this.grupoFamiliar = await ResPartnerService.getGrupoFamiliar(
      this.$session.get("id_grupo_familiar")
    );
    this.grupoFamiliar = this.grupoFamiliar.data[0];
    // console.log("data:" + this.grupoFamiliar.data[0]);
    this.$session.set("grupoFamiliar", this.grupoFamiliar);
    this.loadingMsg = "Cargando Contactos.";
    this.contactos = await ResPartnerService.getContactos(
      this.grupoFamiliar.child_ids
    );
    this.contactos = this.contactos.data;
    console.log(this.grupoFamiliar);
    console.log(this.contactos);

    for (let i = 0; i < this.contactos.length; i++) {
      this.loadingMsg = "Procesando Contactos:... " + this.contactos[i].name;
      this.contactos[i].sos = await ResPartnerService.getSos(
        this.contactos[i].id
      );

      this.contactos[i].tags = await ResPartnerService.getTags(
        this.contactos[i].category_id //parent_id or category_id?
      );
      this.contactos[i].editable = false;
      console.log(this.contactos[i].tags);
    }
    this.loading = false;
    //sthis.sos = await ResPartnerService.getSos(this.grupoFamiliar.id);
    console.log(this.contactos);
  },
  //End Original Created.

  //Begin rodri test
  //   created: async function() {
  //     this.loadingMsg = "Cargando Grupo Familiar.";
  //     this.grupoFamiliar = await ResPartnerService.getGrupoFamiliar(
  //       this.$session.get("id_grupo_familiar")
  //     );
  //     this.grupoFamiliar = this.grupoFamiliar.data[0];
  //     this.$session.set("grupoFamiliar", this.grupoFamiliar);
  //     this.loadingMsg = "Cargando Contactos.";
  //     this.contactos = await ResPartnerService.getContactos(
  //       this.grupoFamiliar.child_ids
  //     );
  //     this.contactos = this.contactos.data;
  //     console.log(this.contactos);
  //
  //
  //     this.$session.set("contactos", this.contactos);
  //     this.loadingMsg = "Cargando datos complementarios...";
  // this.tags = await ResPartnerService.getTags(
  //   this.contactos.category_id    //parent_id or category_id?
  // );
  // console.log(this.tags)
  //
  //     this.loading = false;
  //   },
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
    },

    //inicio test rodri
    seleccionarTag(category_id) {
      this.tags = this.tags.filter(tags => tags.id === category_id); //filter is like a loop, in this case Im using an arrow function (=>) to iterate into the tags ids and to find where they match the respartner.category_id Im looking for.
    },

    //--> Estaría bueno que ejecute el método cuando el user hace click en la familia:
    async seleccionarTags(id) {
      this.$session.set("id_tags", alumno.category_id[0]);
    },

    async guardarPartner(contacto) {
      //
      //this.$router.push("/guardar_partner");
      console.log(contacto);
      await ResPartnerService.updatePartner({
        id: contacto.id,
        nombre: contacto.name,
        phone: contacto.phone,
        main_id_number: contacto.main_id_number,
        main_id_category_id: 35,
        email: contacto.email,
        celular: contacto.mobile,
        direccion: contacto.street
      });
      contacto;
    }
    //fin test rodri
  }
};
</script>

<style>
.card-deck {
  display: table-cell;
}
</style>
