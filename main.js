// TAB TITLE

window.onfocus = function() {
  document.title = "Portfolio : Yay you're here";
}

window.onblur = function() {
  document.title = "Portfolio : Aw you left";
}

// ASTRONAUT ANIMATION

const astronaut = document.getElementById('astronaut');
const astronautText = document.getElementById('astronaut-dialogue-screen');

astronaut.addEventListener('click',astronautDialogue);

function astronautDialogue() {
  astronautText.textContent = 'hi';
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

const satellite = document.getElementById('satellite-3d');

satellite.addEventListener('click',satelliteBeam);

function satelliteBeam() {
  console.log('im a beam');
}
