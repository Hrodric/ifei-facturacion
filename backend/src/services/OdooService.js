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
            if (err) {
                return console.log(err);
            }
            console.log('Connected to Odoo server.')
        })

        this.execute_kw = async (model, action, params) => {
            return new Promise((resolve, reject) => {
                this.Odoo.execute_kw(model, action, params, function (err, value) {
                    if (err) {
                        return console.log(err);
                    }
                    resolve(value)
                });
            })
        }

        this.isEmpty = (obj) => {
            for (var key in obj) {
                if (obj.hasOwnProperty(key))
                    return false;
            }
            return true;
        }

        this.asyncForEach = async (array, callback) => {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

    }

    async login(query) {

    }
}

module.exports = OdooService;