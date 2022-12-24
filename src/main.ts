import Game from './lib/Game.js';

export const DOM_PLAYGROUND = document.getElementById('playground') as HTMLElement;
export const DOM_SPEED_DISPLAY = document.getElementById('speed') as HTMLElement;
export const DOM_SPEED_SLIDER = document.getElementById('speed-slider') as HTMLInputElement;
export const DOM_RESTART_BUTTON = document.getElementById('restart') as HTMLElement;
export const DOM_RESET_SCORE_BUTTON = document.getElementById('reset-score') as HTMLElement;
export const DOM_SCORE_PLAYER_1 = document.getElementById('score-player-1') as HTMLLIElement;
export const DOM_SCORE_PLAYER_2 = document.getElementById('score-player-2') as HTMLLIElement;
export const DOM_END_SCREEN = document.getElementById('end-screen') as HTMLElement;

const game = new Game();
game.start();