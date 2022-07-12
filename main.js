// TAB TITLE

window.onfocus = function() {
  document.title = "Portfolio : Yay you're here";
}

window.onblur = function() {
  document.title = "Portfolio : Aw you left";
}

// MAIN NAVIGATION UNDERLINE

const navigationSections = document.getElementsByClassName('navigation-section');
const sectionInView = { threshold: 0.5 };
let observer = new IntersectionObserver(navigationUnderline,sectionInView);

Array.from(navigationSections).forEach(section => {
  observer.observe(section);
});

function navigationUnderline(movingSections) {
  movingSections.forEach(movingSection => {
    const sectionName = movingSection.target.id;
    const activeNav = document.querySelector(`[data-mainNav=${sectionName}]`);
    activeNav.classList.add('navigation-inactive');
    activeNav.classList.remove('navigation-active');
    if (movingSection.isIntersecting) {
      activeNav.classList.add('navigation-active');
    }
  });
}

// STARFIELD SCROLL

const mainNavigation = document.getElementById('main-nav');
const midField = document.getElementById('mid-field');
const nearField = document.getElementById('near-field');

mainNavigation.addEventListener('click',scrollStarField);

function scrollStarField(e) {
  var mainNavAnchor = e.target.dataset.mainnav;

  if (mainNavAnchor == 'about') {
    console.log('yes its about');
    midField.style.transform = 'translateY(-2vh)';
    nearField.style.transform = 'translateY(-5vh)';
  }
  if (mainNavAnchor == 'projects') {
    console.log('yes its projects');
    midField.style.transform = 'translateY(-4vh)';
    nearField.style.transform = 'translateY(-10vh)';
  }
  if (mainNavAnchor == 'resume') {
    console.log('yes its resume');
    midField.style.transform = 'translateY(-6vh)';
    nearField.style.transform = 'translateY(-15vh)';
  }
  if (mainNavAnchor == 'contact') {
    console.log('yes its contact');
    midField.style.transform = 'translateY(-8vh)';
    nearField.style.transform = 'translateY(-20vh)';
  }
}

// NAVIGATION FOOTER TOP

const flexScrollTF = document.getElementById('flex-scroll-t-f');
const toFooter = document.getElementById('scroll-to-footer');
const toTop = document.getElementById('scroll-to-top');
const footerSection = document.getElementById('footer-section');

function mergeTopFoot() {
  toFooter.style['left'] = 'calc(50% - 35px)';
  toFooter.style['opacity'] = '0';
  toTop.style['left'] = 'calc(50% - 35px)';
  footerSection.dataset.footerview = 'active';
  setTimeout(moveTopFoot,1000);
}

function moveTopFoot() {
  flexScrollTF.style['transform'] = 'translate(0px,50px)';
  toFooter.style['display'] = 'none';
}

function backToTop() {
  toFooter.style['opacity'] = '1';
  toFooter.style['display'] = 'inline-block';
  toFooter.style['left'] = '0%';
  toTop.style['left'] = 'calc(100% - 75px)';
  flexScrollTF.style['transform'] = 'translate(0px,0px)';
  footerSection.dataset.footerview = 'inactive';
}

function starsToTop() {
  midField.style.transform = 'translateY(0vh)';
  nearField.style.transform = 'translateY(0vh)';
}

toFooter.addEventListener('click',mergeTopFoot);
mainNavigation.addEventListener('click',backToTop);
toTop.addEventListener('click',backToTop);
toTop.addEventListener('click',starsToTop);

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

// TELESCOPE VIEW ANIMATION

const telescope = document.getElementById('telescope');
const telescopeView = document.getElementById('telescope-view');

telescope.addEventListener('click',telescopePan);

function telescopePan() {
  if (telescopeView.className !== 'telescope-pan') {
    telescopeView.classList.add('telescope-pan');
    ufoSurpriseLeave();
    setTimeout(resetTelescope,16500);
  }
}

function resetTelescope() {
  telescopeView.classList.remove('telescope-pan');
  resetUfo();
}

// UFO ANIMATION

const ufo = document.getElementById('ufo');
const ufoBody = document.getElementById('ufo-body');
const exclamationMark = document.getElementById('exclamation-mark');
const beam = document.getElementById('beam');

