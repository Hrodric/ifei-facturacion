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
        'search_read',
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
                parent_id: gruposfamiliares.parent_id,
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
