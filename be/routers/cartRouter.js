const express = require('express')
const { cartController } = require('../controllers')
const routers = express.Router()

routers.post('/add', cartController.add)
routers.get('/', cartController.getCart)
routers.get('/count', cartController.countCategory)
routers.patch(`/remove`, cartController.remove)

module.exports = routers