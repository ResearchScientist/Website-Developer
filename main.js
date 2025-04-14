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
const scrollToAboutButton = document.getElementById('scroll-down-to-about');

mainNavigation.addEventListener('click',scrollStarField);

function scrollStarField(e) {
  var mainNavAnchor = e.target.dataset.mainnav;

  if (mainNavAnchor == 'about') {
    midField.style.transform = 'translateY(-2vh)';
    nearField.style.transform = 'translateY(-5vh)';
  }
  if (mainNavAnchor == 'projects') {
    midField.style.transform = 'translateY(-4vh)';
    nearField.style.transform = 'translateY(-10vh)';
  }
  if (mainNavAnchor == 'resume') {
    midField.style.transform = 'translateY(-6vh)';
    nearField.style.transform = 'translateY(-15vh)';
  }
  if (mainNavAnchor == 'contact') {
    midField.style.transform = 'translateY(-8vh)';
    nearField.style.transform = 'translateY(-20vh)';
  }
}

scrollToAboutButton.addEventListener('click', scrollToAbout);

function scrollToAbout() {
  midField.style.transform = 'translateY(-2vh)';
  nearField.style.transform = 'translateY(-5vh)';
}

// SHIP DOORS

const rocket = document.getElementById('rocket');
const shipSection = document.getElementById('ship-section');
const shipBridge = document.getElementById('ship-bridge');
const shipDoors = document.getElementById('ship-doors');
const shipDoorL = document.getElementById('ship-door-L');
const shipDoorR = document.getElementById('ship-door-R');
const shipDoorOverlayL = document.querySelector('#ship-door-button-overlay-L');
const shipDoorOverlayR = document.querySelector('#ship-door-button-overlay-R');
const shipDoorsActivateButton = document.getElementById('ship-doors-activate');
const shipExitButton = document.getElementById('ship-doors-exit');

let areShipDoorsUp = false;
let areShipDoorsOpen = false;

function lowerShipDoors() {
  shipDoors.classList.remove('ship-doors-up');
  shipDoors.classList.add('ship-doors-down');
  shipBridge.classList.remove('ship-doors-up');
  shipBridge.classList.add('ship-doors-down');
  shipSection.style.zIndex = '2';
}

rocket.addEventListener('click',lowerShipDoors);

function raiseShipDoors() {
  if (areShipDoorsOpen) {
    areShipDoorsOpen = false;
    shipDoorL.classList.add('ship-door-L-close');
    shipDoorR.classList.add('ship-door-R-close');
    shipDoorL.classList.remove('ship-door-L-open');
    shipDoorR.classList.remove('ship-door-R-open');
    shipDoorOverlayL.classList.add('ship-door-overlay-L-close');
    shipDoorOverlayR.classList.add('ship-door-overlay-R-close');
    shipDoorOverlayL.classList.remove('ship-door-overlay-L-open');
    shipDoorOverlayR.classList.remove('ship-door-overlay-R-open');
    shipDoorsActivateButton.textContent = 'OPEN';
    shipDoorsActivateButton.classList.remove('ship-door-sign-red');
    shipDoorsActivateButton.classList.add('ship-door-sign-green');
    setTimeout(() => {
      areShipDoorsUp = true;
      shipDoors.classList.add('ship-doors-up');
      shipDoors.classList.remove('ship-doors-down');
      shipBridge.classList.add('ship-doors-up');
      shipBridge.classList.remove('ship-doors-down');
      setTimeout(resetZindex,1000);
    }, 1000);
    return;
  }
  else if (areShipDoorsUp) {
    areShipDoorsUp = false;
    shipDoors.classList.add('ship-doors-down');
    shipDoors.classList.remove('ship-doors-up');
  }
  else
  areShipDoorsUp = true;
  shipDoors.classList.add('ship-doors-up');
  shipDoors.classList.remove('ship-doors-down');
  shipBridge.classList.add('ship-doors-up');
  shipBridge.classList.remove('ship-doors-down');
  setTimeout(resetZindex,1000);
}

function resetZindex() {
  shipSection.style.zIndex = '0';
}

shipExitButton.addEventListener('click',raiseShipDoors);
shipDoorsActivateButton.addEventListener('click',activateShipDoors);
shipDoorOverlayL.addEventListener('click',activateShipDoors);
shipDoorOverlayR.addEventListener('click',activateShipDoors);

