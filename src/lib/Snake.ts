import DOMSnakePart from './DOMSnakePart.js';
import { PLAYER_SIZE, PLAYGROUND } from '../config.js';
import { Coordinate, DIRECTION } from '../types.js';

class Snake {
  private headColor: string;
  private bodyColor: string;
  private bodyParts: DOMSnakePart[];
  private head: DOMSnakePart;

  constructor(coordinates: Coordinate[], headColor: string, bodyColor: string) {
    this.headColor = headColor;
    this.bodyColor = bodyColor;

    this.bodyParts = coordinates.map(
      (coordinate, index) => new DOMSnakePart(coordinate.top, coordinate.left, index === 0, headColor, bodyColor)
    );

    this.head = this.bodyParts[0];
  }

  public getHead = (): DOMSnakePart => this.head;

  public getHeadColor = (): string => this.headColor;

  public getBodyColor = (): string => this.bodyColor;

  public includes = (bodyPart: DOMSnakePart): boolean => this.bodyParts.includes(bodyPart);

  private addHead = (top: number, left: number): void => {
    // transform current head to body
    this.head.setHead(false);

    // create new head
    const newHead = new DOMSnakePart(top, left, true, this.headColor, this.bodyColor);

    // add new head to the snake body
    this.bodyParts.unshift(newHead);
  };

  // removes last body element
  public removeTail = (): void => {
    const tail = this.bodyParts.pop();

    tail?.remove();
  };

  // add new head in the direction the snake is moving
  public move = (direction: DIRECTION): void => {
    let top: number, left: number;

    switch (direction) {
      case DIRECTION.UP:
        if (this.head.top - PLAYER_SIZE < 0) {
          top = PLAYGROUND.HEIGHT - PLAYER_SIZE;
          left = this.head.left;
        } else {
          top = this.head.top - PLAYER_SIZE;
          left = this.head.left;
        }
        break;
      case DIRECTION.DOWN:
        if (this.head.top + PLAYER_SIZE > PLAYGROUND.HEIGHT - PLAYER_SIZE) {
          top = 0;
          left = this.head.left;
        } else {
          top = this.head.top + PLAYER_SIZE;
          left = this.head.left;
        }
        break;
      case DIRECTION.LEFT:
        if (this.head.left - PLAYER_SIZE < 0) {
          top = this.head.top;
          left = PLAYGROUND.WIDTH - PLAYER_SIZE;
        } else {
          top = this.head.top;
          left = this.head.left - PLAYER_SIZE;
        }
        break;
      case DIRECTION.RIGHT:
        if (this.head.left + PLAYER_SIZE > PLAYGROUND.WIDTH - PLAYER_SIZE) {
          top = this.head.top;
          left = 0;
        } else {
          top = this.head.top;
          left = this.head.left + PLAYER_SIZE;
        }
        break;
    }

    this.addHead(top, left);
  };
}

export default Snake;
