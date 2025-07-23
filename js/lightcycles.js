export class LightCyclesGame {
  constructor() {
    // GRID SETUP
    this.canvas = document.getElementById('lightcycles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 4;
    this.gridWidth = Math.floor(this.canvas.width / this.gridSize);
    this.gridHeight = Math.floor(this.canvas.height / this.gridSize);
    this.lightcyclesInfo = document.getElementById('lightcycles-info');
    // INFO SCREENS
    this.winnerSection = document.getElementById('winner-section');
    this.winner = document.getElementById('winner');
    this.roundWon = document.getElementById('round-won');
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

    this.npcInterval = this.changeNPCspeed();
  }

  changeNPCspeed() {
    switch (this.currentRound) {
      case 1: return 180;
      case 2: return 160;
      case 3: return 140;
      case 4: return 120;
      case 5: return 100;
      case 6: return 80;
      default: return 60;
    }
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

  isValidDirection(currentDir,nextDir) {
    const oppositeDirections = {
      'up': 'down',
      'down': 'up',
      'left': 'right',
      'right': 'left'
    };
    return oppositeDirections[currentDir] !== nextDir;
  }

  bindSpeedKeys() {
    document.addEventListener('keydown', (e) => {
      const speedKey = e.key.toLowerCase();
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
      const speedKey = e.key.toLowerCase();
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

  updateSpeed() {
    if (this.speedKeysHeld.f && this.speedKeysHeld.s) {
      this.userInterval = this.baseInterval;
    } else if (this.speedKeysHeld.f) {
      this.userInterval = this.fastInterval;
    } else if (this.speedKeysHeld.s) {
      this.userInterval = this.slowInterval;
    } else {
      this.userInterval = this.baseInterval;
    }
  }

  startGame() {
    this.lightcyclesInfo.style.opacity = 0;
    this.gameRunning = true;
    this.init();
    this.userPrevUpTime = 0;
    this.npcPrevUpTime = 0;
    this.gameLoop();
    const startGameButton = document.querySelector('#inset-button-1');
    startGameButton.disabled = true;
    console.log(`is game running : ${this.gameRunning}`);
  }

  gameLoop(currentTime = 0) {
    if (!this.gameRunning) return;
    if (currentTime - this.userPrevUpTime >= this.userInterval) {
      this.updateUser();
      this.userPrevUpTime = currentTime;
    }
    if (currentTime - this.npcPrevUpTime >= this.npcInterval) {
      this.updateNPCs();
      this.npcPrevUpTime = currentTime;
    }
    this.render();
    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  stopGameLoop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  updateUser() {
    if (!this.user.alive) return;
    const newPos = this.getNewPosition(this.user);
    if (this.checkCollision(newPos.x, newPos.y)) {
      this.user.alive = false;
      this.checkGameEnd();
      return;
    }
    this.user.x = newPos.x;
    this.user.y = newPos.y;
    this.user.trail.push({x: this.user.x, y: this.user.y});
    this.grid[this.user.y][this.user.x] = this.user;
  }

  updateNPCs() {
    const aliveLightcycles = this.lightcycles.filter(lightcycle => lightcycle.alive);
    if (aliveLightcycles.length <=1) {
      this.endGame();
      return;
    }
    [this.npc1,this.npc2].forEach(lightcycle => {
      if (!lightcycle.alive) return;
      this.updateAInpc(lightcycle);
      const newPos = this.getNewPosition(lightcycle);
      if (this.checkCollision(newPos.x,newPos.y)) {
        lightcycle.alive = false;
        this.checkGameEnd();
        return;
      }
      lightcycle.x = newPos.x;
      lightcycle.y = newPos.y;
      lightcycle.trail.push({x: lightcycle.x, y: lightcycle.y});
      this.grid[lightcycle.y][lightcycle.x] = lightcycle;
    });
  }

  updateAInpc(npc) {
    const directions = ['up','down','left','right'];
    const currentTime = Date.now();
    // CHANGE DIRECTION BETWEEN 1 AND 3 SECONDS
    if (currentTime - npc.deltaDirection < 1000 + Math.random() * 2000) {
      return;
    }
    const nextPos = this.getNewPosition(npc);
    if (this.checkCollision(nextPos.x, nextPos.y)) {
      const validDirections = directions.filter(dir => {
        if (!this.isValidDirection(npc.direction, dir)) return false;
        const testPos = this.getNewPosition({...npc,direction: dir});
        return !this.checkCollision(testPos.x, testPos.y);
      });
      if (validDirections.length > 0) {
        npc.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
        npc.deltaDirection = currentTime;
      }
    } else {
      if (Math.random() < 0.1) {
        const validDirections = directions.filter(dir => {
          if (!this.isValidDirection(npc.direction,dir)) return false;
          const testPos = this.getNewPosition({...npc, direction: dir});
          return !this.checkCollision(testPos.x, testPos.y);
        });
        if (validDirections.length > 0 && Math.random() < 0.3) {
          npc.direction = validDirections[Math.floor(Math.random() * validDirections.length)];
          npc.deltaDirection = currentTime;
        }
      }
    }
  }

  getNewPosition(lightcycle) {
    const directions = {
      'up': {x: 0, y: -1},
      'down': {x: 0, y: 1},
      'left': {x: -1, y: 0},
      'right': {x: 1, y: 0}
    };
    const dir = directions[lightcycle.direction];
    return {
      x: lightcycle.x + dir.x,
      y: lightcycle.y + dir.y
    };
  }

  checkCollision(x,y) {
    if (x < 0 || x >= this.gridWidth || y < 0 || y >= this.gridHeight) {
      return true;
    }
    return this.grid[y][x] !== 0;
  }

  checkGameEnd() {
    const aliveLightcycles = this.lightcycles.filter(lightcycle => lightcycle.alive);
    if (aliveLightcycles.length <= 1) {
      this.endGame();
    }
  }

  endGame() {
    this.gameRunning = false;
    this.stopGameLoop();
    const aliveLightcycles = this.lightcycles.filter(lightcycle => lightcycle.alive);
    if (aliveLightcycles.length === 0) {
      console.log("Jim! I'm a doctor not a gamer. But, yeah they're all derezed.");
    } else {
      const winner = aliveLightcycles[0];
      if (winner === this.user) {
        this.winnerSection.style.opacity = '1';
        this.winner.textContent = 'USER WINS';
        this.roundWon.textContent = `ROUND ${this.currentRound}`;
      }
    }
    const startGameButton = document.querySelector('#inset-button-1');
    startGameButton.disabled = false;
  }

  render() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.ctx.fillStyle = 'rgba(0,0,0,.5)';
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
    this.ctx.shadowBlur = 2;
    lightcycle.trail.forEach((segment, index) => {
      const opacity = lightcycle.alive ? 1 : 0.3;
      this.ctx.globalAlpha = opacity;
      if (index === lightcycle.trail.length - 1) {
        this.ctx.fillRect(
          segment.x * this.gridSize + .5,
          segment.y * this.gridSize + .5,
          this.gridSize - 1,
          this.gridSize - 1
        );
      } else {
        this.ctx.fillRect(
          segment.x * this.gridSize, // this.gridSize + 1
          segment.y * this.gridSize, // this.gridSize + 1
          this.gridSize, // this.gridSize - 2
          this.gridSize  // this.gridSize - 2
        );
      }
    });
    this.ctx.globalAlpha = 1;
    this.ctx.shadowBlur = 0;
  }
}