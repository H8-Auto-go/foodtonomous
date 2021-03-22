const app = require('../app')
const PORT = 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// const driversRoom = []
// const orderList = []
const OrderController = require('../controllers/OrderController')
io.on('connection', socket => {
  console.log('a driver is connected', socket.id)
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
  //   // console.log(clients, '<<<')
  //   // console.log(socket.join())
  // })
  socket.on('create order', async order => {
    console.log(socket.id, '<<<<socketUserId')
    const createdOrder = await OrderController.createOrder(order)
    // console.log(createdOrder)
    // orderList.push(order)
    // console.log(orderList)
    // console.log(createdOrder)
    socket.broadcast.emit("incoming order", createdOrder)
  })
  socket.on('order confirmation', async ({id, driverId}) => {
    console.log(socket.id, '<<< socketDriverId')
    const updatedOrder = await OrderController.addOrderDriver({id, driverId})
    socket.broadcast.emit("on going order", updatedOrder)
  })
  socket.on('order done', async ({status, id}) => {
    const updatedOrderStatus = await OrderController.updateStatus({status, id})
    socket.broadcast.emit('give a rating')
  })
});

http.listen(PORT, () => console.log(`server running on port:${PORT}`))
