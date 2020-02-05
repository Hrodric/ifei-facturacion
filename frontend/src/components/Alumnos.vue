<template>
  <b-container title>
    <h4>{{ grupoFamiliar.name }}</h4>
    <div class="container-fluid text-center" v-if="loading">
      <b-spinner variant="primary" label="Spinning"> </b-spinner>
      <h1>Cargando...</h1>
            <div>{{loadingMsg}}</div>
    </div>
    <div v-if="!loading">
      <b-container>
        <b-row>
          <b-col>Direccion: <br />{{ grupoFamiliar.street }}</b-col>
          <b-col>Dni: <br />{{ grupoFamiliar.main_id_number }}</b-col>
          <b-col>email: <br />{{ grupoFamiliar.email }}</b-col>
          <b-col>tel: <br />{{ grupoFamiliar.phone }}</b-col>
          <b-col>cel: <br />{{ grupoFamiliar.mobile }}</b-col>
        </b-row>
        <b-row style="margin-top:10px;">
          <b-button size="sm" variant="outline-primary"
            @click="verPartnerEnOdoo(grupoFamiliar.id)">Ver en Odoo</b-button>
          <b-button variant="outline-primary" size="sm" @click="crearContacto()"
            >Nuevo Contacto/Alumno dentro de la Familia</b-button>
        </b-row>
      </b-container>
      <hr />
      <b-container>
        <b-row>
          <b-col>
            <div>
              <h5>Contactos en la {{ grupoFamiliar.name }}:</h5>
              <b-card-group deck v-for="(contact, key) in contactos" :key="key">
                <b-card disabled v-if="contact.title[1] !== 'Student'"
                        border-variant="primary"
                        img-src="../static/adulto-tutor-300x225.png"
                        img-width="120px"
                        img-height="90px"
                        img-alt="adulto tutor"
                        img-right>
<!--                  <b-card-title v-if="!contact.editable">{{contact.name}}</b-card-title>-->
                  <b-card-title>{{contact.name}}</b-card-title>
                  <div v-if="contact.editable">
                    <b-container class="datos-personales">
                      <div role="group">
                        <label>Nombre:</label>
                        <b-form-input v-model="contact.name"
                                      type="text"
                                      placeholder="Nombre"> </b-form-input>
                        <label>Telefono</label>
                        <b-form-input v-model="contact.phone"
                                      type="text"
                                      placeholder="Tel:"> </b-form-input>
                        <label>Celular</label>
                        <b-form-input v-model="contact.mobile"
                                      type="text"
                                      placeholder="Cel:"> </b-form-input>
                        <label>Email</label>
                        <b-form-input v-model="contact.email"
                                      type="text"
                                      placeholder="Email:"> </b-form-input>
                        <label>DNI</label>
                        <b-form-input v-model="contact.main_id_number"
                                      type="text"
                                      placeholder="DNI"> </b-form-input>
                      </div>
                    </b-container>
                  </div>
                  <div v-else>
                    <b-container class="datos-personales">
                      <b-row class="text-sm-right">
                        <b>Tel: </b> {{ contact.phone }}
                      </b-row>

                      <b-row class="text-sm-right">
                        <b>Cel: </b> {{ contact.mobile }}
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
                    <br/>
                  </div>
                  <b-button @click="verPartnerEnOdoo(contact.id)"
                            size="sm" style="margin-bottom: 5px"
                            variant="outline-primary"
                            v-if="!contact.editable">
                    Ver en Odoo</b-button>
                  <b-button @click="contact.editable = !contact.editable"
                            size="sm" style="margin-bottom: 5px"
                            variant="outline-primary"
                            v-if="!contact.editable">
                    Editar</b-button>
                  <b-button @click="contact.editable = !contact.editable"
                            size="sm" style="margin-bottom: 5px"
                            variant="outline-primary"
                            v-if="contact.editable">
                    Cancelar</b-button>
                  <b-button size="sm" style="margin-bottom: 5px"
                            variant="outline-primary"
                            v-if="contact.editable"
                            @click="guardarPartner()">
                    Guardar</b-button>
                  <b-button size="sm" style="margin-bottom: 5px"
                            variant="outline-primary"
                            v-if="contact.editable"
                            @click="guardarPartner(contact)">
                    Guardar</b-button>
                </b-card>
              </b-card-group>
            </div>

            <h5>Alumnos existentes</h5>
            <b-card-group deck v-for="(contact, key) in contactos" :key="'xx' + key">
              <b-card v-if="contact.title[1] === 'Student'"
                border-variant="secondary"
                img-src="../static/alumnx-300x225.png"
                img-width="120px"
                img-height="90px"
                img-alt="alumno"
                img-right>
                <b-card-title>{{ contact.name }}</b-card-title>
                <div v-if="contact.editable">
                  <b-container class="datos-personales">
                    <label>Nombre:</label>
                    <b-form-input v-model="contact.name"
                                  type="text"
                                  placeholder="Nombre"> </b-form-input>
                    <label>Celular:</label>
                    <b-form-input v-model="contact.mobile"
                                  type="text"
                                  id="input-tel"
                                  placeholder="Cel:"> </b-form-input>
                    <label>Email:</label>
                    <b-form-input v-model="contact.email"
                                  type="text"
                                  placeholder="Email:"> </b-form-input>
                    <label>DNI:</label>
                    <b-form-input v-model="contact.main_id_number"
                                  type="text"
                                  placeholder="DNI"> </b-form-input>
                  </b-container>
                </div>
                <div v-else>
                  <b-container class="datos-personales">

                    <b-row class="text-sm-right">
                      <b>Cel: </b> {{ contact.mobile }}
                    </b-row>

                    <b-row class="text-sm-right">
                      <b>Email: </b> {{ contact.email }}
                    </b-row>

                    <b-row class="text-sm-right">
                      <b>DNI: </b> {{ contact.main_id_number }}
                    </b-row>

