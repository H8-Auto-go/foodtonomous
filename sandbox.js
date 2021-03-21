var CronJob = require('cron').CronJob;
let time = '15.23'

let [hour, minute] = time.split(".")
let timeParsed = `${minute} ${hour} * * * `
var job = new CronJob(timeParsed, function() {
  



}, null, true, 'Asia/Jakarta');
job.start();