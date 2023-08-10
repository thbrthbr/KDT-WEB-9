const express = require('express')
const router = express.Router()
const controller = require('../controller/Cstudent')

router.get('/', controller.main)

module.exports = router
