const HistoryController = require('../controllers/historyController')
const auth = require('../midlewares/auth')

const route = require('express').Router()
// route.use(auth)
route.get('/history', HistoryController.getHistoryUser)
route.post('/history', HistoryController.addHistory)
route.delete('/history/', HistoryController.removeAllHistory)
module.exports = route
