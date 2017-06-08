'use strict'

const dashVal = {
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
var maxRpm = dashVal.maxRpm

var maxRpmWidth =  ( 100 / maxRpm ) * rpm / 100

var rpmDash = document.getElementById('rpm')

function rpmTest(rpm, maxRpm) {
  // console.log(rpmDash)
  rpmRise(rpm)
  document.addEventListener('change', function(rpm, maxRpm) {
    rpmDash.style.transform = "scaleX(" + maxRpmWidth + ")"
    console.log(maxRpmWidth)
    console.log(rpm)

  })
}


function rpmRise(rpm){
  document.addEventListener('DOMMouseScroll', function(e) {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))
    if( delta > 0 ){
      console.log(rpm++)
    }
    else{
        if(rpm < 0){
          rpm = 0
        }
        console.log(rpm--)
    }
  })
}
