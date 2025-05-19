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
// const scrollToAboutButton = document.getElementById('scroll-down-to-about');
const spaceportAnchor = document.querySelector('#spaceport-anchor');

mainNavigation.addEventListener('click',scrollStarField);

function scrollStarField(e) {
  var mainNavAnchor = e.target.dataset.mainnav;

  if (mainNavAnchor == 'about') {
    midField.style.transform = 'translateY(-2vh)';
    nearField.style.transform = 'translateY(-5vh)';
    setTimeout(cometStream,1000);
  }
  if (mainNavAnchor == 'projects') {
    midField.style.transform = 'translateY(-4vh)';
    nearField.style.transform = 'translateY(-10vh)';
    setTimeout(confirmBSGjump,2000);
    setTimeout(rocinanteStrafe,1000);
  }
  if (mainNavAnchor == 'resume') {
    midField.style.transform = 'translateY(-6vh)';
    nearField.style.transform = 'translateY(-15vh)';
  }
  if (mainNavAnchor == 'contact') {
    midField.style.transform = 'translateY(-8vh)';
    nearField.style.transform = 'translateY(-20vh)';
    prepSatellite();
  }
}

spaceportAnchor.addEventListener('click', scrollToAbout);

function scrollToAbout() {
  midField.style.transform = 'translateY(-2vh)';
  nearField.style.transform = 'translateY(-5vh)';
  setTimeout(cometStream,1000);
}

// COMET

const comet = document.querySelector('#comet-bubble');

function cometStream() {
  comet.classList.add('cometStream');
  setTimeout(() => {
    comet.classList.remove('cometStream');
  }, 2000);
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

// SHIP DISPLAY

const screenDisplay = document.querySelector('#display');

function disableDisplayButtons() {
  dradisButton.disabled = true;
  wheelButton.disabled = true;
  fluxCapacitorButton.disabled = true;
  punchItButton.disabled = true;
}

function enableDisplayButtons() {
  dradisButton.disabled = false;
  wheelButton.disabled = false;
  fluxCapacitorButton.disabled = false;
  punchItButton.disabled = false;
}

// BRIDGE BUTTONS

const dradisButton = document.querySelector('#dradis-button');
const computerButton = document.querySelector('#computer-button');
const phoneButton = document.querySelector('#phone-button');
const wheelButton = document.getElementById('wheel-button');
const fluxCapacitorButton = document.querySelector('#flux-capacitor-button');
const punchItButton = document.querySelector('#punch-it');
const engineButton = document.querySelector('#engine-button');
const vacuumTubesButton = document.querySelector('#vacuum-tubes-button');


function saySomething() {
  console.log('say something');
}

function doSomething() {
  console.log('do something');
}

function eatSomething() {
  console.log('eat something');
}

const insetButtonsFunctionSets = {
  // 'dradisButton': [func1a,func1b,func1c,func1d],
  // 'phoneButton': [func2a,func2b,func2c,func2d],
  // 'wheelButton': [func4a,func4b,func4c,unviewFrozenPlanete],
  // 'fluxCapacitorButton': [func5a,func5b,func5c,func5d],
  // 'punchItButton': [func6a,func6b,func6c,func6d],
  'engineButton': [eatSomething],
  'vacuumTubesButton': [saySomething,doSomething]
};

function updateInsetButtons(newInsetButtonsText) {
  removeInsetButtonsEventListeners();
  updateInsetButtonsNames(newInsetButtonsText)
}

function removeInsetButtonsEventListeners() {
  insetButton1.removeEventListener('click',updateTrajectoryAcademic);
  insetButton2.removeEventListener('click',updateTrajectorySkills);
  insetButton3.removeEventListener('click',updateTrajectoryLove);
  insetButton4.removeEventListener('click',resetTrajectories);
}

function updateInsetButtonsNames(newInsetButtonsText) {
  for (let i = 0; i < insetButtonsArray.length; i++) {
    currentInsetButton = insetButtonsArray[i];
    currentInsetButton.querySelector('p').textContent = newInsetButtonsText[i];
  }
}

function resetInsetButtonsNames() {
  for (let i = 0; i < insetButtonsArray.length; i++) {
    currentInsetButton = insetButtonsArray[i];
    currentInsetButton.querySelector('p').textContent = "ready";
  }
}

// engineButton.addEventListener('click', () => updateInsetButtonsEventListeners('engineButton'));
// vacuumTubesButton.addEventListener('click', () => updateInsetButtonsEventListeners('vacuumTubesButton'));

// SEQUENCE BUTTONS

const sequenceDisplay = document.querySelector('#sequence-display-section');
const sequenceMSGtxt = document.querySelector('#sequence-msg-txt');
const insetButtons = document.querySelector('#inset-buttons');
const insetButton1 = document.querySelector('#inset-button-1');
const insetButton2 = document.querySelector('#inset-button-2');
const insetButton3 = document.querySelector('#inset-button-3');
const insetButton4 = document.querySelector('#inset-button-4');
const insetButtonsArray = [insetButton1,insetButton2,insetButton3,insetButton4];
const sequences = {
  "1111": "When one is not enough.",
  "2222": "2 times the fun.",
  "4321": "Blast Off!"
};
const maxSequenceLength = 4;
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
      p.style['padding'] = '8px 0 0';
      p.style['color'] = 'rgb(175,175,225)';
      p.style['textShadow'] = 'none';
    })
    const insetButtonP = insetButton.querySelector('p');
    insetButtonP.style['filter'] = 'brightness(.9)';
    insetButtonP.style['borderTop'] = '2px solid var(--bridge-wall)';
    insetButtonP.style['borderBottom'] = '1px solid rgba(0,0,50,.8)';
    insetButtonP.style['boxShadow'] = 'none';
    insetButtonP.style['padding'] = '9px 0 0';
    insetButtonP.style['color'] = 'var(--text-blue)';
    insetButtonP.style['textShadow'] = '0 0 0px var(--text-blue), 0 0 2px var(--text-blue)';
    checkSequence(insetButton);
  }
}

