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

            let ret = {
                id: results[0].partner_id[0],
                nombre: results[0].partner_id[1],
                token: results[0].partner_id[0]
            };
            res.send(ret)
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
            ['id', '=', 45621],
        ]);
        inParams.push(['name', 'country_id', 'comment']); //fields
        inParams.push(0); //offset
        inParams.push(5); //limit
        var params = [];
        params.push(inParams);
        await OdooService.execute_kw('res.partner', 'search_read', params, (err, value) => {
            if (err) {
                return console.log(err);
            }
            console.log('---------------------------');
            console.log(value);
            res.send(value)
        });
    })

}