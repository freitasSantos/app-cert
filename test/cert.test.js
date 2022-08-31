const {status} = require('../services/util/http')
const Joi = require('joi')

const {validateValues, verificaValidadeValueMaiorQueHoje, saveCertificate} = require('../services/middlewares/validateValues')

const schema = Joi.object({
    ambiente: Joi.any().valid('HML','PRD').required(),
    origem: Joi.string().required(),
    proprietario: Joi.string().required(),
    proprietarioNome: Joi.string().required(),
    certificado: Joi.string().required(),
    funcionalidade: Joi.string().required(),
    tipo: Joi.string().required(),
    emissao: Joi.date().required(),
    validade: Joi.date().greater(Joi.ref('emissao')).required()
}).options({ abortEarly: false })


const value2 = {
    ambiente:"HML",
    origem:"Interno",
    proprietario:"Rodrigo S.A.",
    proprietarioNome:"",
    certificado:"",
    funcionalidade:"Portal Web Site",
    tipo:"ICP - Brasil",
    emissao:"2022-08-10",
    validade:"2023-08-09"
}

const value1 = {
    ambiente:"HML",
    origem:"Interno",
    proprietario:"Rodrigo S.A.",
    proprietarioNome:"empresa S.A.",
    certificado:"SSL",
    funcionalidade:"Portal Web Site",
    tipo:"ICP - Brasil",
    emissao:"2022-08-10",
    validade:"2023-08-09"
}

const value3 = {
    ambiente:"HML",
    origem:"Interno",
    proprietario:"Rodrigo S.A.",
    proprietarioNome:"",
    certificado:"",
    funcionalidade:"Portal Web Site",
    tipo:"ICP - Brasil",
    emissao:"2022-08-10",
    validade:new Date() + 1
}

const value4 = {
    ambiente:"HML",
    origem:"Interno",
    proprietario:"Rodrigo S.A.",
    proprietarioNome:"empresa S.A.",
    certificado:"SSL",
    funcionalidade:"Portal Web Site",
    tipo:"ICP - Brasil",
    emissao:"2022-08-10",
    validade:new Date() - 1
}


describe('validate body values',()=>{

    it('verify if the values are allowed', async()=>{
        const validateStatus = await validateValues(value1,schema)
        expect(validateStatus.controller).toBe(true)
    })

    it('return an error if have undefined values', async()=>{
        const validateStatus = await validateValues(value2,schema)
        expect(validateStatus.controller).toBe(false)
    })

    it('verify if the validade value is more then today', async()=>{
        const date = new Date()
        date.setDate(date.getDate() + 1)
        const testVerificaSevalidadeEMaiorQUeHoje = await verificaValidadeValueMaiorQueHoje(date)// AAAA-MM-DD
        expect(testVerificaSevalidadeEMaiorQUeHoje.controller).toBe(true)
    })

    it('verify if the validade value is less then today', async()=>{
        const date = new Date()
        date.setDate(date.getDate() - 1)
        const testVerificaSevalidadeEMaiorQUeHoje = await verificaValidadeValueMaiorQueHoje(date) // AAAA-MM-DD
        expect(testVerificaSevalidadeEMaiorQUeHoje.controller).toBe(false)
    })
    it('verify if the validade value is equal today', async()=>{
        const date = new Date()
        const testVerificaSevalidadeEMaiorQUeHoje = await verificaValidadeValueMaiorQueHoje(date) // AAAA-MM-DD
        expect(testVerificaSevalidadeEMaiorQUeHoje.controller).toBe(false)
    })
})

describe('verify if the certificate is saved in DB', ()=>{

    it('save the certificate in DB with success', async()=>{
        const testeSalvaCertificadoNoDB = await saveCertificate(value1)
        expect(testeSalvaCertificadoNoDB.status).toBe(200)
    })

    it('save the certificate in DB with error', async()=>{
        const testeSalvaCertificadoNoDB = await saveCertificate(value2)
        expect(testeSalvaCertificadoNoDB.status).toBe(400)
    })

    it('save the certificate in DB with error - validade', async()=>{
        const testeSalvaCertificadoNoDB = await saveCertificate(value4)
        expect(testeSalvaCertificadoNoDB.status).toBe(400)
    })
})



