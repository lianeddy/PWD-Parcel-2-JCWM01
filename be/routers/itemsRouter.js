const express = require('express')
const { itemsController } = require('../controllers')
const routers = express.Router()

routers.get('/', itemsController.getData)

module.exports = routers