const app = require('../app')
const PORT = 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const driversRoom = []
const orderList = []
const OrderController = require('../controllers/OrderController')
io.on('connection', socket => {
  console.log('a driver is connected', socket.id)
  io.emit('hello', 'welcome to the club bro')
  // socket.on('testing', message => {
  //   console.log(message)
  // })
  socket.on('driver login', driver => {
    driversRoom.push({socketId: socket.id, driver, room: driver.role})
    // console.log(driversRoom, '<<drivrom')
    socket.join(driver.role)
    let clients = io.sockets.adapter.rooms[driver.role]
    // console.log(clients, '<<<')
    // console.log(socket.join())
  })
  socket.on('create order', async order => {
    console.log(order, '<<<<>>>')
    const createdOrder = await OrderController.createOrder(order)
    // console.log(createdOrder)
    // orderList.push(order)
    // console.log(orderList)
  })
  socket.emit("broadcast", "hello guys")
});

http.listen(PORT, () => console.log(`server running on port:${PORT}`))
