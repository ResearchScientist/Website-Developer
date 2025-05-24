// SATELLITE ANIMATION

const imgSatellite = document.getElementById('satellite-3d');
const satelliteButton = document.getElementById('satellite-button');
const canvasSatellite = document.getElementById('canvas-satellite');
const ctx = canvasSatellite.getContext('2d');
const canvasSatellite_width = canvasSatellite.width = 460;
const canvasSatellite_height = canvasSatellite.height = 460;
const canvasSatellite_spriteframe = 460;
const canvasSatellite_frameSpeed = 2;
let canvasSatellite_frameX = 0;
let canvasSatellite_frameY = 0;
let canvasSatellite_currentFrame = 0;
let canvasSatellite_loaded = false;
let canvasSatellite_rotating = false;
let canvasSatellite_spritesheet;
let requestID;

function prepSatellite() {
  if (!canvasSatellite_loaded) {
    canvasSatellite_spritesheet = new Image();
    canvasSatellite_spritesheet.src = 'img/satellite-spritesheet.png';
    canvasSatellite_spritesheet.onload = function () {
      canvasSatellite_loaded = true;
      console.log('satellite sprite loaded');
    };
    canvasSatellite_spritesheet.onerror = function () {
      console.error('error loading satellite sprite');
    };
  } else {
    console.log('satellite sprite already loaded');
  }
}

function satelliteFlightCheck() {
  if (canvasSatellite_loaded && !canvasSatellite_rotating) {
    rotateSatellite();
    canvasSatellite_rotating = true;
    console.log('all systems go : begin rotation');
  } else if (!canvasSatellite_loaded) {
    console.log('no go : missing sprite');
  } else {
    console.log('rotation in progress');
  }
}

function rotateSatellite() {
  imgSatellite.style.visibility = 'hidden';
  ctx.clearRect(0,0,canvasSatellite_width,canvasSatellite_height);
  ctx.drawImage(canvasSatellite_spritesheet,canvasSatellite_frameX * canvasSatellite_spriteframe,canvasSatellite_frameY * canvasSatellite_spriteframe,canvasSatellite_spriteframe,canvasSatellite_spriteframe,0,0,canvasSatellite_spriteframe,canvasSatellite_spriteframe);
  
  if (canvasSatellite_currentFrame % canvasSatellite_frameSpeed == 0) {
    if (canvasSatellite_frameX < 59)
      canvasSatellite_frameX++;
    else {
      canvasSatellite_frameX = 0;
      canvasSatellite_rotating = false;
      cancelAnimationFrame(requestID);
      return;
    }
  }
  canvasSatellite_currentFrame++;
  requestAnimationFrame(rotateSatellite);
};

satelliteButton.addEventListener('click',satelliteFlightCheck);