const app = require('../app')
const PORT = 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const OrderController = require('../controllers/orderController')
const DriverController = require('../controllers/driverController')

// async function createOrder(socket, order) {
//   const createdOrder = await OrderController.createOrder(order, socket.id)
//   socket.broadcast.emit("incoming order", createdOrder)
// }
io.on('connection', socket => {
  console.log('a driver is connected', socket.id)
  // doSomething(async (newOrder) => {
  //   const createdOrder = await OrderController.createOrder(newOrder)
  //   socket.broadcast.emit("incoming order", createdOrder)
  //   // socket.join('driver')
  //   // socket.to('driver').emit('incoming order', createdOrder)
  // })
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
  // })d

  // socket.on('update location driver', async ({time, email, location}) => {
  //   console.log('check setiap 3 detik', time)
  //   // const updatedLocationDriver = OrderController.ppatchLocation({location: JSON.stringify(location)}, {where:{id}})
  // })
  socket.on('create order', async order => {
    console.log(socket.id, '<<<<socketUserId')
  })
  socket.on('order confirmation', async ({id, driverId}) => {
    console.log(socket.id, '<<< socketDriverId')
    const updatedOrder = await OrderController.addOrderDriver({id, driverId}, socket.id)
    //harusnya dari sini udah mulai private, jadi code ini ada kemungkinan nantinya di 
    //find lagi
    socket.broadcast.emit("on going order", updatedOrder)
  })
  // socket.on('order done', async ({status, id}) => {
  //   const updatedOrderStatus = await OrderController.updateStatus({status, id})
  //   socket.broadcast.emit('give a rating')
  // })
});
exports.server =  http.listen(PORT, () => console.log(`server running on port:${PORT}`))
