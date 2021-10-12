const express = require('express')
const { userController } = require('../controllers')
const routers = express.Router()

routers.post('/register', userController.register);

module.exports = routers