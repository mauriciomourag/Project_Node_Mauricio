const express = require('express')
const router = express.Router()

const infosController = require('../controller/infosController')

router.get('/',infosController.getInfos)

router.post('/add',infosController.addInfos)

router.put('/:id',infosController.updateInfos)

router.delete('/:id',infosController.removeInfos)

module.exports= router