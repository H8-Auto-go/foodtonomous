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
const UserController = require("../controllers/userControllers");


io.on('connection', async socket => {
  setInterval(async () => {
    const timeNow = new Date()
    const [hour, minute] = timeNow.toTimeString().slice(0, 5).split(':')
    let automationSchedules = await AutomationScheduleController.getForAutomation()
    // console.log(automationSchedules)
    const schedules = automationSchedules.sort((a, b) => a.time-b.time)
    for(const schedule of schedules) {
      const [hourInSchedule, minuteInSchedule] = schedule.time.split(".")
      // console.log(automationSchedules)
      // console.log(hourInSchedule, minuteInSchedule, hour, minute)
      if(hourInSchedule === hour && minuteInSchedule === minute) {
        // console.log(hour, minute, '<<<<< yeay jalan')
        //laptop gue gabisa dual emulator :((
        /**
         * 1. dapetin data user(buat dapetin saldo) dan food(buat dapetin harga makanan) dari
         * automationScheduleController
         * 2. cek apakah saldo user lebih besar dari pada harga makanan
         * 3. jika tidak: kirimkan emit ke user (kirim beserta userId nya di parameter kedua)
         * 4. jika iya: dapetin schedule yang saat ini sedang dilooping, ambil nilai restaurantId, foodId, dan
         * userId untuk membuat order
         * 5. kirim order tersebut ke client
         */

        // const schedule = automationSchedules.filter(schedule => schedule.id === id)[0]
        if(schedule.User.saldo>=schedule.Food.price) {
          // const {userId, foodId, restaurantId} = await AutomationSchedule.findByPk(schedule.id)
          const createdOrder = await OrderController.createOrder({
            status: 'pending',
            restaurantId: schedule.restaurant.id,
            foodId: schedule.food.id,
            userId: schedule.user.id
          })
          socket.broadcast.emit("incoming order", createdOrder)
        } else {
          socket.broadcast.emit("insufficent Balance", automationSchedules)
        }
      }
    }
  }, 5000)

  socket.on('create order', async order => {
    await createOrder(socket, order)
  })
  socket.on('order confirmation', async ({id, driverId}) => {
    console.log(socket.id, driverId, '<<< socketDriverId')
    const updatedOrder = await OrderController.addOrderDriver({id, driverId}, socket.id)
    socket.broadcast.emit("on going order", updatedOrder)
  })
  socket.on('order done', async ({status, id, driverId}) => {

    /**
     * 1. dapetin status order (ini harusnya done), kemudian dapetin orderId (untuk update statusnya ke database)
     * dan driverId (untuk nambahin saldo driver) !driverId masih undefined dari client
     * 2. di controller UserController.updateSaldo udah dibuat menjadi update saldo driver dan user
     * 3. jika sudah berikan rating ke user dan mungkin (fetch ulang)
     * @type {{driver: {name: *, location: any, id: *, saldo: number, avatar: *}, restaurant: {name: *, location: any, id: *, picture: *}, socketUserId: *, id: *, user: {name: *, location: any, id: *, saldo: *, avatar: *}, socketDriverId: *, food: {price: *, name: *, id: *, picture: *}, status: *}|undefined}
     */

    const order = await OrderController.updateStatus({status, id})

    await UserController.updateSaldo({userId: schedule.userId, driverId: schedule.automation.Driver.id, price: schedule.automation.Food.price})
    socket.broadcast.emit('give a rating')
  })
});

http.listen(PORT, () => console.log(`server running on port:${PORT}`))

/**
 * let automationSchedules = await AutomationScheduleController.getForAutomation()
 * const schedule = automationSchedules.filter(schedule => schedule.time === `${hour}.${minute}`)[0]
 * await UserController.updateSaldo({userId: schedule.userId, driverId: schedule.Driver.id, price:
 * schedule.Food.price})
 *
 */
// let order = await OrderController.getOrderDone(orderId)
// console.log(order, '??>?>?>?')
// console.log(order, driverId, '<<<')

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

/**
 * const schedule = automationSchedules.filter(schedule => schedule.time === `${hour}.${minute}`)[0]
 * if(schedule.User.saldo>=schedule.Food.price) {
 *
 * } else {
 *   socket.broadcast.emit("insufficent Balance", automationSchedules)
 * }
 */

// console.log('a driver is connected', socket.id)
// let automationSchedules;
// socket.on('set automation', async ({id, isActive}) => {
//   // console.log('dia kesini gitu?', id, isActive)
//   await AutomationScheduleController.updateRealtimeStatus({id, isActive})
//   automationSchedules = await AutomationScheduleController.getForAutomation()
// })
