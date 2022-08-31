const express = require('express')

const router = express.Router()

const getHorario = require('../controllers/get')

router.post(
    '/certificate',
    getHorario.handdler)

module.exports = router
