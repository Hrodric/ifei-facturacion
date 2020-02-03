class OdooService {

    constructor() {

        var Odoo = require('odoo-xmlrpc');

        this.Odoo = new Odoo({
            url: process.env.ODOO_HOST,
            port: process.env.ODOO_PORT,
            db: process.env.ODOO_DB,
            username: process.env.ODOO_USERNAME,
            password: process.env.ODOO_PASSWORD
        });

        this.Odoo.connect(function (err) {
            if (err) {return console.log(err);}
            console.log('Connected to Odoo server.')
        });

        this.execute_kw = (model, action, params, cb) => {
            this.Odoo.execute_kw(model, action, params, function (err, results) {
                if ((err)) {cb('ERROR1: ' + JSON.stringify(err));
                return;
                }
                if ((!results)) {cb(null, []);
                return;
                }
                cb(null, results)
            });
        }
    }
}
module.exports = OdooService;