function checkSequence(insetButton) {
  const sequenceNumber = insetButton.dataset.sequenceNumber;
  currentSequence.push(sequenceNumber);
  console.log(currentSequence);

  const currentSequenceString = currentSequence.join('');
  // const maxSequenceLength = Math.max(...Object.keys(sequences).map(seq => seq.length)); if I will be using different sized sequences

  for (const sequence in sequences) {
    if (currentSequenceString === sequence && currentSequence.length === maxSequenceLength) {
      sequenceMSGtxt.textContent = sequences[sequence];
      displaySequenceMSG();
      currentSequence = [];
    }
  }
  if (currentSequence.length >= maxSequenceLength) {
    console.log('invalid sequence');
    currentSequence = [];
  }
}

function displaySequenceMSG() {
  sequenceDisplay.classList.remove('unshow-sequence-display');
  sequenceDisplay.classList.add('show-sequence-display');
  setTimeout(() => {
    sequenceDisplay.classList.add('unshow-sequence-display');
    sequenceDisplay.classList.remove('show-sequence-display');
  }, 3000);
}

// DRADIS

// const dradisButton = document.querySelector('#dradis-button');
const dradisOnImg = document.querySelector('#dradis-on-img');

dradisButton.addEventListener('click',dradisContact);

function dradisContact() {
  disableDisplayButtons();
  let insetButtonsText = ["seek","find","evaluate","clear"];
  updateInsetButtons(insetButtonsText);
  dradisOnImg.classList.add('dradis-on');
  setTimeout(() => {
    dradisOnImg.classList.remove('dradis-on');
    resetInsetButtonsNames();
    enableDisplayButtons();
  }, 2000);
}

// COMPUTER

function magnifyComputer() {
  let insetButtonsText = ["quality","tests","models","clear"];
  updateInsetButtons(insetButtonsText);
}

computerButton.addEventListener('click',magnifyComputer);

// PHONE

