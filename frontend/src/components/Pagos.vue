<template>
  <b-container fluid>
    <b-container v-if="mes_pagos">
      <div class="container-fluid text-center" v-if="loading">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
        <h1>Cargando...</h1>
        <h3>{{loadingMsg}}</h3>
      </div>
      <div v-if="!loading">
        <h3>Facturar mes</h3>
        <button @click="facturarTodo()">Facturar MEs</button>
      </div>
    </b-container>
    <b-container v-if="pago_id && datos.pago.odoo_id">
      <button @click="verFact()">ver factura en odoo</button>
    </b-container>
    <b-container v-if="pago_id && !datos.pago.odoo_id">
      <h3>Crear Factura, Pago id #{{pago_id}}</h3>
      <div class="container-fluid text-center" v-if="loading">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
        <h1>Cargando...</h1>
      </div>
      <b-card header="Contacto de facturación:" disabled v-if="!loading">
        <b-row>
          <h5>Datos Neptuno</h5>
        </b-row>
        <b-row>
          <b-col>
            Apellido
            <br />
            <b>{{datos.grupo.apellido}}</b>
          </b-col>
          <b-col>
            Nombre
            <br />
            <b>{{datos.grupo.padre}}</b>
          </b-col>
          <b-col>
            DNI
            <br />
            <b>{{datos.grupo.direccion_trabajo_madre}}</b>
          </b-col>
          <b-col>
            Email
            <br />
            <b>{{datos.grupo.email_padre}}</b>
          </b-col>
        </b-row>
        <b-row>
          <h5>Datos Odoo</h5>
        </b-row>
        <b-row v-if="foundOdooPartner">
          <b-col>
            Nombre
            <br />
            <b>{{partnerOdoo.name}}</b>
          </b-col>
          <b-col>
            DNI
            <br />
            <b>{{partnerOdoo.main_id_number}}</b>
          </b-col>
          <b-col>
            Email
            <br />
            <b>{{partnerOdoo.email}}</b>
          </b-col>
        </b-row>
        <b-row v-if="!foundOdooPartner" style="text-align:center">
          <h6>Sin contacto en Odoo</h6>
        </b-row>
        <b-row v-if="!foundOdooPartner" style="text-align:center">
          <b-button
            size="sm"
            variant="outline-primary"
            @click="crearPartner()"
          >Crear Contacto en Odoo</b-button>
        </b-row>
      </b-card>
      <b-card header="Conceptos a facturar:" disabled v-if="!loading">
        <b-list-group v-for="(mov , key) in this.datos.movs" :key="'mov'+key">
          <b-list-group-item>
            {{mov.descripcion}},
            <b>$ {{mov.pesos}}</b>
          </b-list-group-item>
        </b-list-group>
      </b-card>
      <b-row v-if="!loading && foundOdooPartner">
        <b-col style="text-align:center;padding-top:25px">
          <b-button size="lg" variant="outline-primary" @click="facturar()">Facturar</b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import ResPartnerService from "@/services/ResPartnerService";
import NeptunoService from "@/services/NeptunoService";
import { async } from "q";

export default {
  data() {
    return {
      datos: {},
      datosMes: [],
      pago_id: false,
      mes_pagos: false,
      facturado: false,
      loading: true,
      partnerOdoo: {},
      foundOdooPartner: false,
      loadingMsg: ""
    };
  },
  created: async function() {
    let str = window.location.href;
    var urlParams = new URLSearchParams(str.substring(str.indexOf("?")));
    this.pago_id = urlParams.get("id");
    this.mes_pagos = urlParams.get("mes");
    console.log(this.mes_pagos);
    if (this.pago_id != undefined) {
      this.datos = await NeptunoService.getPago(this.pago_id);
      this.datos = this.datos.data;
      this.partnerOdoo = await ResPartnerService.getPartnerFacturacion(
        this.datos.grupo.id
      );

      if (this.partnerOdoo.data != "") {
        this.partnerOdoo = this.partnerOdoo.data;
        this.foundOdooPartner = true;
      }
      console.log(this.datos);
    }
    if (this.mes_pagos != undefined) {
      console.log(this.mes_pagos);
      this.datosMes = await NeptunoService.getPagosMes(this.mes_pagos);
      this.datosMes = this.datosMes.data;

      console.log(this.datosMes);
    }
    this.loading = false;
  },
  methods: {
    verFact: function() {
      window.location.replace(
        "https://ifei.moogah.com/web?#id=9625&view_type=form&model=account.invoice&menu_id=156&action=220"
      );
    },
    facturarTodo: async function() {
      this.loading = true;
      console.log(this.datosMes);
      //const pago = this.datosMes[0];
      let pago = {};
      for (let i = 0; i < this.datosMes.length; i++) {
        pago = this.datosMes[i];
        console.log(pago);
        this.datos = await NeptunoService.getPago(pago.id);
        this.datos = this.datos.data;
        this.partnerOdoo = await ResPartnerService.getPartnerFacturacion(
          this.datos.grupo.id
        );

        if (this.partnerOdoo.data != "") {
          console.log("OldPartner", this.partnerOdoo);
          this.partnerOdoo = this.partnerOdoo.data;
          this.foundOdooPartner = true;
        } else {
          this.partnerOdoo = await ResPartnerService.createPartnerFacturacion({
            x_neptuno_id: "gf" + this.datos.grupo.id,
            name: "Familia " + this.datos.grupo.apellido,
            main_id_number: this.datos.grupo.dni,
            email: this.datos.grupo.email_padre
          });

          this.partnerOdoo = await ResPartnerService.getPartnerFacturacion(
            this.datos.grupo.id
          );

          this.partnerOdoo = this.partnerOdoo.data;
          console.log("NewPartner", this.partnerOdoo);
        }
        console.log(this.datos);
        console.log("line 165", this.partnerOdoo);
        this.invoice = await ResPartnerService.crearFactura({
          id: this.partnerOdoo.id
        });
        console.log(this.invoice);
        for (const line of this.datos.movs) {
          await ResPartnerService.crearLineaFactura(
            this.invoice.data.Result,
            line
          );
        }
        await NeptunoService.registerInvoice({
          pago_id: pago.id,
          invoice_id: this.invoice.data.Result
        });
      }
    },
    facturar: async function() {
      this.loading = true;
      console.log(this.datos);
      console.log(this.partnerOdoo);
      this.invoice = await ResPartnerService.crearFactura({
        id: this.partnerOdoo.id
      });
      console.log(this.invoice);
      for (const line of this.datos.movs) {
        await ResPartnerService.crearLineaFactura(
          this.invoice.data.Result,
          line
        );
      }
      await NeptunoService.registerInvoice({
        pago_id: this.pago_id,
        invoice_id: this.invoice.data.Result
      });
      this.loading = false;
    },
    crearPartner: async function() {
      this.loading = true;
      this.partnerOdoo = await ResPartnerService.createPartnerFacturacion({
        x_neptuno_id: "gf" + this.datos.grupo.id,
        name: "Familia " + this.datos.grupo.apellido,
        main_id_number: this.datos.grupo.dni,
        email: this.datos.grupo.email_padre
      });
      location.reload();
      //   if (this.partnerOdoo.data != "") {
      //     this.partnerOdoo = this.partnerOdoo.data;
      //     this.foundOdooPartner = true;
      //   }
    }
  }
};
</script>
