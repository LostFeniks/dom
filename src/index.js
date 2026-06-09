import './style.css';
import goblinImage from './img/goblin.png';

export class Game {
  constructor(boardSize = 4, moveIntervalMs = 1000) {
    this.BOARD_SIZE = boardSize;
    this.MOVE_INTERVAL_MS = moveIntervalMs;
    this.TOTAL_CELLS = this.BOARD_SIZE * this.BOARD_SIZE;
    this.cells = [];
    this.currentPosition = null;
    this.goblin = null;
    this.intervalId = null;
  }

  init() {
    this.createBoard();
    this.createGoblin();
    this.startMoving();
  }

  createBoard() {
    const wrapper = document.querySelector('.game-board-wrapper');
    const board = document.createElement('div');
    board.className = 'game-board';
    board.style.gridTemplateColumns = `repeat(${this.BOARD_SIZE}, 1fr)`;

    for (let i = 0; i < this.TOTAL_CELLS; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      board.append(cell);
      this.cells.push(cell);
    }

    wrapper.append(board);
  }

  createGoblin() {
    this.goblin = document.createElement('img');
    this.goblin.src = goblinImage;
    this.goblin.alt = 'Goblin';
    this.goblin.className = 'goblin';
    
    const randomIndex = this.getRandomPosition();
    this.currentPosition = randomIndex;
    this.cells[randomIndex].append(this.goblin);
  }

  getRandomPosition() {
    return Math.floor(Math.random() * this.TOTAL_CELLS);
  }

  getRandomNewPosition() {
    let newPosition;
    do {
      newPosition = this.getRandomPosition();
    } while (newPosition === this.currentPosition);
    return newPosition;
  }

  moveGoblin() {
    const newPosition = this.getRandomNewPosition();
    this.cells[newPosition].append(this.goblin);
    this.currentPosition = newPosition;
  }

  startMoving() {
    this.intervalId = setInterval(() => {
      this.moveGoblin();
    }, this.MOVE_INTERVAL_MS);
  }

  stopMoving() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Запуск игры только в браузере, не в тестовой среде
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const game = new Game(4, 1000);
    game.init();
  });
}