// const phoneButton = document.querySelector('#phone-button');
const phoneLights = document.querySelectorAll('.phone-lights');

phoneButton.addEventListener('click',ringring);

function ringring() {
  ringOn();
  setTimeout(ringOff,400);
  setTimeout(ringOn,1400);
  setTimeout(ringOff,1800);
  let insetButtonsText = ["text","data vis","dialogue","clear"];
  updateInsetButtons(insetButtonsText);
}

function ringOn() {
  phoneLights.forEach((phoneLight,index) => {
    setTimeout(phoneLightOn,200*index,phoneLight);
  });
}

function ringOff() {
  phoneLights.forEach((phoneLight,index) => {
    setTimeout(phoneLightOff,200*index,phoneLight);
  });
}

function phoneLightOn(phoneLight) {
  phoneLight.style.opacity = "1";
}

function phoneLightOff(phoneLight) {
  phoneLight.style.opacity = "0";
}

// WHEEL BUTTON - DISPLAY PLANETE AND SKILLS

// const wheelButton = document.getElementById('avast-planete');
const shipWheelIMG = document.getElementById('ship-wheel-img');
const planeteFrozen = document.getElementById('planete-frozen');
const skills = document.querySelectorAll('.skills');
const planetCurves = document.querySelectorAll('.planet-curve');

wheelButton.addEventListener('click',viewFrozenPlanete);

function viewFrozenPlanete() {
  disableDisplayButtons();
  planeteFrozen.classList.remove('unshow-frozen-planete');
  shipWheelIMG.classList.add('ship-wheel-spin');
  setTimeout(() => {
    planeteFrozen.classList.add('show-frozen-planete');
    setTimeout(displaySkills,3000);
  }, 1000);
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
  shipWheelIMG.classList.remove('ship-wheel-spin');
  planeteFrozen.classList.add('unshow-frozen-planete');
  planeteFrozen.classList.remove('show-frozen-planete');
  skills.forEach((skill) => {
    skill.classList.remove('show-skills');
  });
  planetCurves.forEach((planetCurve) => {
    planetCurve.classList.remove('animate-planet-curve');
  });
  setTimeout(resetInsetButtonsNames,3000);
  setTimeout(enableDisplayButtons,3000);
}

// FLUX CAPACITOR

// const fluxCapacitorButton = document.querySelector('#flux-capacitor');
const fluxCapacitorOnIMG = document.querySelector('#flux-capacitor-on-img');
const speedometerGlass = document.querySelector('#speedometer-glass');
const speedometerBox = document.querySelector('#speedometer-box');
const speedNumL = document.querySelector('#speed-num-L');
const speedNumR = document.querySelector('#speed-num-R');
const lightningLsvg = document.querySelector('#lightning-L-svg');
const lightningRsvg = document.querySelector('#lightning-R-svg');

fluxCapacitorButton.addEventListener('click',fluxIt);

function fluxIt() {
  console.log('Get to 88!');
  disableDisplayButtons();
  fluxCapacitorOnIMG.classList.add('flux-capacitor-on');
  setTimeout(showSpeedometer,500);
}

function showSpeedometer() {
  if (intervalID) {
    clearInterval(intervalID);
  }
  speed = 0;
  resetSpeedometerLights();
  resetDeloreanStream();
  speedometerGlass.classList.add('show-speedometer');
  setTimeout(speedMetronome,2200);
}

