const Joi = require('joi')

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

const validateValues = async(payload)=>{

    try{
        await schema.validateAsync(payload)
            return {status: 'done'}
    }catch(err){
        const errors = []
        err.details.map(detail =>{
            errors.push({
                title: detail.path[0],
                message: detail.message
            })
        })
        return {status:'error', error: errors}
    }
}

describe('validate body values',()=>{

    it('verify if the values are allowed', async()=>{
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
        const validateStatus = await validateValues(value1)
        expect(validateStatus.status).toBe('done')
    })

    it('return an error if have undefined values', async()=>{

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
        const validateStatus = await validateValues(value2)
        expect(validateStatus.status).toBe('error')
    })
})



