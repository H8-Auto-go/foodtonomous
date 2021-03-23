var CronJob = require('cron').CronJob;
let time = '15.23'

let [hour, minute] = time.split(".")
let timeParsed = `* * * * * * `
var job = new CronJob(timeParsed, function() {
  
console.log('anjay');


}, null, true, 'Asia/Jakarta');
job.start();