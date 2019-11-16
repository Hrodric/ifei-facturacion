const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    odoo_prod: {
        url: 'http://ifei.moogah.com',
        port: '80',
        db: 'IFEI',
        username: 'api',
        password: 'api123'
    }

};