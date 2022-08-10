require('dotenv').config()
const connectionString = process.env.DB_URL

const Sequelize = require('sequelize');

exports.sequelize = new Sequelize(connectionString, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);