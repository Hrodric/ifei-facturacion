'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//Todo: baseURL: BACKEND_URL // http://ec2-3-82-149-140.compute-1.amazonaws.com:8082/


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BACKEND_URL: '"http://ec2-3-82-149-140.compute-1.amazonaws.com:8082/"'
});
