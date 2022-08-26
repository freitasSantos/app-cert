const {controller} = require('../../services/util/controller')
const {status} = require('../../services/util/http')
const UUID = require('uuid')

const {Certificate} = require('../../DAL/models')

exports.middleware = []

exports.handdler = controller(async(req,res)=>{
    const contextObject = {
        payload: req.body,
        transactionId: UUID.v4()
    }

    const resp = await Certificate.findAll()
    res.status(status.OK).json(resp) 
})