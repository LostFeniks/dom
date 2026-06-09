// Мокаем импорты стилей и изображений
jest.mock('../src/style.css', () => ({}));
jest.mock('../src/img/goblin.png', () => 'mocked-image-path');

// Импортируем класс Game
const { Game } = require('../src/index');

describe('Game Class Tests', () => {
  let game;

  beforeEach(() => {
    // Создаем DOM элемент для тестов
    const wrapper = document.createElement('div');
    wrapper.className = 'game-board-wrapper';
    document.body.appendChild(wrapper);
    
    game = new Game(4, 1000);
  });

  afterEach(() => {
    if (game && game.intervalId) {
      game.stopMoving();
    }
    document.body.innerHTML = '';
  });

  test('Game should be defined', () => {
    expect(game).toBeDefined();
  });

  test('Game should have correct board size', () => {
    expect(game.BOARD_SIZE).toBe(4);
  });

  test('Game should have correct move interval', () => {
    expect(game.MOVE_INTERVAL_MS).toBe(1000);
  });

  test('Total cells should be 16', () => {
    expect(game.TOTAL_CELLS).toBe(16);
  });

  test('getRandomPosition should return number within range', () => {
    const position = game.getRandomPosition();
    expect(position).toBeGreaterThanOrEqual(0);
    expect(position).toBeLessThan(game.TOTAL_CELLS);
  });

  test('getRandomNewPosition should return different position', () => {
    game.currentPosition = 5;
    const newPosition = game.getRandomNewPosition();
    expect(newPosition).not.toBe(game.currentPosition);
  });

  test('createBoard should create correct number of cells', () => {
    game.createBoard();
    expect(game.cells.length).toBe(game.TOTAL_CELLS);
  });

  test('createGoblin should create goblin element', () => {
    game.createBoard();
    game.createGoblin();
    expect(game.goblin).toBeInstanceOf(HTMLImageElement);
    expect(game.goblin.alt).toBe('Goblin');
  });

  test('moveGoblin should change position', () => {
    game.createBoard();
    game.createGoblin();
    const oldPosition = game.currentPosition;
    game.moveGoblin();
    expect(game.currentPosition).not.toBe(oldPosition);
  });

  test('empty stub test', () => {
    expect(1).toBe(1);
  });
});