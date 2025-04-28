// SATELLITE ANIMATION

const imgSatellite = document.getElementById('satellite-3d');
const canvasSatellite = document.getElementById('canvas-satellite');
const ctx = canvasSatellite.getContext('2d');
const canvasSatellite_width = canvasSatellite.width = 460;
const canvasSatellite_height = canvasSatellite.height = 460;
const canvasSatellite_spritesheet = new Image();
const canvasSatellite_spriteframe = 460;
const canvasSatellite_frameSpeed = 2;
let canvasSatellite_frameX = 0;
let canvasSatellite_frameY = 0;
let canvasSatellite_currentFrame = 0;
let canvasSatellite_rotating = false;

// document.addEventListener('DOMContentLoaded',prepSatellite);

canvasSatellite_spritesheet.src = 'img/satellite-spritesheet.png';

// function prepSatellite() {
//   canvasSatellite_spritesheet.src = 'img/satellite-spritesheet.png';
  console.log('satellite prepped');
// }

function rotateSatellite() {
  // let requestID;
  imgSatellite.style.visibility = 'hidden';
  ctx.clearRect(0,0,canvasSatellite_width,canvasSatellite_height);
  ctx.drawImage(canvasSatellite_spritesheet,canvasSatellite_frameX * canvasSatellite_spriteframe,canvasSatellite_frameY * canvasSatellite_spriteframe,canvasSatellite_spriteframe,canvasSatellite_spriteframe,0,0,canvasSatellite_spriteframe,canvasSatellite_spriteframe);
  
  if (canvasSatellite_currentFrame % canvasSatellite_frameSpeed == 0) {
    if (canvasSatellite_frameX < 59) canvasSatellite_frameX++;
    else {
      canvasSatellite_frameX = 0;
      cancelAnimationFrame(requestID);
    }
  }
  canvasSatellite_currentFrame++;
  requestAnimationFrame(rotateSatellite);
};

const throttleSatellite = (fun,delay) => {
  let priorTime = 0;
  return (...args) => {
    const currentTime = new Date().getTime();
    if (currentTime - priorTime < delay) return;
    priorTime = currentTime;
    fun(...args);
  }
}

canvasSatellite.addEventListener('click',throttleSatellite(rotateSatellite,2000));