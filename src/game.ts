class Game {
  speed = 6;
  running = false;
  players: Player[] = [];
  intervalId = 0;

  constructor() {}

  init = (): void => {
    if (!DOM_SCORE_PLAYER_1 || !DOM_SCORE_PLAYER_2) return;

    const player1 = new Player(1, COLORS.player1.head, COLORS.player1.body, DOM_SCORE_PLAYER_1);
    const player2 = new Player(2, COLORS.player2.head, COLORS.player2.body, DOM_SCORE_PLAYER_2);

    this.players.push(player1);
    this.players.push(player2);

    // set playground heigth and width
    if (DOM_PLAYGROUND) {
      DOM_PLAYGROUND.style.height = PLAYGROUND_HEIGHT + 'px';
      DOM_PLAYGROUND.style.width = PLAYGROUND_WIDTH + 'px';
    }

    // initialize speed slider min/max values
    const speedKeys = Object.keys(SPEED_OPTIONS).map(Number);

    if (DOM_SLIDER) {
      DOM_SLIDER.min = Math.min(...speedKeys).toString();
      DOM_SLIDER.max = Math.max(...speedKeys).toString();
    }

    // set first speed
    updateSpeed();

    // draw first body
    drawBody(true);

    // initialization complete
    //pInit = false;
    this.running = true;
  };

  start = (): void => {
    gameInterval = setInterval(move, SPEED_OPTIONS[SPEED_INDEX]);
  };

  restart = (): void => {
    // remove end screen
    if (DOM_END_SCREEN) {
      DOM_END_SCREEN.style.display = 'none';
    }

    // reset body parts
    players.forEach((player) => player.init());

    this.init();

    // restart the game
    gameInterval = setInterval(move, getSpeedInMS(SPEED_OPTIONS[SPEED_INDEX]));
  };

  resetScore = (): void => {
    players.forEach((player) => player.resetScore());
  };

  storageSetSpeed = (): void => {
    sessionStorage.setItem(SESSION_STORAGE_SPEED_NAME, this.speed.toString());
  };

  static storageGetSpeed = (): number => parseInt(sessionStorage.getItem(SESSION_STORAGE_SPEED_NAME) || '0');
}

// types
type Coordinate = {
  top: number;
  left: number;
};

enum DIRECTION {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

// UTIL
//import { SESSION_STORAGE_SPEED_NAME, SESSION_STORAGE_SCORE_NAME } from './config';

const getSpeedInMS = (speed: keyof typeof SPEED_OPTIONS): number => SPEED_OPTIONS[speed];

const getOppositeDirection = (direction: DIRECTION): DIRECTION | null => {
  if (direction === DIRECTION.UP) return DIRECTION.DOWN;
  if (direction === DIRECTION.DOWN) return DIRECTION.UP;
  if (direction === DIRECTION.LEFT) return DIRECTION.RIGHT;
  if (direction === DIRECTION.RIGHT) return DIRECTION.LEFT;
  return null;
};

// CONFIG
export const SPEED_INDEX = Game.storageGetSpeed() === 0 ? 6 : Game.storageGetSpeed(); // initial speed is SPEED_OPTIONS[6] (50ms)
export const PLAYGROUND_HEIGHT = 800;
export const PLAYGROUND_WIDTH = 1000;
export const SPEED_OF_GROWTH = 10; // higher number means slower growth - snake will increase in size every SPEED_OF_GROWTH frames
export const PLAYER_SIZE = 10;

// IDs are speed slider values, values are milisecond values
export const SPEED_OPTIONS = {
  1: 100,
  2: 90,
  3: 80,
  4: 70,
  5: 60,
  6: 50,
  7: 40,
  8: 30,
  9: 20,
  10: 10,
};

export const SESSION_STORAGE_SPEED_NAME = 'speed';
export const SESSION_STORAGE_SCORE_NAME = 'Player_';

const INITIAL_BODY = {
  player1: [
    { top: 400, left: 700 },
    { top: 410, left: 700 },
    { top: 420, left: 700 },
    { top: 430, left: 700 },
    { top: 440, left: 700 },
    { top: 450, left: 700 },
    { top: 460, left: 700 },
  ],
  player2: [
    { top: 460, left: 300 },
    { top: 450, left: 300 },
    { top: 440, left: 300 },
    { top: 430, left: 300 },
    { top: 420, left: 300 },
    { top: 410, left: 300 },
    { top: 400, left: 300 },
  ],
};

const CONTROLS = {
  player1: {
    ArrowUp: DIRECTION.UP,
    ArrowDown: DIRECTION.DOWN,
    ArrowLeft: DIRECTION.LEFT,
    ArrowRight: DIRECTION.RIGHT,
  },
  player2: {
    KeyW: DIRECTION.UP,
    KeyS: DIRECTION.DOWN,
    KeyA: DIRECTION.LEFT,
    KeyD: DIRECTION.RIGHT,
  },
};

const COLORS = {
  player1: {
    head: 'rgb(218, 138, 0)',
    body: 'orange',
  },
  player2: {
    head: 'rgb(0, 185, 0)',
    body: 'green',
  },
};

const DOM_PLAYGROUND = document.getElementById('playground');
const DOM_SLIDER = document.getElementById('speed-slider') as HTMLInputElement;
const DOM_SCORE_PLAYER_1 = document.getElementById('score-player-1');
const DOM_SCORE_PLAYER_2 = document.getElementById('score-player-2');
const DOM_END_SCREEN = document.getElementById('end-screen');


//let isGameInitialized: boolean = false; // if true - players, game and everything else need to be initialized
let players: Player[] = []; // array with all player objects
let gameRunning: boolean = false;

let tick = 0;

class Player {
  playerId: number;
  private score: number;
  direction: DIRECTION;
  snake: Snake;
  controls;
  scoreBoardDomElement: HTMLElement;