<!--                    En vez de etiqueta, mostrar el nombre de la clase/curso (el project.project.display_name según project.project.id) -->

<!--                    Seleccionar los horarios: (etapas dentro de projecto tarea respartner.task_ids) -->
<!--                    Corregir layout, contacto y alumno uno al lado del otro y no abajo.-->

                    <b-row class="text-sm-right">
                      <b>Clase:</b>
                      <div v-for="(val, key) in contact.tags.data" :key="key">
                        <b-badge>{{ val }}</b-badge>
                      </div>
                    </b-row>

                  </b-container>
                  <br/>
                </div>
                <b-button @click="verPartnerEnOdoo(contact.id)"
                          size="sm" style="margin-bottom: 5px"
                          variant="outline-primary">
                  Ver en Odoo</b-button>
                <b-button @click="contact.editable = !contact.editable"
                          size="sm" style="margin-bottom: 5px"
                          variant="outline-primary"
                          v-if="!contact.editable">
                  Editar</b-button>
                <b-button @click="contact.editable = !contact.editable"
                          size="sm" style="margin-bottom: 5px"
                          variant="outline-primary"
                          v-if="contact.editable">
                  Cancelar</b-button>
                <b-button size="sm" style="margin-bottom: 5px"
                          variant="outline-primary"
                          v-if="contact.editable"
                          @click="guardarPartner()">
                  Guardar</b-button>
              </b-card>
            </b-card-group>
            <br/>
          </b-col>
        </b-row>
        <b-col>
        <br/>
        </b-col>
      </b-container>
      <br />
      <hr />
      <h4>Ordenes de Venta</h4>
      <b-container>
        <b-container v-for="(contacto, key) in contactos" :key="'co' + key">
          <ul v-if="contacto.sos">
            <li v-for="(so, key) in contacto.sos.data" :key="'so' + key">
              {{ so.name }}, {{ so.partner_id[1] }}, {{ so.product_id[1] }},
              ${{so.amount_total}}
              <button @click="verSoEnOdoo(so.id)">Ver SO</button>

<!--              //Todo: el botón seleccionar horario no funciona.-->
9
              <b-button size="sm" variant="outline-primary"
                @click="seleccionarAlumno(alumno)">
                Seleccionar Horario</b-button>
            </li>
          </ul>
        </b-container>
      </b-container>
      <b-button size="sm" variant="outline-primary"
        @click="volver()">
        Volver</b-button>
      <b-button size="sm" variant="outline-primary"
        @click="facturar()">
        Crear Factura Borrador</b-button>
    </div>
  </b-container>
</template>

<script>
import ResPartnerService from "@/services/ResPartnerService";
// import NeptunoService from "@/services/NeptunoService";
// import { async } from "q";

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
      noeditable: 0,
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
  methods: {
    forceRerender() {
      this.noeditable += 1;
    },
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

    async guardarPartner(contacto) {
      console.log("Datos de contact: " + contacto);
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
      // contacto;
    }
  }
};
</script>

<style>
.card-deck {
  display: table-cell;
}
/*.datos-personales {*/
/*  font-size: 14px; margin-bottom: 10px; padding-left: 0px; height: 120px*/
/*}*/
</style>
