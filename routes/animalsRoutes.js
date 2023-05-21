const express = require('express')
const router = express.Router()

const animalsController = require('../controller/animalsController')

router.get('/', animalsController.getAnimals)
router.post('/add', animalsController.addAnimals)
router.delete('/delete', animalsController.removeAnimals)

module.exports= router