let speed = 0;
let intervalID;
let acceleration = 100;

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
      acceleration = 1000;
      break;
    case speed == 83:
      acceleration = 2000;
      break;
    case speed > 79:
      acceleration = 1000;
      break;
    case speed > 75:
      acceleration = 100;
      break;
    case speed == 75:
      acceleration = 500;
      // currentFunction = gear5;
      break;
    case speed > 65:
      acceleration = 250;
      break;
    case speed > 60:
      acceleration = 100;
      break;
    case speed == 60:
      acceleration = 500;
      // currentFunction = gear4;
      break;
    case speed > 45:
      acceleration = 200;
      break;
    case speed > 40:
      acceleration = 100;
      break;
    case speed == 40:
      acceleration = 500;
      // currentFunction = gear3;
      break;
    case speed > 35:
      acceleration = 150;
      break;
    case speed > 30:
      acceleration = 100;
      break;
    case speed == 30:
      acceleration = 500;
      // currentFunction = gear2;
      break;
    default:
      acceleration = 100;
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
  setTimeout(() => {
    lightningLsvg.classList.add('lightning-appear-L');
  }, 1200);
  setTimeout(() => {
    lightningRsvg.classList.add('lightning-appear-R');
  }, 1000);
  setTimeout(() => {
    speedometerBox.style.display = 'none';
    speedometerGlass.style.backgroundColor = 'var(--text-blue)';
  }, 2000);
  setTimeout(() => {
    speedometerGlass.classList.remove('show-speedometer');
    speedometerGlass.style.transform = 'translateY(-100%)';
    lightningLsvg.classList.remove('lightning-appear-L');
    lightningRsvg.classList.remove('lightning-appear-R');
    speedometerGlass.style.backgroundColor = 'rgba(0,0,50,.1)';
    speedometerBox.style.display = 'grid';
    deloreanStream();
  }, 2100);
}

function resetSpeedometerLights() {
  const spanL = speedNumL.querySelectorAll('span');
  const spanR = speedNumR.querySelectorAll('span');
  spanL.forEach(span => {
    span.style.filter = 'brightness(.25)';
  });
  spanR.forEach(span => {
    span.style.filter = 'brightness(.25)';
  });
}

// DELOREAN

const deloreanDIV = document.querySelector('#delorean-div');
const deloreanFlash = document.querySelector('#delorean-flash-img');

function deloreanStream() {
  deloreanDIV.classList.add('delorean-stream');
  deloreanFlash.classList.add('delorean-flash');
  setTimeout(showLights,3000);
}

function resetDeloreanStream() {
  deloreanDIV.classList.remove('delorean-stream');
  deloreanFlash.classList.remove('delorean-flash');
}

// TRAJECTORY LIGHTS

const trajectory = document.querySelector('#trajectory-items-section');
const trajectoryNames = trajectory.querySelectorAll('p');
const lightList = trajectory.getElementsByClassName('light');

function showLights() {
  setTimeout(() => {
    lightList[11].style.opacity = "1";
    lightList[10].style.opacity = "1";
  }, 0);
  setTimeout(() => {
    lightList[9].style.opacity = "1";
    lightList[8].style.opacity = "1";
  }, 50);
  setTimeout(() => {
    lightList[7].style.opacity = "1";
    lightList[6].style.opacity = "1";
  }, 100);
  setTimeout(() => {
    lightList[5].style.opacity = "1";
    lightList[4].style.opacity = "1";
  }, 150);
  setTimeout(() => {
    lightList[3].style.opacity = "1";
    lightList[2].style.opacity = "1";
  }, 200);
  setTimeout(() => {
    lightList[1].style.opacity = "1";
    lightList[0].style.opacity = "1";
  }, 250);
  setTimeout(showTrajectoryNames,800);
}

function showTrajectoryNames() {
  trajectoryNames.forEach(name => {
    name.style.opacity = '1';
  });
  updateButtonNames();
  strobeLights();
}

function strobeLights() {
  for (var i=0 ; i < lightList.length ; i++) {
    lightList[i].classList.add('lights-strobe');
  }
}

// TRAJECTORY NAMES

const trajectoryGroupName = document.querySelector('#trajectory-group-name');
const academicArray = ['mentoring','self-learning','Ph.D. Cog Sci','M.S. HCI','B.A. Linguistics','B.S. Cognitive Science'];
const skillsArray = ['Virtual Reality','3D Animation','3D Modeling','2D Animation','2D Illustration','Micro-Interactions'];
const loveArray = ['coffee','gelato','chocolate','cats','sailing','dancing'];
let nameList = document.getElementsByClassName('tn');

