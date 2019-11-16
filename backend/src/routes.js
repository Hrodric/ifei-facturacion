const Container = require("typedi").Container;
const OdooService = Container.get('OdooService');


module.exports = (app) => {


    app.get('/test_get', async (req, res) => {
        console.log(req);
        console.log('get ok');
        res.sendStatus(200)
    })

    app.post('/test_post', async (req, res) => {
        console.log(req);
        console.log('post ok');
        res.sendStatus(200)
    })



    app.get('/create_sale_orders', async (req, res) => {
        // this.cuentas = []
        // await NeptunoService.get_movimientos_del_mes(req.query, (err, result) => {
        //     if (err) {
        //         res.status(500).send(err)
        //         return
        //     }
        //     if (!result) {
        //         res.status(404).send({ message: "User not found" })
        //         return
        //     }

        //     this.cuentas = result
        // }).then(async () => {
        //     await OdooService.create_sale_orders(this.cuentas, (err, results) => {
        //         if (err) {
        //             res.status(500).send(err)
        //             return
        //         }
        //         if (!result) {
        //             res.status(404).send({ message: "User not found" })
        //             return
        //         }
        //     })
        // })
        // res.sendStatus(200)
    })

}