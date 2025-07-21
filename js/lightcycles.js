class LightCyclesGame {
  constructor() {
    this.canvas = document.getElementById('lightcycles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 10;
    this.gridWidth = this.canvas.width / this.gridSize;
    this.gridHeight = this.canvas.height / this.gridSize;

    this.lightcyclesEventListeners();
  }
}