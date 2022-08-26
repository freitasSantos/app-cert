require('dotenv').config()
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const connection =  new Sequelize(config.database, config.username, config.password, config);


module.exports = connection