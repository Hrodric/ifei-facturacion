<template>
  <div>
    <b-container fluid>
      <b-card header="NUEVA FACTURACIÓN" disabled>
        <div v-if="loading">
          <h1>Cargando...</h1>
          <p>{{loadingMsg}}</p>
        </div>
        <b-list-group>
          <b-list-group-item button disabled>A nombre de {{grupoFamiliar.name}}, DNI: {{grupoFamiliar.main_id_number}}</b-list-group-item>
        </b-list-group>
        <br/>
        <h3>Detalle</h3>
        <table>
          <tr v-for="line in invoice_lines" :key="line.key">
            <td>{{line.order_partner_id[1]}} - {{line.product_id[1]}}</td>
            <td>
              <b>$ {{line.price_unit}}</b>
            </td>
          </tr>
          <tr style="border-top:1px solid #eee;font-weight:bold">
            <td style="text-align:right">Total:</td>
            <td>$ {{total}}</td>
          </tr>
        </table>
        <b-button variant="outline-primary" @click="crearFactura()">Crear Factura Borrador</b-button>
        <br/>
      </b-card>
    </b-container>
    <br/>
    <b-button variant="outline-primary" @click="volver()">Volver</b-button>
  </div>
</template>

<script>
import ResPartnerService from "@/services/ResPartnerService";
import NeptunoService from "@/services/NeptunoService";
import { async } from "q";

export default {
  data() {
    return {
      loading: true,
      loadingMsg: "",
      sos: [],
      total: 0
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
    this.grupoFamiliar.sos = [];
    for (const contacto of this.contactos) {
      this.loadingMsg = "Procesando Contactos:... " + contacto.name;
      contacto.sos = await ResPartnerService.getSos(contacto.id);
      if (contacto.sos.data[0] != undefined)
        this.grupoFamiliar.sos.push(contacto.sos.data);
    }
    this.invoice_lines = [];
    this.loadingMsg = "Procesando Ventas:... ";
    for (const saleOrder of this.grupoFamiliar.sos) {
      let tmp = await ResPartnerService.getOrderLine(
        saleOrder[0].order_line[0]
      );
      this.invoice_lines.push(tmp.data[0]);
      this.total = this.total + parseInt(tmp.data[0].price_unit);
    }
    this.loading = false;
  },
  methods: {
    volver: function() {
      this.$router.push("/alumnos");
    },
    crearFactura: async function() {
      console.log(this.grupoFamiliar);
      console.log(this.invoice_lines);
      let res = await ResPartnerService.crearFactura(this.grupoFamiliar);

      for (const line of this.invoice_lines) {
        await ResPartnerService.crearLineaFactura(res.data.Result, line);
      }
    }
  }
};
</script>
