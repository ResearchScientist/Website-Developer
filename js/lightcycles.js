export class LightCyclesGame {
  constructor() {
    // GRID SETUP
    this.canvas = document.getElementById('lightcycles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 10;
    this.gridWidth = this.canvas.width / this.gridSize;
    this.gridHeight = this.canvas.height / this.gridSize;
    this.lightcyclesInfo = document.getElementById('lightcycles-info');
    // ROUND COUNTDOWN
    this.currentRound = 1;
    this.countdownActive = false;
    this.countdownValue = 3;
  }

  handleStartButtonClick() {
    if (this.countdownActive) {
      return;
    } else {
      this.startGame();
    }
  }

  startGame() {
    console.log('start game');
    this.lightcyclesInfo.style.opacity = 0;
  }
}