function activateShipDoors() {
  areShipDoorsOpen = !areShipDoorsOpen;
  if(areShipDoorsOpen) {
    shipDoorL.classList.add('ship-door-L-open');
    shipDoorR.classList.add('ship-door-R-open');
    shipDoorL.classList.remove('ship-door-L-close');
    shipDoorR.classList.remove('ship-door-R-close');
    shipDoorOverlayL.classList.add('ship-door-overlay-L-open');
    shipDoorOverlayR.classList.add('ship-door-overlay-R-open');
    shipDoorOverlayL.classList.remove('ship-door-overlay-L-close');
    shipDoorOverlayR.classList.remove('ship-door-overlay-R-close');
    shipDoorsActivateButton.textContent = 'CLOSE';
    shipDoorsActivateButton.classList.remove('ship-door-sign-green');
    shipDoorsActivateButton.classList.add('ship-door-sign-red');
  }
  else {
    shipDoorL.classList.add('ship-door-L-close');
    shipDoorR.classList.add('ship-door-R-close');
    shipDoorL.classList.remove('ship-door-L-open');
    shipDoorR.classList.remove('ship-door-R-open');
    shipDoorOverlayL.classList.add('ship-door-overlay-L-close');
    shipDoorOverlayR.classList.add('ship-door-overlay-R-close');
    shipDoorOverlayL.classList.remove('ship-door-overlay-L-open');
    shipDoorOverlayR.classList.remove('ship-door-overlay-R-open');
    shipDoorsActivateButton.textContent = 'OPEN';
    shipDoorsActivateButton.classList.remove('ship-door-sign-red');
    shipDoorsActivateButton.classList.add('ship-door-sign-green');
  }
};

// SHIP BUTTONS

const screenDisplay = document.querySelector('#display');
const launchSequenceMsg = document.querySelector('#launch-sequence');

// SEQUENCE BUTTONS

const insetButtons = document.querySelector('#inset-buttons');
const launchSequence = ['4','3','2','1'];
let currentSequence = [];

insetButtons.addEventListener('click',activateInsetButton);

function activateInsetButton(e) {
  const insetButton = e.target.closest('button');
  if (insetButton) {
    const insetButtonsAllP = insetButtons.querySelectorAll('p');
    insetButtonsAllP.forEach(p => {
      p.style['filter'] = 'none';
      p.style['borderTop'] = '2px solid rgba(250,250,250,.2)';
      p.style['borderBottom'] = '2px solid rgba(0,0,50,.8)';
      p.style['boxShadow'] = '0px 1px 2px 0px rgba(0,0,0,.8)';
      p.style['padding'] = '6px 0 0';
      p.style['color'] = 'rgb(175,175,225)';
      p.style['textShadow'] = 'none';
    })
    const insetButtonP = insetButton.querySelector('p');
    insetButtonP.style['filter'] = 'brightness(.9)';
    insetButtonP.style['borderTop'] = '2px solid var(--bridge-wall)';
    insetButtonP.style['borderBottom'] = '1px solid rgba(0,0,50,.8)';
    insetButtonP.style['boxShadow'] = 'none';
    insetButtonP.style['padding'] = '7px 0 0';
    insetButtonP.style['color'] = 'var(--text-blue)';
    insetButtonP.style['textShadow'] = '0 0 0px var(--text-blue), 0 0 5px var(--text-blue)';
    checkSequence(insetButton);
  }
}

function checkSequence(insetButton) {
  const sequenceNumber = insetButton.dataset.sequenceNumber;
  currentSequence.push(sequenceNumber);
  console.log(currentSequence);
  if (currentSequence.length === launchSequence.length) {
    if (currentSequence.join('') === launchSequence.join('')) {
      launchSequenceMsg.style['display'] = 'inline';
      setTimeout(() => {
        launchSequenceMsg.style['display'] = 'none';
      }, 3000);
    }
    else {
      console.log('not launching');
    }
    currentSequence = [];
  }
}

// DISPLAY PLANETE AND SKILLS

const viewButton = document.getElementById('view-button');
const planeteFrozen = document.getElementById('planete-frozen');
const skills = document.querySelectorAll('.skills');
const planetCurves = document.querySelectorAll('.planet-curve');

