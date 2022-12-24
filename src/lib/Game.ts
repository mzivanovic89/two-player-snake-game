import { PLAYGROUND, SPEED_OPTIONS } from '../config.js';
import { DOM_END_SCREEN, DOM_PLAYGROUND, DOM_RESET_SCORE_BUTTON, DOM_RESTART_BUTTON, DOM_SPEED_SLIDER } from '../main.js';
import Player from './Player.js';
import Speed from './Speed.js';

class Game {
  private isRunning = false;
  private players: Player[];
  private intervalId;
  private tick: number;
  private speed: Speed;

  constructor() {
    this.intervalId = 0;
    this.tick = 0;
    this.players = [];
    this.speed = new Speed();

    this.initPlayers();
    this.addListeners();
    this.init();
  }

  private initPlayers = (): void => {
    const player1 = new Player(1);
    const player2 = new Player(2);

    this.players = [player1, player2];
  };

  private init = (): void => {
    // set playground heigth and width
    if (DOM_PLAYGROUND) {
      DOM_PLAYGROUND.style.height = PLAYGROUND.HEIGHT + 'px';
      DOM_PLAYGROUND.style.width = PLAYGROUND.WIDTH + 'px';
    }

    this.isRunning = true;
  };

  private loop = (): void => {
    const isSnakeGrowing = this.tick === this.speed.getValue();

    this.players.forEach((player) => {
      player.move(isSnakeGrowing);
    });

    if (isSnakeGrowing) {
      this.tick = 0;
    } else {
      this.tick += 1;
    }

    this.checkCollision();
  };

  public start = (): void => {
    this.intervalId = setInterval(this.loop, this.speed.getValueInMilliseconds());
    // this.stop();
  };

  private stop = (): void => {
    clearInterval(this.intervalId);
  };

  private restart = (): void => {
    // remove end screen
    if (DOM_END_SCREEN) {
      DOM_END_SCREEN.style.display = 'none';
    }

    // reset body parts
    this.players.forEach((player) => player.initBody());

    // restart the game
    this.start();
  };

  private handleResetScore = (): void => this.players.forEach((player) => player.resetScore());

  private gameOver = (): void => {
    // show game over
    DOM_END_SCREEN.style.display = 'block';

    // stop the interval
    this.stop();

    this.isRunning = false;
  };

  private handleKeyboard = (e: KeyboardEvent): void => {
    if (!this.isRunning && (e.code === 'Enter' || e.code === 'Space')) {
      this.restart();
    }

    this.players.forEach((player) => player.handleInput(e.code));
  };

  private addListeners = (): void => {
    // keyboard event listener
    document.addEventListener('keydown', this.handleKeyboard);

    // restart button listener
    DOM_RESTART_BUTTON?.addEventListener('click', this.restart);

    // reset score button listener
    DOM_RESET_SCORE_BUTTON?.addEventListener('click', this.handleResetScore);

    // speed slider listener
    DOM_SPEED_SLIDER.addEventListener('input', this.speed.handleSpeedSlider);
  };

  private checkCollision = (): void => {
    const player1 = this.players[0];
    const player2 = this.players[1];
    const player1head = player1.getHead();
    const player2head = player2.getHead();

    const p1hit = player2.includes(player1head);
    const p2hit = player1.includes(player2head);

    if (p1hit && !p2hit) {
      // player 1 won
      player1.win();
    }

    if (p2hit && !p1hit) {
      // player 2 won
      player2.win();
    }

    if (p1hit && p2hit) {
      // draw
      console.log('DRAW');
      player1.win();
      player2.win();
    }

    if (p1hit || p2hit) {
      this.gameOver();
    }
  };
}

export default Game;
