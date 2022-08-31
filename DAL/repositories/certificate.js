const sequelize = require('../../config/database')
const {Certificate} = require('../models')


exports.saveCertToDB = async(payload)=>{
    try{
        return await sequelize.transaction(async(t)=>{
            const certificate = await Certificate.create(payload,{transaction: t})
            return {certificate: certificate, controller: true}
        })
    }catch(err){
        return {
        controller: false,
        error: err
        }
    }
}