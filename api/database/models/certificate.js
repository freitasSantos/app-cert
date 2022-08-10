'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
Certificate.init({
    id:{
        type: Dataypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ambiente:{
        type: DataTypes.STRING,
        validate:{
            isIn: {
                args: [['PRD', 'HML']],
                msg: "Must be PRD or HML"
            }
        }
    },
    origem:{
        type: DataTypes.STRING
    },
    proprietario:{ 
        type: DataTypes.STRING
    },
    proprietarioNome:{
        type: DataTypes.STRING
    },
    certificado:{
        type: DataTypes.STRING
    },
    funcionalidade:{   
        type: DataTypes.STRING
    },
    tipo:{
        type: DataTypes.STRING
    },
    emissao:{
        type: DataTypes.DATE 
    },
    validade:{
        type: DataTypes.DATE
    }
},{
    sequelize,
    modelName: 'Certificate'
})
  return Certificate;
};