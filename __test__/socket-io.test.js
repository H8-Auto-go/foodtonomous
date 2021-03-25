const io = require('socket.io-client')
const server = require('../bin/http')

describe('test soclet io', () => {
    // server.attach(3001)
    let socket


    beforeEach(done => {
        socket = io.connect('http://localhost:3000', {
            'reconnection delay': 0
            , 'reopen delay': 0
            , 'force new connection': true
        });
        socket.on('connect', function () {
            console.log('worked...');
            done();
        });
        socket.on('disconnect', function () {
            console.log('disconnected...');
        })
    })

    afterEach(function (done) {
        // Cleanup
        if (socket.connected) {
            console.log('disconnecting...');
            socket.disconnect();
        } else {
            // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
            console.log('no connection to break...');
        }
        done();

    });

    afterAll(function (done) {
        server.detach()
        done()
    })


    describe('create order',() => {
        test('order ', (done) => {
            const data = {
                "status": "pending",
                "userId": 1,
                "driverId": 1,
                "restaurantId": 2,
                "foodId": 4
            }
            socket.emit('create order', data)
            socket.on('create order',  order => {
                console.log(socket.id, '<<<<socketUserId')
                console.log(order);
              })
            done()
        })
    })
    describe('order confirmation', () => {
        test('confirmation', (done) => {
            const data = {
                "status": "on going restaurant",
                "userId": 1,
                "driverId": 1,
                "restaurantId": 2,
                "foodId": 4
            }
            socket.emit('order confirmation', data)
            socket.on('order confirmation', order => {
                console.log(order)
            })
            done()
        })
        
    })
})