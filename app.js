const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./midlewares/errorHandler');
const route = require('./routes');
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

app.use(route)
app.use(errorHandler)
module.exports = app