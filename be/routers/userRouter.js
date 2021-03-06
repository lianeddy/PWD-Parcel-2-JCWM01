const express = require('express')
const { userController } = require('../controllers')
const routers = express.Router()

routers.post('/register', userController.register);
routers.post('/login', userController.login);
routers.put('/verified', userController.verifikasi);
routers.put('/reset', userController.reset);
routers.post('/sharereset', userController.share);
routers.put('/updateprofile', userController.updateProfile);
routers.put('/updateprofileimage', userController.updateProfilImage);
routers.post('/getUser', userController.getUser);
routers.put('/resetafterlogin', userController.resetAfterLogin);

module.exports = routers