const {sequelize,DataTypes} = require('sequelize')

module.exports = (sequelize, DataTypes) =>
    sequelize.define('Certificate',
    {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue:DataTypes.UUIDV4
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
    }
)