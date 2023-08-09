const express = require('express')
const router = express.Router()
const controller = require('../controller/C67')

router.get('/', controller.main)

router.post('/axios', controller.axiosPost)

module.exports = router
