const OrderController = require('../controllers/orderController');

const route = require('express').Router();

route.post('/', OrderController.addOrder)
route.get('/', OrderController.getOrder)
route.patch('/:id', OrderController.updateStatus)
route.delete('/:id', OrderController.deleteOrder)


module.exports = route