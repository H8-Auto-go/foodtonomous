const OrderController = require('../controllers/orderController');
const auth = require('../midlewares/auth');
const authorize = require('../midlewares/authorize');

const route = require('express').Router();

route.use(auth)


route.get('/:id', OrderController.getOrder)
route.get('/history', OrderController.getAllhistoryUser)
route.patch('/loc-update/:id', OrderController.patchLocation)
route.put('/:id', OrderController.addOrderDriver)
route.patch('/:id', OrderController.updateStatus)
route.delete('/:id', OrderController.deleteOrder)

    
module.exports = route
