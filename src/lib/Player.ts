import { PLAYER_DATA, SESSION_STORAGE_SCORE_NAME } from '../config.js';
import { DIRECTION } from '../types.js';
import { getOppositeDirection } from '../utils.js';
import DOMSnakePart from './DOMSnakePart.js';
import Scoreboard from './Scoreboard.js';
import Snake from './Snake.js';

class Player {
  private playerId: number;
  private score: number;
  private direction: DIRECTION;
  private snake: Snake;
  private controls;
  private scoreboard: Scoreboard;

  constructor(id: number) {
    this.playerId = id;
    this.score = this.getScore();
    this.direction = id === 1 ? DIRECTION.UP : DIRECTION.DOWN;
    this.controls = id === 1 ? PLAYER_DATA.PLAYER1.CONTROLS : PLAYER_DATA.PLAYER2.CONTROLS;
    this.scoreboard = new Scoreboard(this.playerId);

    // initialize body
    const coordinates = this.playerId === 1 ? PLAYER_DATA.PLAYER1.INITIAL_BODY : PLAYER_DATA.PLAYER2.INITIAL_BODY;
    const headColor = this.playerId === 1 ? PLAYER_DATA.PLAYER1.COLORS.head : PLAYER_DATA.PLAYER2.COLORS.head;
    const bodyColor = this.playerId === 1 ? PLAYER_DATA.PLAYER1.COLORS.body : PLAYER_DATA.PLAYER2.COLORS.body;

    this.snake = new Snake(coordinates, headColor, bodyColor);
  }

  public getHead = (): DOMSnakePart => this.snake.getHead();

  private getScore = (): number => parseInt(sessionStorage.getItem(`${SESSION_STORAGE_SCORE_NAME}${this.playerId}`) || '0');

  private setScore = (score: number): void => {
    this.score = score;

    // save score in sessionStorage
    sessionStorage.setItem(`${SESSION_STORAGE_SCORE_NAME}${this.playerId}`, this.score.toString());

    // update scoreboard
    this.scoreboard.update(this.score);
  };

  public initBody = (): void => {
    // get initial coordinates
    const coordinates = this.playerId === 1 ? PLAYER_DATA.PLAYER1.INITIAL_BODY : PLAYER_DATA.PLAYER2.INITIAL_BODY;

    // create new snake instance
    this.snake = new Snake(coordinates, this.snake.getHeadColor(), this.snake.getBodyColor());
  };

  public win = (): void => this.setScore(this.score + 1);

  public resetScore = (): void => this.setScore(0);

  public move = (shrink: boolean): void => {
    this.snake.move(this.direction);

    if (shrink) {
      this.snake.removeTail();
    }
  };

  public includes = (bodyPart: DOMSnakePart): boolean => this.snake.includes(bodyPart);

  public handleInput = (key: string) => {
    const newDirection: DIRECTION | undefined = this.controls[key as keyof typeof this.controls];

    // exit if key does not match player control key
    if (!newDirection) return;

    // exit if new direction is same as current direction
    if (newDirection === this.direction) return;

    // exit if new direction is opposite of current direction
    if (this.direction === getOppositeDirection(newDirection)) return;

    this.direction = newDirection;
  };
}

export default Player;
