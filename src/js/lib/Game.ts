import { PLAYGROUND, SPEED_OF_GROWTH } from '../config.js';
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
    const isSnakeGrowing = this.tick === SPEED_OF_GROWTH;

    console.log(isSnakeGrowing);

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

    // player 1 hit player 2 snake
    const p1hitp2 = player2.includes(player1head, false);
    // player 2 hit player 1 snake
    const p2hitp1 = player1.includes(player2head, false);
    // player 1 hit its own snake
    const p1hitp1 = player1.includes(player1head, true);
    // player 2 hit its own snake
    const p2hitp2 = player2.includes(player2head, true);

    if (p1hitp2 || p1hitp1) {
      // player 1 hit its own snake or player 1 hit player 2 - player 2 wins
      player2.win();
    }

    if (p2hitp1 || p2hitp2) {
      // player 2 hit its own snake or player 2 hit player 1 - player 1 wins
      player1.win();
    }

    // if anything is hit, end game
    if (p1hitp2 || p2hitp1 || p1hitp1 || p2hitp2) {
      this.gameOver();
    }
  };
}

export default Game;
