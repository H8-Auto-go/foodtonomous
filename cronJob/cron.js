const {AutomationSchedule} = require('../models')
const CronJob = require('cron').CronJob;
// const time = [{automationId: 1, time: '16.17'}, {automationId: 2, time: '16.18'}]
// let index = 0
module.exports = function doSomething({id, time}, callback) {
  let [hour, minute] = time.split(".")
  let timeParsed = `${minute} ${hour} * * * `
  let job = new CronJob(timeParsed, async function() {
    const {userId, foodId, restaurantId} = await AutomationSchedule.findByPk(id)
    callback({status: 'pending', restaurantId, foodId, userId})
  }, null, true, 'Asia/Jakarta');
  job.start();
}