function updateButtonNames() {
  let insetButtonsText = ["Academic","Skills","Love","clear"];
  updateInsetButtonsNames(insetButtonsText);
  updateInsetButtonsToTrajectories();
}

function updateInsetButtonsToTrajectories() {
  insetButton1.addEventListener('click',updateTrajectoryAcademic);
  insetButton2.addEventListener('click',updateTrajectorySkills);
  insetButton3.addEventListener('click',updateTrajectoryLove);
  insetButton4.addEventListener('click',resetTrajectories);
}

function updateTrajectoryAcademic() {
  trajectoryGroupName.style.opacity = "1";
  trajectoryGroupName.textContent = "Academic Trajectory";
  for (var i=0 ; i < nameList.length ; i++) {
    nameList[i].textContent = academicArray[i];
  }
  trajectoryNameFade();
}

function updateTrajectorySkills() {
  trajectoryGroupName.style.opacity = "1";
  trajectoryGroupName.textContent = "Skills Trajectory";
  for (var i=0 ; i < nameList.length ; i++) {
    nameList[i].textContent = skillsArray[i];
  }
  trajectoryNameFade();
}

function updateTrajectoryLove() {
  trajectoryGroupName.style.opacity = "1";
  trajectoryGroupName.textContent = "Love Trajectory";
  for (var i=0 ; i < nameList.length ; i++) {
    nameList[i].textContent = loveArray[i];
  }
  trajectoryNameFade();
}

