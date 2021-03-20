const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./midlewares/errorHandler');
const route = require('./routes');
const cors = require('cors')
const app = express()
const PORT = 3000


app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://amoswijaya:amos@cluster0.uflqt.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

app.use(route)
app.use(errorHandler)
module.exports = app