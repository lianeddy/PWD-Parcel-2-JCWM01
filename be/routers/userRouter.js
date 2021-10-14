const express = require('express')
const { userController } = require('../controllers')
const routers = express.Router()

routers.post('/register', userController.register);
routers.post('/login', userController.login);
routers.put('/verified', userController.verifikasi);
routers.put('/reset', userController.reset);
routers.post('/sharereset', userController.share);

module.exports = routers