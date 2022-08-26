const express = require('express')
const { handdler } = require('../controllers/get')

const router = express.Router()

const getHorario = require('../controllers/get')

router.get(
    '/certificate',
    getHorario.middleware,
    getHorario.handdler)

module.exports = router