function resetTrajectories() {
  fluxCapacitorOnIMG.classList.remove('flux-capacitor-on');
  trajectoryGroupName.style.opacity = "0";
  trajectoryGroupName.textContent = "";
  trajectoryNames.forEach(name => {
    name.style.opacity = "0";
  });
  for (var i=0 ; i < lightList.length ; i++) {
    lightList[i].classList.remove('lights-strobe');
    lightList[i].style.opacity = "0";
  }
  removeInsetButtonsEventListeners();
  enableDisplayButtons();
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

// PUNCH IT

// const punchItButton = document.querySelector('#punch-it');
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
  disableDisplayButtons();
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
          setTimeout(moveHyperspeedLeverDown,1000);
          setTimeout(enableDisplayButtons,1000);
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

//  ENGINE

// const engineButton = document.querySelector('#engine-button');
const engineOnIMG = document.querySelector('#engine-on-img');

engineButton.addEventListener('click',checkEngine);

function checkEngine() {
  engineOnIMG.style.opacity = "1";
  let insetButtonsText = ["unit tests","diagnostics","treats","clear"];
  updateInsetButtonsNames(insetButtonsText);
  setTimeout(() => {
    engineOnIMG.style.opacity = "0";
  }, 2000);
}

//  VACUUM TUBES

// const vacuumTubesButton = document.querySelector('#vacuum-tubes-button');
const vacuumTubesOnIMG = document.querySelector('#vacuum-tubes-on-img');

vacuumTubesButton.addEventListener('click',lightUpVacuumTubes);

function lightUpVacuumTubes() {
  vacuumTubesOnIMG.style.opacity = "1";
  setTimeout(() => {
    vacuumTubesOnIMG.style.opacity = "0";
  }, 2000);
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

const telescope = document.getElementById('telescope-button');
const telescopeView = document.getElementById('telescope-view');
const galaxy = document.querySelector('#galaxy');

telescope.addEventListener('click',telescopePan);

function telescopePan() {
  if (telescopeView.className !== 'telescope-pan') {
    telescopeView.classList.add('telescope-pan');
    galaxy.classList.add('galaxy-rotate');
    ufoSurpriseLeave();
    setTimeout(resetTelescope,16500);
  }
}

function resetTelescope() {
  telescopeView.classList.remove('telescope-pan');
  galaxy.classList.remove('galaxy-rotate');
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

// TIE FIGHTER

const tiefighter = document.getElementById('tie-fighter');
const tiePanelL = document.querySelector('#tie-panel-L');
const tiePanelR = document.querySelector('#tie-panel-R');

function trySpinning () {
  tiefighter.classList.add('try-spinning');
  setTimeout(respin,2000);
}

function respin () {
  tiefighter.classList.remove('try-spinning');
}

tiefighter.addEventListener('click',trySpinning);

// X WING

const xcockpit = document.getElementById('x-cockpit');
const xwing = document.getElementById('x-wing');
const wing1 = document.getElementById('wing1');
const wing2 = document.getElementById('wing2');
const xWingLaserBlast = document.querySelector('#x-wing-laser-blast');

xwing.addEventListener('click',xwingAttack);

function xwingAttack() {
  xcockpit.style.fill = 'orange';
  wing1.classList.add('foils');
  wing2.classList.add('foils');
  setTimeout(() => {
    xWingLaserBlast.classList.add('x-wing-laser-blast');
  }, 1500);
  setTimeout(() => {
    tiePanelL.classList.add('tie-panel-apart-L');
    tiePanelR.classList.add('tie-panel-apart-R');
    tiefighter.classList.add('tie-fighter-poof');
  }, 2500);
  setTimeout(() => {
    wing1.classList.remove('foils');
    wing2.classList.remove('foils');
    halSaysHi();
  }, 3500);
}

// HAL

const hal = document.querySelector('#hal-ship');

function halSaysHi() {
  hal.classList.add('hal-says-hi');
  setTimeout(() => {
    hal.classList.add('hal-says-lets-go');
    xwing.classList.add('steam-rolled');
  }, 4000);
}

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

// BSG

const battlestar = document.querySelector('#battlestar');
const basestar = document.querySelector('#basestar');
let BSGjumped = false;

function confirmBSGjump() {
  if (BSGjumped == false) {
    bsgJump();
    BSGjumped = true;
  }
}

function bsgJump() {
  battlestar.classList.add('bsg-jump-in');
  setTimeout(() => {
    basestar.classList.add('bsg-jump-in');
  }, 3300);
  setTimeout(() => {
    battlestar.classList.add('bsg-jump-out');
    battlestar.classList.remove('bsg-jump-in');
    setTimeout(() => {
      basestar.classList.add('bsg-jump-out');
      basestar.classList.remove('bsg-jump-in');
    }, 1000);
  }, 4500);
  setTimeout(() => {
    battlestar.style.marginLeft = '2px';
    battlestar.style.marginBottom = 'calc(25dvh + 14px)';
    battlestar.style.gridColumn = '1/2';
    battlestar.style.justifySelf = 'flex-start';
    battlestar.classList.remove('bsg-jump-out');
    battlestar.classList.add('bsg-jump-in');
    setTimeout(() => {
      basestar.style.marginLeft = '75px';
      basestar.style.marginBottom = '25dvh';
      basestar.style.gridColumn = '1/2';
      basestar.style.justifySelf = 'flex-start';
      basestar.classList.remove('bsg-jump-out');
      basestar.classList.add('bsg-jump-in');
    }, 3300);
  }, 6000);
  setTimeout(() => {
    battlestar.classList.add('bsg-jump-out');
    battlestar.classList.remove('bsg-jump-in');
    setTimeout(() => {
      basestar.classList.add('bsg-jump-out');
      basestar.classList.remove('bsg-jump-in');
    }, 1000);
  }, 10300);
}

// ROCINANTE

const rocinanteBubble = document.querySelector('#rocinante-bubble');
const rocinante = document.querySelector('#rocinante');
const rocinantePlumeOuter = document.querySelector('#rocinante-plume-outer');
const rocinantePlumeInner = document.querySelector('#rocinante-plume-inner');

rocinante.addEventListener('click',flipAndBurn);

function rocinanteStrafe() {
  rocinanteBubble.classList.add('rocinante-strafe');
}

function flipAndBurn() {
  console.log('flip it');
  rocinantePlumeOuter.style.opacity = '0';
  rocinantePlumeInner.style.opacity = '0';
  rocinante.classList.add('flip-and-burn');
  setTimeout(() => {
    rocinantePlumeOuter.style.transform = 'rotate(90deg)';
    rocinantePlumeInner.style.transform = 'rotate(90deg)';
    rocinantePlumeOuter.style.marginBottom = '-64px';
    rocinantePlumeInner.style.marginBottom = '-54px';
    rocinantePlumeOuter.style.opacity = '1';
    rocinantePlumeInner.style.opacity = '1';
  }, 1500);
}

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

// ASTEROID SHIP

const asteroidShipBubble = document.querySelector('#asteroid-ship-bubble');
const asteroidShip = document.querySelector('#asteroid-ship-svg');
const asteroidShipThrust = document.querySelector('#asteroid-ship-thrust');
const asteroidShipPewPew1 = document.querySelector('#asteroid-ship-pew-pew-1');
const asteroidShipPewPew2 = document.querySelector('#asteroid-ship-pew-pew-2');
const asteroidShipPewPew3 = document.querySelector('#asteroid-ship-pew-pew-3');
const hullL = document.querySelector('#hull-L');
const hullR = document.querySelector('#hull-R');
const hullAft = document.querySelector('#hull-aft');

asteroidShip.addEventListener('click',blastAsteroids);

function blastAsteroids() {
  asteroidShip.classList.add('asteroid-ship-spin');
  asteroidShipPewPew1.classList.add('aspp1');
  asteroidShipPewPew2.classList.add('aspp2');
  setTimeout(() => {
    asteroidShipThrust.style.opacity = "1";
  }, 1500);
  setTimeout(() => {
    asteroidShipBubble.classList.add('asteroid-ship-move');
  }, 1700);
  setTimeout(() => {
    asteroidShipThrust.style.opacity = "0";
  }, 2200);
  setTimeout(() => {
    asteroidShip.classList.remove('asteroid-ship-spin');
    asteroidShip.classList.add('asteroid-ship-spin-out');
    asteroidShipPewPew3.classList.add('aspp3');
  }, 2200);
  setTimeout(() => {
    hullL.classList.add('hull-L-apart');
    hullR.classList.add('hull-R-apart');
    hullAft.classList.add('hull-AFT-apart');
  }, 6600);
}

// RESUME

const resumeInfoCards = document.querySelector('#resume-info-cards');
const resumeSectionBooks = document.querySelector('#resume-section-books');
const resumeSectionFilm = document.querySelector('#resume-section-film');
const resumeSectionHouse = document.querySelector('#resume-section-house');
const resumeSectionQuill = document.querySelector('#resume-section-quill');
const resumeSectionSailing = document.querySelector('#resume-section-sailing');
const booksButton = document.querySelector('#books-button');
const filmButton = document.querySelector('#film-button');
const houseButton = document.querySelector('#house-button');
const quillButton = document.querySelector('#quill-button');
const sailingButton = document.querySelector('#sailing-button');

booksButton.addEventListener('click',showBooks);
filmButton.addEventListener('click',showFilm);
quillButton.addEventListener('click',showQuill);
sailingButton.addEventListener('click',showSailing);
houseButton.addEventListener('click',showHouse);

function showBooks() {
  clearResumeDisplay();
  resumeSectionBooks.style.opacity = '1';
}

function showFilm() {
  clearResumeDisplay();
  resumeSectionFilm.style.opacity = '1';
}

function showHouse() {
  clearResumeDisplay();
  resumeSectionHouse.style.opacity = '1';
}

function showQuill() {
  clearResumeDisplay();
  resumeSectionQuill.style.opacity = '1';
}

function showSailing() {
  clearResumeDisplay();
  resumeSectionSailing.style.opacity = '1';
}

function clearResumeDisplay() {
  resumeInfoCards.style.opacity = '0';
  resumeSectionBooks.style.opacity = '0';
  resumeSectionFilm.style.opacity = '0';
  resumeSectionHouse.style.opacity = '0';
  resumeSectionQuill.style.opacity = '0';
  resumeSectionSailing.style.opacity = '0';
}