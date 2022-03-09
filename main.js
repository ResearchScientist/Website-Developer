// TAB TITLE

window.onfocus = function() {
  document.title = "Portfolio : Yay you're here";
}

window.onblur = function() {
  document.title = "Portfolio : Aw you left";
}

// MAIN NAVIGATION UNDERLINE

const sectionProject = document.getElementById('projects');
const sectionContact = document.getElementById('contact');
const navigationHeader = document.querySelectorAll('#main-nav a');
const navigationSections = document.getElementsByClassName('navigation-section');

// console.log(navigationSections);

window.addEventListener('scroll',() => {
  let currentSection = '';
  Array.from(navigationSections).forEach( section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if(pageYOffset >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  })
  console.log(currentSection);
  
  Array.from(navigationHeader).forEach(a => {
    a.classList.remove('navigation-active');
    if(a.classList.contains(currentSection)) {
      a.classList.add('navigation-active');
    }
  })
  })

// ASTRONAUT DIALOGUE

const astronaut = document.getElementById('astronaut');
const astronautText = document.getElementById('astronaut-dialogue-screen');
const dialogue = [
  "Live long and prosper.",
  "This has happened before and it will happen again.",
  "Come with me if you want to live.",
  "This is the way.",
  "Allons-y!",
  "42",
  "It's a trap.",
  "In space, no one can hear you scream."
]

astronaut.addEventListener('click',astronautDialogue);

function astronautDialogue() {
  astronautText.textContent = dialogue[Math.floor(Math.random()*dialogue.length)];
  toggleDialogueScreen();
}

function toggleDialogueScreen() {
  if (astronautText.style.display === "block") {
    astronautText.style.display = "none";
  }
  else {
    astronautText.style.display = "block";
  }
}

// ROCKET ANIMATION

const rocket = document.getElementById('rocket');
const thrust = document.getElementById('thrust');

rocket.addEventListener('click',rocketLaunch);

function rocketLaunch() {
  thrust.classList.toggle('rocket-thrust');
}

// SATELLITE ANIMATION

const imgSatellite = document.getElementById('satellite-3d');
const canvasSatellite = document.getElementById('canvas-satellite');
const ctx = canvasSatellite.getContext('2d');
const canvasSatellite_width = canvasSatellite.width = 460;
const canvasSatellite_height = canvasSatellite.height = 460;
const canvasSatellite_spritesheet = new Image();
const canvasSatellite_spriteframe = 460;
let canvasSatellite_frameX = 0;
let canvasSatellite_frameY = 0;
let canvasSatellite_currentFrame = 0;
const canvasSatellite_frameSpeed = 2;

canvasSatellite_spritesheet.src = 'img/satellite-spritesheet.png';

// ctx.drawImage(canvasSatellite_spritesheet,0,0,canvasSatellite_spriteframe,canvasSatellite_spriteframe,0,0,canvasSatellite_spriteframe,canvasSatellite_spriteframe);

function rotateSatellite() {
  imgSatellite.style.visibility = 'hidden';
  ctx.clearRect(0,0,canvasSatellite_width,canvasSatellite_height);
  ctx.drawImage(canvasSatellite_spritesheet,canvasSatellite_frameX * canvasSatellite_spriteframe,canvasSatellite_frameY * canvasSatellite_spriteframe,canvasSatellite_spriteframe,canvasSatellite_spriteframe,0,0,canvasSatellite_spriteframe,canvasSatellite_spriteframe);
  
  if (canvasSatellite_currentFrame % canvasSatellite_frameSpeed == 0) {
    if (canvasSatellite_frameX < 59) canvasSatellite_frameX++;
    // else canvasSatellite_frameX = 0;
    else {
      canvasSatellite_frameX = 0;
      cancelAnimationFrame(requestID);
    }
  }
  canvasSatellite_currentFrame++;
  requestAnimationFrame(rotateSatellite);
};

// rotateSatellite();

canvasSatellite.addEventListener('click',rotateSatellite);

