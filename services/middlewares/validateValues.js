const {status} = require('../util/http')
const {saveCertToDB} = require('../../DAL/repositories/certificate')
const {schema} = require('./schemaCertificate')
const validateValues = async(payload,schema)=>{
    try{
        await schema.validateAsync(payload)
            return {controller: true}
    }catch(err){
        const errors = []
        err.details.map(detail =>{
            errors.push({
                title: detail.path[0],
                message: detail.message
            })
        })
        return {controller:false,
                error: errors,
                status: status.BAD_REQUEST
            }
    }
}

const verificaValidadeValueMaiorQueHoje = async(payload)=>{
    const hoje = new Date()
    const validadeAjustada = new Date(payload)
    return (  validadeAjustada > hoje) ? {controller: true} : {controller: false, error: [{title: 'validade', message: 'Data de validade precisa ser maior que hoje'}]}
}

const saveCertificate = async(payload)=>{
    const controller = await validateValues(payload,schema)
    if (!controller.controller)
        return {status: status.BAD_REQUEST, response: controller.error}
    const verifyvalidate = await verificaValidadeValueMaiorQueHoje((payload.validade))
    if(!verifyvalidate.controller)
        return {status: status.BAD_REQUEST, response: verifyvalidate.error}
    const saveData = await saveCertToDB(payload)
    return saveData.controller? {status: status.OK, response: [saveData.certificate]}: {status: status.BAD_REQUEST, response: "save.error"}
}

module.exports ={validateValues, verificaValidadeValueMaiorQueHoje, saveCertificate}