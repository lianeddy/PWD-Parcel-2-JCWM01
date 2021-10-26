const express = require('express')
const { cartController } = require('../controllers')
const routers = express.Router()

routers.post('/add', cartController.add)
routers.get('/', cartController.getCart)
routers.get('/count', cartController.countCategory)
routers.get(`/product`, cartController.getCartProduct)
routers.patch(`/remove`, cartController.remove)
routers.patch(`/addorder`, cartController.changeStatus)
routers.patch('/edit', cartController.editCart)
routers.patch('/return', cartController.returnStock)
routers.delete(`/`, cartController.delete)

module.exports = routers