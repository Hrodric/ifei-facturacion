const Container = require("typedi").Container;
const OdooService = Container.get('OdooService');


module.exports = (app) => {


    app.get('/testGet', async (req, res) => {
        console.log(req);
        console.log('get ok');
        res.sendStatus(200)
    })

    app.post('/testPost', async (req, res) => {
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

}