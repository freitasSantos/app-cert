const Joi = require('joi')

exports.schema = Joi.object({
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