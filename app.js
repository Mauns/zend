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
app.get('/perspective', function(req, res) {
    res.render('perspective.pug')
});

io.on('disconnect', (socket) => {
  console.log('disconnected!')
})

server.listen(3030)


function basic(socket) {
  socket.on('basic', (data) => {
    console.log(data)
  })
}




// lets goooooo! -----------------------------------------------------------------



var dashVal = {
  rpm: 0,
  maxRpm: 8500,
  kmh: 0,
  km: 0,
  fuel: 0,
  signals: {
    motor: false
  },
  motorTemp: 0,
  oilTemp: 0
}

var rpm = dashVal.rpm

// function rpmRise(rpm){
//   document.addEventListener('DOMMouseScroll', function(e) {
//     var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
//     if( delta > 0 ){
//       console.log(rpm++)
//     }
//     else{
//         if(rpm < 0){
//           rpm = 0
//         }
//         console.log(rpm--)
//     }
//   })
// }

// setInterval(function(data){
//   console.log(rpm++)
//   return
// }, 1000)

// const basicInfo = {
//   date: Date,
//   name: "Marvin",
//   rNumber: Math.floor(Math.random() * 6) + 1
// }
function test(){
  if(dashVal.rpm < 8500){
    dashVal.rpm += 80
  } else{
    dashVal.rpm = 0
  }
  if(dashVal.kmh < 230){
    dashVal.kmh += 1
  } else{
    dashVal.kmh = 0
  }
}

io.on('connection', (socket) => {
  console.log('connected!')

  setInterval(function(data) {

    // if (process.env.NODE_ENV === "development"){
      test()
    // }

    socket.emit('basic', { dash: dashVal })
  }, 25)
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
})
