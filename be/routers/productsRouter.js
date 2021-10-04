const express = require('express')
const { productsController } = require('../controllers')
const routers = express.Router()

routers.get('/get', productsController.getData)

module.exports = routers