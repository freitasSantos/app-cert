const UUID = require('uuid')
const { saveCertificate } = require('../../services/middlewares/validateValues')

exports.middleware = []

exports.handdler = async(req,res)=>{
    const contextObject = {
        payload: req.body,
        transactionId: UUID.v4()
    }
        await saveCertificate(contextObject.payload).then( resCert =>{
            const {status, controller, ...restData} = resCert
            res.status(status).json(restData)
        })
}