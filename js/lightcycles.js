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
    // USER AND NPC UPDATES AS LINKED TO SPEED
    this.userInterval = 140;
    this.npcInterval = 140;
    this.baseInterval = 140;
    this.slowInterval = 240; // s key held
    this.fastInterval = 70;  // f key held
    this.speedKeysHeld = {
      s: false,
      f: false
    };
    // WHEN USER OR NPC WAS LAST UPDATED
    this.userPrevUpTime = 0;
    this.npcPrevUpTime = 0;
    // SCORES
    this.scores = {
      user: 0,
      npc1: 0,
      npc2: 0
    };
    // BIND KEYS
    this.bindDirectionKeys();
    this.bindSpeedKeys();
    this.animationId = null;
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

    this.lightcycles = [this.user, this.npc1, this.npc2];

    this.lightcycles.forEach(lightcycle => {
      lightcycle.trail = [{x: lightcycle.x, y: lightcycle.y}];
      this.grid[lightcycle.y][lightcycle.x] = lightcycle;
    });
  }

  bindDirectionKeys() {
    document.addEventListener('keydown', (e) => {
      if (!this.gameRunning) return;
      let newDirection = null;
      switch (e.key) {
        case 'ArrowUp':
          newDirection = 'up';
          break;
        case 'ArrowDown':
          newDirection = 'down';
          break;
        case 'ArrowLeft':
          newDirection = 'left';
          break;
        case 'ArrowRight':
          newDirection = 'right';
          break;
      }
      if (newDirection && this.isValidDirection(this.user.direction, newDirection)) {
        this.user.direction = newDirection;
      }
    });
  }

  bindSpeedKeys() {
    document.addEventListener('keydown', (e) => {
      const speedKey = e.speedKey.toLowerCase();
      if (speedKey === 's') {
        this.speedKeysHeld.s = true;
        this.updateSpeed();
      }
      if (speedKey === 'f') {
        this.speedKeysHeld.f = true;
        this.updateSpeed();
      }
    });
    document.addEventListener('keyup', (e) => {
      const speedKey = e.speedKey.toLowerCase();
      if (speedKey === 's') {
        this.speedKeysHeld.s = false;
        this.updateSpeed();
      }
      if (speedKey === 'f') {
        this.speedKeysHeld.f = false;
        this.updateSpeed();
      }
    });
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
    this.ctx.strokeStyle = 'rgba(25,50,75,0.2)';
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

    this.lightcycles.forEach(lightcycle => {
      this.drawLightcycle(lightcycle);
    });
  }

  drawLightcycle(lightcycle) {
    this.ctx.fillStyle = lightcycle.color;
    this.ctx.shadowColor = lightcycle.color;
    this.ctx.shadowBlur = 10;
  }

}