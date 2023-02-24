const { resolve } = require('path');

require('dotenv').config({ path: resolve(__dirname, "../.env") })
const env = process.env

module.exports = env 
