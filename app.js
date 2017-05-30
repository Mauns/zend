'use strict'

const path = require('path')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const socketIo = require('socket.io')
const app = express()
const server  = require('http').Server(app)
const io = socketIo(server)
const pug = require('pug')

app.use(bodyParser.urlencoded({ extended: false } ));
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.get('/', function(req, res) {
    res.render('index.pug')
});

io.on('connection', (socket) => {
  console.log('connected!')
})

io.on('disconnect', (socket) => {
  console.log('disconnected!')
})

server.listen(3030)
