const {AutomationSchedule} = require('../models')
const CronJob = require('cron').CronJob;
const time = [{automationId: 1, time: '14.28'}, {automationId: 2, time: '14.29'}]
let index = 0
module.exports = function doSomething(callback) {
  let [hour, minute] = time[index].time.split(".")
  let timeParsed = `${minute} ${hour} * * * `
  let job = new CronJob(timeParsed, async function() {
    const {userId, foodId, restaurantId} = await AutomationSchedule.findByPk(time[index].automationId)
    index++
    callback({status: 'pending', restaurantId, foodId, userId})
  }, null, true, 'Asia/Jakarta');
  job.start();
}