viewButton.addEventListener('click',viewFrozenPlanete);

function viewFrozenPlanete() {
  viewButton.disabled = true;
  planeteFrozen.classList.remove('unshow-frozen-planete');
  planeteFrozen.classList.add('show-frozen-planete');
  setTimeout(displaySkills,3000);
}

function displaySkills() {
  skills.forEach((skill) => {
    skill.classList.add('show-skills');
  });
  setTimeout(planetCurvesAppear,6500);
}

function planetCurvesAppear() {
  planetCurves.forEach((planetCurve) => {
    planetCurve.classList.add('animate-planet-curve');
  });
  setTimeout(unviewFrozenPlanete,3000);
}

function unviewFrozenPlanete() {
  planeteFrozen.classList.add('unshow-frozen-planete');
  planeteFrozen.classList.remove('show-frozen-planete');
  skills.forEach((skill) => {
    skill.classList.remove('show-skills');
  });
  planetCurves.forEach((planetCurve) => {
    planetCurve.classList.remove('animate-planet-curve');
  });
  setTimeout(() => {
    viewButton.disabled = false;
  }, 3000);
}

// FLUX CAPACITOR

const fluxCapacitorButton = document.querySelector('#flux-capacitor');
const fluxCapacitorOnIMG = document.querySelector('#flux-capacitor-on-img');
const speedometerGlass = document.querySelector('#speedometer-glass');
const speedNumL = document.querySelector('#speed-num-L');
const speedNumR = document.querySelector('#speed-num-R');

fluxCapacitorButton.addEventListener('click',fluxIt);

function fluxIt() {
  console.log('Get to 88!');
  fluxCapacitorOnIMG.classList.toggle('flux-capacitor-on');
  setTimeout(showSpeedometer,500);
}

function showSpeedometer() {
  if (intervalID) {
    clearInterval(intervalID);
  }
  speed = 0;
  speedometerGlass.classList.add('show-speedometer');
  setTimeout(speedMetronome,2200);
}

let speed = 0;
let intervalID;
let acceleration = 200;

function speedMetronome() {
  speed++;
  updateSpeedometer(speed);

  // let currentFunction = () => {};

  switch (true) {
    case speed == 87:
      acceleration = 2000;
      break;
    case speed == 86:
      acceleration = 3000;
      break;
    case speed == 85:
      acceleration = 1500;
      break;
    case speed == 84:
      acceleration = 2000;
      break;
    case speed > 78:
      acceleration = 1000;
      break;
    case speed > 75:
      acceleration = 120;
      break;
    case speed == 75:
      acceleration = 500;
      // currentFunction = gear5;
      break;
    case speed > 65:
      acceleration = 500;
      break;
    case speed > 60:
      acceleration = 120;
      break;
    case speed == 60:
      acceleration = 500;
      // currentFunction = gear4;
      break;
    case speed > 45:
      acceleration = 300;
      break;
    case speed > 40:
      acceleration = 120;
      break;
      case speed == 40:
        acceleration = 500;
        // currentFunction = gear3;
        break;
    case speed > 35:
      acceleration = 200;
      break;
    case speed > 30:
      acceleration = 120;
      break;
    case speed == 30:
      acceleration = 500;
      // currentFunction = gear2;
      break;
    default:
      acceleration = 200;
      // currentFunction = gear1;
      break;
  }

  // currentFunction();

  if (speed >= 88) {
    clearInterval(intervalID);
    console.log('hold at 88');
    showLightning();
    speed = 0;
  }
  else {
    intervalID = setTimeout(speedMetronome,acceleration);
  }
}

function updateSpeedometer(speed) {
  const speedL = Math.floor(speed / 10);
  const speedR = speed % 10;
  const digitL = getDigitSegments(speedL);
  const digitR = getDigitSegments(speedR);
  const spanL = speedNumL.querySelectorAll('span');
  const spanR = speedNumR.querySelectorAll('span');

  spanL.forEach((span,index) => {
    if (digitL[index]) {
      span.style.filter = "brightness(1)";
    }
    else {
      span.style.filter = "brightness(.2)";
    }
  });

  spanR.forEach((span,index) => {
    if (digitR[index]) {
      span.style.filter = "brightness(1)";
    }
    else {
      span.style.filter = "brightness(.2)";
    }
  });
}

