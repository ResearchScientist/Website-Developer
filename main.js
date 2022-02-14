// const closeModal = document.getElementsByClassName('project-modal');
// console.log(closeModal);

// TAB TITLE

window.onfocus = function() {
  document.title = "Portfolio : Yay you're here";
}

window.onblur = function() {
  document.title = "Portfolio : Aw you left";
}

// 3D ILLUSTRATIONS

const rocket = document.getElementById('rocket');

rocket.addEventListener('click',rocketLaunch);

function rocketLaunch() {
  console.log('rocket launched');
}