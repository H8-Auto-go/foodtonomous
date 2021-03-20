const express = require('express');
const errorHandler = require('./midlewares/errorHandler');
const route = require('./routes');
const cors = require('cors')
const app = express()
const PORT = 3000

app.get('/', (req, res, next) => {
    res.status(200).json({message: 'server is connected'})
})

app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// app.use(route)
app.use(errorHandler)
module.exports = app