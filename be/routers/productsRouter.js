const express = require('express')
const { productsController } = require('../controllers')
const routers = express.Router()

routers.get('/', productsController.getData)

module.exports = routers