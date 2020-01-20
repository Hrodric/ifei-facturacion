//only getTags:
app.post('/getTags', async (req, res) => {
    var inParams = [];
    inParams.push([]);
    inParams.push(['id', 'name', 'category_id']); //Tags
    inParams.push(0); //offset
    inParams.push(10); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
        'res.partner.category',
        'read',
        params,
        (err, tags) => {
            if (err) {
                return console.log(err);
            }
            console.log(tags);
            res.send(tags);
        },
    );
});

//Concatenated test - this should be uploaded to production:
app.post('/getGrupoFamiliarContactos', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push(req.body.ids); //ids
    inParams.push([
        'name',
        'country_id',
        'type',
        'company_type',
        'comment',
        'parent_id',
        'main_id_number',
        'title',
        'email',
        'street',
        'mobile',
        'phone', //Field added
        'fax',
        'category_id', //Field added: Tags
    ]); //fields
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
        'res.partner',
        'read',
        params,
        (err, gruposfamiliares) => {
            if (err) {
                return console.log(err);
            }
            console.log(gruposfamiliares);
            var inParams = [];
            inParams.push({
                parent_id: gruposfamiliares.parent_id, //Todo: array
                category_id: gruposfamiliares.category_id,
            });
            console.log(inParams);
            var params = [];
            params.push(inParams);
            await OdooService.execute_kw(
                'res.partner.category',
                'search_read',
                params,
                function(err, tags) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log('Result: ', tags);
                    res.send({category_id: tags,});
                },
            );
        });
});
////////////////////////////////////////////////////////////////////////////////////////////////
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
    this.contactos = this.contactos.data[0];
    this.$session.set("contactos", this.contactos);
    this.loadingMsg = "Cargando datos complementarios...";
    this.tags = await ResPartnerService.getTags(
        this.contactos.parent_id
    );
    this.contactos = this.contactos.data;
    console.log(this.contactos);

    for (const contacto of this.contactos) {
        this.loadingMsg = "Procesando Contactos:... " + contacto.name;
        contacto.sos = await ResPartnerService.getSos(contacto.id);
    }
    this.loading = false;
    //sthis.sos = await ResPartnerService.getSos(this.grupoFamiliar.id);
    console.log(this.contactos);
};

