const controller = require('../controller/videoController')
const express = require('express')
const router = express.Router()

router.get('/:room' , controller.index)

module.exports = router