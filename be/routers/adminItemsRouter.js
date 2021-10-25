const express = require('express')
const { adminItemsController } = require('../controllers')
const routers = express.Router()

routers.get('/getitem', adminItemsController.getData)
routers.get('/page/:id1', adminItemsController.getPage)
routers.post('/additem', adminItemsController.addData)
routers.patch('/edititem/:id2', adminItemsController.editData)
routers.delete('/deletedata/:id3', adminItemsController.deleteData)

module.exports = routers