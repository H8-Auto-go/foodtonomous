const OrderController = require('../controllers/orderController');
const auth = require('../midlewares/auth');

const route = require('express').Router();

route.use(auth)
route.post('/', OrderController.addOrder)
route.get('/', OrderController.getOrder)
route.patch('/:id', OrderController.updateStatus)
route.delete('/:id', OrderController.deleteOrder)


module.exports = route