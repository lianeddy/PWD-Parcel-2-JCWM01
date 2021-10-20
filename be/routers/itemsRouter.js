const express = require('express')
const { itemsController } = require('../controllers')
const routers = express.Router()

routers.get('/', itemsController.getData)
routers.get('/stock', itemsController.getStockItem)

module.exports = routers