function getDigitSegments(digit) {
  const segments = [
    [1,0,1,1,1,1,1], // 0
    [0,0,0,0,0,1,1], // 1
    [1,1,1,0,1,1,0], // 2
    [1,1,1,0,0,1,1], // 3
    [0,1,0,1,0,1,1], // 4
    [1,1,1,1,0,0,1], // 5
    [1,1,1,1,1,0,1], // 6
    [1,0,0,0,0,1,1], // 7
    [1,1,1,1,1,1,1], // 8
    [1,1,1,1,0,1,1]  // 9
  ];
  return segments[digit];
}

function showLightning() {
  console.log("ligtning flash");
  setTimeout(() => {
    console.log('flash 1');
    
  }, 1000);
  setTimeout(() => {
    console.log('flash 2');
    
  }, 1000);
}

// PUNCH IT

const punchItButton = document.querySelector('#punch-it');
const punchItHandle = document.querySelector('#hyperjump-handle-img');
const punchiItHandleDown = document.querySelector('#hyperjump-handles-down-img');
const punchiItHandleUp = document.querySelector('#hyperjump-handles-up-img');

const starfieldSVG = document.querySelector('#display-starfield');
const paths = Array.from(starfieldSVG.querySelectorAll('path'));
const centerX = 8;
const centerY = 4.5;
const elongationFactor = 10;
const animationDuration = 1500;
let startTime;
let animationFrameId;
let animationPhase = 'elongate'; // 'elongate', 'color', 'reset'

punchItButton.addEventListener('click',punchIt);

function moveHyperspeedLeverUp() {
  punchItHandle.classList.add('punch-it');
  punchItHandle.classList.remove('un-punch-it');
  punchiItHandleDown.classList.add('hyperjump-down-hide');
  punchiItHandleDown.classList.remove('hyperjump-down-show');
  punchiItHandleUp.classList.add('hyperjump-up-show');
  punchiItHandleUp.classList.remove('hyperjump-up-hide');
}

function moveHyperspeedLeverDown() {
  punchItHandle.classList.add('un-punch-it');
  punchItHandle.classList.remove('punch-it');
  punchiItHandleDown.classList.remove('hyperjump-down-hide');
  punchiItHandleDown.classList.add('hyperjump-down-show');
  punchiItHandleUp.classList.remove('hyperjump-up-show');
  punchiItHandleUp.classList.add('hyperjump-up-hide');
}

function punchIt() {
  console.log('punched it');
  moveHyperspeedLeverUp();
  setTimeout(() => {
    if (!animationFrameId) {
      startTime = null;
      animationPhase = 'elongate';
      // Remove any existing color paths
      Array.from(starfieldSVG.querySelectorAll('path[stroke="lightblue"]')).forEach(path => path.remove());
      paths.forEach(path => {
        path.setAttribute('stroke', '#FAFAFA');
        path.style.strokeDasharray = '';
        path.style.strokeDashoffset = '';
      });
      animationFrameId = requestAnimationFrame(animateElongation);
    }
  }, 500);
}

function easeInSine(t) {
  return 1 - Math.cos((t * Math.PI) / 2);
}

function animateReset(timestamp) {
  if (!startTime) {
    startTime = timestamp;
  }
  const elapsed = timestamp - startTime;
  const progress = Math.min(1, elapsed / animationDuration);
  const easedProgress = easeInSine(progress);

  paths.forEach(path => {
    const originalCx = parseFloat(path.getAttribute('d').split(' ')[1]);
    const originalCy = parseFloat(path.getAttribute('d').split(' ')[2]);
    const originalEndX = originalCx + 0.001;
    const originalEndY = originalCy + 0.001;
    
    const currentEndX = parseFloat(path.getAttribute('d').split('L')[1].split(' ')[1]);
    const currentEndY = parseFloat(path.getAttribute('d').split('L')[1].split(' ')[2]);
    
    const intermediateX = currentEndX + (originalEndX - currentEndX) * easedProgress;
    const intermediateY = currentEndY + (originalEndY - currentEndY) * easedProgress;
    
    path.setAttribute('d', `M ${originalCx} ${originalCy} L ${intermediateX} ${intermediateY}`);
  });

  if (progress < 1) {
    animationFrameId = requestAnimationFrame(animateReset);
  } else {
    startTime = null;
    animationFrameId = null;
    animationPhase = 'elongate';
  }
}

