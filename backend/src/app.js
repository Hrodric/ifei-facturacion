const ora = require('ora');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
//const { sequelize } = require('./models')
const config = require('./config/config')

const spinner = ora({
    color: 'green',
    text: 'Starting up...'
}).start();

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const services = require('./services/Services')

require('./routes')(app)

// sequilize.sync()
//     .then(() => {

//     })

const http = require('http').Server(app)
http.listen(config.port, () => {

    spinner.succeed('Backend started on port: ' + config.port);

})