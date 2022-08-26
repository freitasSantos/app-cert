'use strict';

const UUID = require('uuid')

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Certificates', [{
    id: UUID.v4(),
    ambiente:"HML",
    origem:"Interno",
    proprietario:"Rodrigo S.A.",
    proprietarioNome:"",
    certificado:"SSL",
    funcionalidade:"Portal Web Site",
    tipo:"ICP - Brasil",
    emissao:"2022-08-10",
    validade:"2023-08-09",
    createdAt: new Date(),
    updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Certificates', null, {});
     
  }
};
