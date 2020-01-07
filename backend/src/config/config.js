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
    },
    neptuno: {
        NPT_HOST: "ifei.c8zjpampcvnx.us-east-1.rds.amazonaws.com",
        NPT_USER: "ebroot",
        NPT_PASSWORD: "NewIfei62",
        NPT_DB: "ifei"
    }

};