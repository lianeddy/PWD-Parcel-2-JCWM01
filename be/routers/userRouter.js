const express = require('express')
const { userController } = require('../controllers')
const routers = express.Router()

routers.post('/register', userController.register);
routers.post('/login', userController.login);

module.exports = routers