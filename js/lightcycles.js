export class LightCyclesGame {
  constructor() {
    // GRID SETUP
    this.canvas = document.getElementById('lightcycles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 10;
    this.gridWidth = this.canvas.width / this.gridSize;
    this.gridHeight = this.canvas.height / this.gridSize;
    this.lightcyclesInfo = document.getElementById('lightcycles-info');
    // STATE
    this.gameRunning = false;
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

  init() {
    this.grid = Array(this.gridHeight).fill().map(() =>
    Array(this.gridWidth).fill(0));

    this.user = {
      x: Math.floor(this.gridWidth / 2),
      y: this.gridHeight - 4,
      direction: 'up',
      color: '#ffffff',
      trail: [],
      alive: true
    };

    this.npc1 = {
      x: Math.floor(this.gridWidth / 2) - 2,
      y: 3,
      direction: 'down',
      color: '#0080ff',
      trail: [],
      alive: true,
      deltaDirection: 0
    };

    this.npc2 = {
      x: Math.floor(this.gridWidth / 2) + 2,
      y: 3,
      direction: 'down',
      color: '#ff8000',
      trail: [],
      alive: true,
      deltaDirection: 0
    };

  }

  startGame() {
    this.lightcyclesInfo.style.opacity = 0;
    this.gameRunning = true;
    this.init();
    this.gameLoop();
    console.log(`is game running : ${this.gameRunning}`);
  }

  gameLoop(currentTime = 0) {
    if (!this.gameRunning) return;



    this.render();

    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }


  render() {
    this.ctx.fillStyle = 'rgba(0,0,0,0)';
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.strokeStyle = 'rgb(5,5,15)';
    this.ctx.lineWidth = 1;

    for (let i = 0; i <= this.gridWidth; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.gridSize, 0);
      this.ctx.lineTo(i * this.gridSize, this.canvas.height);
      this.ctx.stroke();
    }
    for (let i = 0; i <= this.gridHeight; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.gridSize);
      this.ctx.lineTo(this.canvas.width, i * this.gridSize);
      this.ctx.stroke();
    }
  }
}