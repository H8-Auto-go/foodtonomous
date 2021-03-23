const AutomationScheduleController = require('../controllers/automationScheduleController');
const auth = require('../midlewares/auth');

const route = require('express').Router();

route.use(auth)
route.get('/', AutomationScheduleController.getAllSchedules)
route.post('/', AutomationScheduleController.addSchedule)
route.get('/:id', AutomationScheduleController.getOneSchedule)
route.patch('/:id', AutomationScheduleController.updateStatus)
route.delete('/:id', AutomationScheduleController.deleteSchedule)


module.exports = route
