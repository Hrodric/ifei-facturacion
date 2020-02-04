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
//Todo: implement dotenv in a correct way =>
//
//
// const dotenv = require('dotenv');
// dotenv.config();
//
// const dbHost = process.env.DB_HOST;
// const dbName = process.env.DB_NAME;
// const dbUsername = process.env.DB_USERNAME;
// const dbPassword = process.env.DB_PASSWORD;
// const dbPort = process.env.DB_PORT || 5432;
//
// module.exports = {
//     dev: {
//         username: dbUsername,
//         password: dbPassword,
//         database: dbName,
//         host: dbHost,
//         port: dbPort,
//         dialect: 'postgres'
//     },
//     prod: {
//         use_env_variable: 'DATABASE_URL',
//         username: dbUsername,
//         password: dbPassword,
//         database: dbName,
//         host: dbHost,
//         port: dbPort,
//         dialect: 'postgres'
//     }
// };