function ufoSurpriseLeave() {
  ufo.classList.add('ufo-leave-ani');
  ufoBody.classList.add('ufo-body-ani');
  exclamationMark.classList.add('exclamation-mark-ani');
  beam.classList.add('beam-ani');
}

function resetUfo() {
  ufo.classList.remove('ufo-leave-ani');
  ufoBody.classList.remove('ufo-body-ani');
  exclamationMark.classList.remove('exclamation-mark-ani');
  beam.classList.remove('beam-ani');
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

function rotateSatellite() {
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

// TRAJECTORY LIGHTS

const trajectory = document.getElementById('trajectory-items');
const lightList = trajectory.getElementsByClassName('light');

function strobing() {
  for (var i=0 ; i < lightList.length ; i++) {
    lightList[i].classList.toggle('strobe');
  }
}

trajectory.addEventListener('click',strobing);

// TRAJECTORY NAMES

const academicButton = document.getElementById('academicButton');
const skillsButton = document.getElementById('skillsButton');
const loveButton = document.getElementById('loveButton');

const academicArray = ['mentoring','self-learning','Ph.D. Cog Sci (goal)','M.S. HCI (goal)','B.A. Linguistics','B.S. Cognitive Science'];
const skillsArray = ['Virtual Reality','3D Animation','3D Modeling','2D Animation','2D Illustration','Micro-Interactions'];
const loveArray = ['coffee','coffee','coffee','sailing','gelato','cats'];

let nameList = document.getElementsByClassName('tn');

function updateTrajectoryAcademic() {
  for (var i=0 ; i < nameList.length ; i++) {
    nameList[i].textContent = academicArray[i];
  }
  trajectoryNameFade();
}

function updateTrajectorySkills() {
  for (var i=0 ; i < nameList.length ; i++) {
    nameList[i].textContent = skillsArray[i];;
  }
  trajectoryNameFade();
}

function updateTrajectoryLove() {
  for (var i=0 ; i < nameList.length ; i++) {
    nameList[i].textContent = loveArray[i];
  }
  trajectoryNameFade();
}

function trajectoryNameFade() {
  for (var i=0 ; i < nameList.length ; i++) {
    nameList[i].classList.add('name-fade');
    setTimeout(resetFade,600)
  }
}

function resetFade() {
  for (var i=0 ; i < nameList.length ; i++) {
    nameList[i].classList.remove('name-fade');
  }
}

academicButton.addEventListener('click',updateTrajectoryAcademic);
skillsButton.addEventListener('click',updateTrajectorySkills);
loveButton.addEventListener('click',updateTrajectoryLove);

// X WING

const xwing = document.getElementById('x-wing');
const wing1 = document.getElementById('wing1');
const wing2 = document.getElementById('wing2');

function foil() {
  wing1.classList.toggle('foils');
  wing2.classList.toggle('foils');
}

xwing.addEventListener('click',foil);

// TIE FIGHTER

const tiefighter = document.getElementById('tie-fighter');

function trySpinning () {
  tiefighter.classList.add('try-spinning');
  setTimeout(respin,2000);
}

function respin () {
  tiefighter.classList.remove('try-spinning');
}

tiefighter.addEventListener('click',trySpinning);

// STARSHIP

const starship = document.getElementById('starship');
const dome = document.getElementById('dome');
const nacelle1 = document.getElementById('nacelle1');
const nacelle2 = document.getElementById('nacelle2');

function warp() {
  starship.classList.add('warp');
  dome.classList.add('warp-on');
  nacelle1.classList.add('warp-on','warp-signature');
  nacelle2.classList.add('warp-on','warp-signature');
  starship.removeEventListener('click',warp);
}

starship.addEventListener('click',warp);

// DALEK

const dalek = document.getElementById('dalek');
const tardis = document.getElementById('tardis');

function exterminate() {
  dalek.classList.add('exterminate');
  tardis.classList.add('materialisation');
  setTimeout(reexterminate,4000);
}

function reexterminate() {
  dalek.classList.remove('exterminate');
  tardis.classList.remove('materialisation');
}

dalek.addEventListener('click',exterminate);