  constructor(id: number, headColor: string, bodyColor: string, scoreBoardDomElement: HTMLElement) {
    this.playerId = id;
    this.score = 0;
    this.direction = id === 1 ? DIRECTION.UP : DIRECTION.DOWN;
    this.controls = id === 1 ? CONTROLS.player1 : CONTROLS.player2;

    const coordinates = this.playerId === 1 ? INITIAL_BODY.player1 : INITIAL_BODY.player2;
    this.snake = new Snake(coordinates, headColor, bodyColor);

    this.scoreBoardDomElement = scoreBoardDomElement;

    if (this.scoreBoardDomElement) {
      this.scoreBoardDomElement.style.color = bodyColor;
    }
  }

  init = (): void => {
    const coordinates = this.playerId === 1 ? INITIAL_BODY.player1 : INITIAL_BODY.player2;
    this.snake = new Snake(coordinates, this.snake.headColor, this.snake.bodyColor);

    this.resetScore();
  };

  setScore = (score: number): void => {
    this.score = score;
    sessionStorage.setItem(`${SESSION_STORAGE_SCORE_NAME}${this.playerId}`, this.score.toString());
    this.updateScoreBoard();
  };

  storageGetScore = (playerId: number): number => parseInt(sessionStorage.getItem(`${SESSION_STORAGE_SCORE_NAME}${playerId}`) || '0');

  updateScoreBoard = (): void => {
    if (this.scoreBoardDomElement) {
      this.scoreBoardDomElement.innerHTML = this.score.toString();
    }
  };

  resetScore = (): void => {
    this.setScore(0);
    this.updateScoreBoard();
  };

  move = (shrink: boolean): void => {
    this.snake.move(this.direction);

    if (shrink) {
      this.snake.removeTail();
    }
  };
}

class Snake {
  headColor: string;
  bodyColor: string;
  private bodyParts: DOMSnakePart[];

  constructor(coordinates: Coordinate[], headColor: string, bodyColor: string) {
    this.headColor = headColor;
    this.bodyColor = bodyColor;

    this.bodyParts = coordinates.map(
      (coordinate, index) => new DOMSnakePart(coordinate.top, coordinate.left, index === 0, headColor, bodyColor)
    );
  }

  addHead = (top: number, left: number): void => {
    const currentHead = this.bodyParts[0];

    // transform current head to body
    currentHead.setHead(false);

    const newHead = new DOMSnakePart(top, left, true, this.headColor, this.bodyColor);

    // add new head to the snake body
    this.bodyParts.unshift(newHead);
  };

  removeTail = (): void => {
    const tail = this.bodyParts[this.bodyParts.length - 1];

    tail.remove();

    // remove object from bodyParts array
    this.bodyParts.pop();
  };

  getHead = (): DOMSnakePart => this.bodyParts[0];

  move = (direction: DIRECTION): void => {
    const head = this.getHead();
    let top: number, left: number;

    switch (direction) {
      case DIRECTION.UP:
        if (head.top - PLAYER_SIZE < 0) {
          top = PLAYGROUND_HEIGHT - PLAYER_SIZE;
          left = head.left;
        } else {
          top = head.top - PLAYER_SIZE;
          left = head.left;
        }
        break;
      case DIRECTION.DOWN:
        if (head.top + PLAYER_SIZE > PLAYGROUND_HEIGHT - PLAYER_SIZE) {
          top = 0;
          left = head.left;
        } else {
          top = head.top + PLAYER_SIZE;
          left = head.left;
        }
        break;
      case DIRECTION.LEFT:
        if (head.left - PLAYER_SIZE < 0) {
          top = head.top;
          left = PLAYGROUND_WIDTH - PLAYER_SIZE;
        } else {
          top = head.top;
          left = head.left - PLAYER_SIZE;
        }
        break;
      case DIRECTION.RIGHT:
        if (head.left + PLAYER_SIZE > PLAYGROUND_WIDTH - PLAYER_SIZE) {
          top = head.top;
          left = 0;
        } else {
          top = head.top;
          left = head.left + PLAYER_SIZE;
        }
        break;
    }

    this.addHead(top, left);
  };
}

class DOMSnakePart {
  top: number;
  left: number;
  private isHead: boolean;
  private headColor: string;
  private bodyColor: string;
  private DOMElement: HTMLElement;

  constructor(top: number, left: number, isHead: boolean, headColor: string, bodyColor: string) {
    this.top = top;
    this.left = left;
    this.isHead = isHead;
    this.headColor = headColor;
    this.bodyColor = bodyColor;
    this.DOMElement = this.create(top, left, isHead);
  }

  create = (top: number, left: number, isHead: boolean): HTMLElement => {
    const snakePart = document.createElement('div');

    snakePart.style.position = 'absolute';
    snakePart.style.height = `${PLAYER_SIZE}px`;
    snakePart.style.width = `${PLAYER_SIZE}px`;
    snakePart.style.top = `${top}px`;
    snakePart.style.left = `${left}px`;
    snakePart.style.backgroundColor = isHead ? this.headColor : this.bodyColor;
    snakePart.setAttribute('id', `${top}-${left}`);

    // add new div to the playground div
    DOM_PLAYGROUND?.appendChild(snakePart);

    return snakePart;
  };

  remove = (): void => this.DOMElement.remove();

  setHead = (isHead: boolean): void => {
    this.isHead = isHead;

    // update DOM element color
    this.DOMElement.style.backgroundColor = this.isHead ? this.headColor : this.bodyColor;
  };
}

// TODO: class CanvasSnakePart {}
