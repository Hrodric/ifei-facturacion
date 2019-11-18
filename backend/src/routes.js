const Container = require("typedi").Container;
const OdooService = Container.get('OdooService');


module.exports = (app) => {
    app.post('/login', async (req, res) => {
        console.log(req.body)
        var inParams = [];
        inParams.push([
            ['name', '=', req.body.dni]
        ]);
        var params = [];
        params.push(inParams);

        OdooService.execute_kw('res.partner.id_number', 'search_read', params, (err, results) => {
            console.log(results)
            if (err) {
                res.status(500).send(err)
                return
            }
            if (results == undefined) {
                res.status(404).send({
                    message: "User not found"
                })
                return
            }
            console.log(results)
            if (results[0] != undefined) {
                console.log(results[0])
                let ret = {
                    id: results[0].partner_id[0],
                    nombre: results[0].partner_id[1],
                    token: results[0].partner_id[0]
                };
                res.send(ret)
            }

        })
    });

    app.post('/testPost', async (req, res) => {
        console.log(req);
        var inParams = [];
        inParams.push([
            ['is_company', '=', true]
        ]);
        var params = [];
        params.push(inParams);

        OdooService.execute_kw('res.partner', 'search', params, (err, results) => {
            if (err) {
                res.status(500).send(err)
                return
            }
            if (!results) {
                res.status(404).send({
                    message: "User not found"
                })
                return
            }
            res.send(results)
        })

    })

    app.get('/getPartner', async (req, res) => {

        var inParams = [];
        inParams.push([
            ['id', '=', req.query.id],
        ]);
        inParams.push(['name', 'country_id', 'comment', 'parent_id', 'title', 'email', 'street', 'mobile']); //fields
        inParams.push(0); //offset
        inParams.push(5); //limit
        var params = [];
        params.push(inParams);
        await OdooService.execute_kw('res.partner', 'search_read', params, (err, value) => {
            if (err) {
                return console.log(err);
            }
            res.send(value[0])
        });
    })

    app.post('/updatePartner', async (req, res) => {
        console.log(req.body)
        var inParams = [];
        inParams.push([req.body.partner.id]); //id to update
        inParams.push({
            'name': req.body.partner.nombre,
            'email': req.body.partner.email,
            'mobile': req.body.partner.celular,
            'street': req.body.partner.direccion,
        })
        var params = [];
        params.push(inParams);
        await OdooService.execute_kw('res.partner', 'write', params, (err, value) => {
            if (err) {
                return console.log(err);
            }
            console.log(value)
            res.send(value)
        });
    })

    app.get('/getStudents', async (req, res) => {
        console.log(req.query.id)
        var inParams = [];
        inParams.push([
            ['parent_id', '=', Number(req.query.id)],
            ['title', '=', 10]
        ]);
        inParams.push(['name', 'country_id', 'comment', 'parent_id', 'title', 'email', 'street', 'mobile']); //fields
        inParams.push(0); //offset
        inParams.push(5); //limit
        var params = [];
        params.push(inParams);
        await OdooService.execute_kw('res.partner', 'search_read', params, (err, value) => {
            if (err) {
                return console.log(err);
            }
            console.log(value)
            res.send(value)
        });
    })

}