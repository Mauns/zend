'use strict'

const socket = io('/')
// const socket = io.connect('http://localhost');
socket.on('connect', () => {
  console.log('socket connected')
})



// Funpart!!!


var rpmDash = document.getElementById('rpm')
// var rpmDash2 = document.getElementById('rpm2')
// var rpmDot = document.getElementById('rpmDot')
var kmhDash = document.getElementById('kmh')

socket.on('basic', function (data) {

  // console.log('RPM: ' + data.dash.rpm)

  // RPM
  // Convert RPM to Percent
  let maxRpmWidth =  ( 100 / data.dash.maxRpm ) * data.dash.rpm
  rpmDash.style.transform = "scaleY(" + maxRpmWidth / 100 + ")"
  if(data.dash.rpm >= 5000){
    if(rpmDash.classList.contains('shift')) {

    }
    else{
      rpmDash.classList += ' shift'
    }
  }
  else{
    rpmDash.classList -= ' shift'
  }

  // KMH
  if(data.dash.kmh < 10){
    kmhDash.innerHTML = '00' + data.dash.kmh
  }
  else if(data.dash.kmh < 100){
    kmhDash.innerHTML = '0' + data.dash.kmh
  }
  else{
    kmhDash.innerHTML = data.dash.kmh
  }

  if(data.dash.kmh >= 100){
      if(kmhDash.classList.contains('speedSignal')){
      }
      else{
        kmhDash.classList += ' speedSignal'
      }
  }
  else{
    kmhDash.classList -= ' speedSignal'
  }


})