function animateSingleLineColor(path) {
  // Create a clone of the path for the color animation
  const colorPath = path.cloneNode(true);
  colorPath.setAttribute('stroke', 'lightblue');
  colorPath.style.position = 'absolute';
  path.parentNode.appendChild(colorPath);

  const totalLength = path.getTotalLength();
  let repeatCount = 0;
  const repeatMax = 3;
  const animationDuration = 1000; // Duration for one color sweep
  let startTime;

  function animate(timestamp) {
    startTime = timestamp;

    function step(time) {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / animationDuration);

      // Animate from start to end
      colorPath.style.strokeDasharray = `${totalLength * progress} ${totalLength}`;
      colorPath.style.strokeDashoffset = '0';

      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (repeatCount < repeatMax - 1) {
        repeatCount++;
        requestAnimationFrame(animate); // Start the next repeat
      } else {
        // Remove the color path when animation is complete
        colorPath.remove();
        
        // Check if this is the last path to complete animation
        const remainingAnimations = Array.from(starfieldSVG.querySelectorAll('path')).some(p => 
          p.getAttribute('stroke') === 'lightblue'
        );
        if (!remainingAnimations) {
          animationPhase = 'reset';
          startTime = null;
          animationFrameId = requestAnimationFrame(animateReset);
          setTimeout(moveHyperspeedLeverDown,1000)
          // setTimeout(() => {
          //   console.log('animation finish 1');

          // }, 1000);
        }
      }
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(animate);
}

function animateElongation(timestamp) {
  if (!startTime) {
    startTime = timestamp;
  }
  const elapsed = timestamp - startTime;
  const progress = Math.min(1, elapsed / animationDuration);
  const easedProgress = easeInSine(progress);

  paths.forEach(path => {
    const originalCx = parseFloat(path.getAttribute('d').split(' ')[1]);
    const originalCy = parseFloat(path.getAttribute('d').split(' ')[2]);
    const strokeWidth = parseFloat(path.getAttribute('stroke-width'));

    const deltaX = originalCx - centerX;
    const deltaY = originalCy - centerY;

    const finalX = centerX + deltaX * elongationFactor;
    const finalY = centerY + deltaY * elongationFactor;

    const intermediateX = originalCx + (finalX - originalCx) * easedProgress;
    const intermediateY = originalCy + (finalY - originalCy) * easedProgress;

    path.setAttribute('d', `M ${originalCx} ${originalCy} L ${intermediateX} ${intermediateY}`);
  });

  if (progress < 1) {
    animationFrameId = requestAnimationFrame(animateElongation);
  } else {
    startTime = null;
    animationPhase = 'color';
    // Start color animation for each path
    paths.forEach(path => animateSingleLineColor(path));
  }
}

// TOOLBOX BUTTON

const toolboxButton = document.querySelector('#toolbox-button');
const toolboxItems = document.querySelector('#toolbox-items');

toolboxButton.addEventListener('click',openToolbox);

function openToolbox() {
  toolboxItems.classList.toggle('show-toolbox-items');
  toolboxItems.classList.toggle('hide-toolbox-items');
}

// BIG RED BUTTON

const bigRedButton = document.getElementById('big-red-button');
const bigRedButtonHatch = document.getElementById('big-red-button-hatch');

bigRedButton.addEventListener('click',openHatch);

function openHatch() {
  bigRedButtonHatch.classList.add('open-hatch');
}

// NAVIGATION FOOTER TOP

const flexScrollTF = document.getElementById('flex-scroll-t-f');
const toFooter = document.getElementById('scroll-to-footer');
const toTop = document.getElementById('scroll-to-top');
const footerSection = document.getElementById('footer-section');

function mergeTopFoot() {
  toFooter.style['left'] = 'calc(50% - 50px)';
  toFooter.style['opacity'] = '0';
  toTop.style['left'] = 'calc(50% - 50px)';
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
  toTop.style['left'] = 'calc(100% - 100px)';
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
