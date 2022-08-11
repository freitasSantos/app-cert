'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Certificates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ambiente:{
        type: Sequelize.STRING,
        validate:{
            isIn: {
                args: [['PRD', 'HML']],
                msg: "Must be PRD or HML"
            }
        }
    },
    origem:{
        type: Sequelize.STRING
    },
    proprietario:{ 
        type: Sequelize.STRING
    },
    proprietarioNome:{
        type: Sequelize.STRING
    },
    certificado:{
        type: Sequelize.STRING
    },
    funcionalidade:{   
        type: Sequelize.STRING
    },
    tipo:{
        type: Sequelize.STRING
    },
    emissao:{
        type: Sequelize.DATE 
    },
    validade:{
        type: Sequelize.DATE
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Certificates');
  }
};