require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet');

const status = require('../services/util/http')
const error = require('../services/error')
const language = require('../services/language')

const connection = require('../config/database')

const routerCertificate = require('../api/routes/certificates')

const configExpress = () => {
  const app = express();
  app.use(cors())
  app.use(bodyParser.json())
  app.use(helmet());
  app.use(error())
  app.use(language())

  app.use(routerCertificate)

  app.use((_, res) => {
    res._rt_send_error(status.NOT_FOUND, 'NOT_FOUND')
})
  return app;
};

module.exports = connection.authenticate().then(configExpress)//teste da conexao com o db