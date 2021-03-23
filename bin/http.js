const app = require('../app')
const PORT = 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const {AutomationSchedule} = require('../models')

async function createOrder(socket, order) {
  const createdOrder = await OrderController.createOrder(order, socket.id)
  socket.broadcast.emit("incoming order", createdOrder)
}
const AutomationScheduleController = require('../controllers/automationScheduleController')
const OrderController = require('../controllers/OrderController')


io.on('connection', async socket => {
  // console.log('a driver is connected', socket.id)
  // let automationSchedules;
  // socket.on('set automation', async ({id, isActive}) => {
  //   // console.log('dia kesini gitu?', id, isActive)
  //   await AutomationScheduleController.updateRealtimeStatus({id, isActive})
  //   automationSchedules = await AutomationScheduleController.getForAutomation()
  // })

  setInterval(async () => {
    const timeNow = new Date()
    const [hour, minute] = timeNow.toTimeString().slice(0, 5).split(':')
    let automationSchedules = await AutomationScheduleController.getForAutomation()
    const schedules = automationSchedules.sort((a, b) => a.time-b.time)
    for(const {id, time} of schedules) {
      const [hourInSchedule, minuteInSchedule] = time.split(".")
      console.log(automationSchedules)
      console.log(hourInSchedule, minuteInSchedule, hour, minute)
      if(hourInSchedule === hour && minuteInSchedule === minute) {
        console.log(hour, minute, '<<<<< yeay jalan')
        const {userId, foodId, restaurantId} = await AutomationSchedule.findByPk(id)
        const createdOrder = await OrderController.createOrder({status: 'pending', restaurantId, foodId, userId})
        socket.broadcast.emit("incoming order", createdOrder)
      }
    }
  }, 60000)

  socket.on('create order', async order => {
    await createOrder(socket, order)
  })
  socket.on('order confirmation', async ({id, driverId}) => {
    console.log(socket.id, driverId, '<<< socketDriverId')
    const updatedOrder = await OrderController.addOrderDriver({id, driverId}, socket.id)
    socket.broadcast.emit("on going order", updatedOrder)
  })
  socket.on('order done', async ({status, id}) => {
    await OrderController.updateStatus({status, id})
    socket.broadcast.emit('give a rating')
  })
});

http.listen(PORT, () => console.log(`server running on port:${PORT}`))



// setTimeout(() => {
//   const dateNow = new Date()
//   const automationTime = await OrderController()
//   if(dateNow === '18.00') {
//     const {userId, restaurantId, foodId} = await AutomationC
// console.log('apakah ini keluar')ontroller.findByPk(automationId)
//     await createOrder(socket, {status: 'pending', userId, restaurantId, foodId})
//   } else {
//
//   }
// }, 60000)
// io.emit('hello', 'welcome to the club bro')
// socket.on('testing', message => {
//   console.log(message)
// })
// socket.on('driver login', driver => {
//   console.log('ini driver', driver);
//   // driversRoom.push({socketId: socket.id, driver, room: driver.role})
//   // console.log(driversRoom, '<<drivrom')
//   // socket.join(driver.role)
//   // let clients = io.sockets.adapter.rooms[driver.role]
//   // consolei.log(clients, '<<<')v
//   // console.log(socket.join())
// })

// socket.on('update location driver', async ({time, email, location}) => {
//   console.log('check setiap 3 detik', time)
//   // const updatedLocationDriver = OrderController.ppatchLocation({location: JSON.stringify(location)}, {where:{id}})
// })
