import { DIRECTION } from './types.js';

export const INITIAL_SPEED = 6; // initial speed is SPEED_OPTIONS[6] (50ms)
export const PLAYGROUND = { HEIGHT: 800, WIDTH: 1000 }; // in pixels
export const SPEED_OF_GROWTH = 2; // higher number means slower growth - snake will increase in size every SPEED_OF_GROWTH frames
export const PLAYER_SIZE = 10; // in pixels

export const SESSION_STORAGE_SPEED_NAME = 'speed';
export const SESSION_STORAGE_SCORE_NAME = 'player_';

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

export const PLAYER_DATA = {
  PLAYER1: {
    INITIAL_BODY: [
      { top: 400, left: 700 },
      { top: 410, left: 700 },
      { top: 420, left: 700 },
      { top: 430, left: 700 },
      { top: 440, left: 700 },
      { top: 450, left: 700 },
      { top: 460, left: 700 },
    ],
    CONTROLS: {
      ArrowUp: DIRECTION.UP,
      ArrowDown: DIRECTION.DOWN,
      ArrowLeft: DIRECTION.LEFT,
      ArrowRight: DIRECTION.RIGHT,
    },
    COLORS: {
      head: 'rgb(218, 138, 0)',
      body: 'orange',
    },
  },
  PLAYER2: {
    INITIAL_BODY: [
      { top: 460, left: 300 },
      { top: 450, left: 300 },
      { top: 440, left: 300 },
      { top: 430, left: 300 },
      { top: 420, left: 300 },
      { top: 410, left: 300 },
      { top: 400, left: 300 },
    ],
    CONTROLS: {
      KeyW: DIRECTION.UP,
      KeyS: DIRECTION.DOWN,
      KeyA: DIRECTION.LEFT,
      KeyD: DIRECTION.RIGHT,
    },
    COLORS: {
      head: 'rgb(0, 185, 0)',
      body: 'green',
    },
  },
};
