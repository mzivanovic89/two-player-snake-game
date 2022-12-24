import { PLAYER_SIZE } from '../config.js';
import { DOM_PLAYGROUND } from '../main.js';

class DOMSnakePart {
  public top: number;
  public left: number;

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

  public setHead = (isHead: boolean): void => {
    this.isHead = isHead;

    // update DOM element color
    this.DOMElement.style.backgroundColor = this.isHead ? this.headColor : this.bodyColor;
  };

  // create DOM element, add it to playground and return it
  private create = (top: number, left: number, isHead: boolean): HTMLElement => {
    const snakePart = document.createElement('div');

    snakePart.style.position = 'absolute';
    snakePart.style.height = `${PLAYER_SIZE}px`;
    snakePart.style.width = `${PLAYER_SIZE}px`;
    snakePart.style.top = `${top}px`;
    snakePart.style.left = `${left}px`;
    snakePart.style.backgroundColor = isHead ? this.headColor : this.bodyColor;
    // snakePart.setAttribute('id', `${top}-${left}`);

    // add new div to the playground div
    DOM_PLAYGROUND?.appendChild(snakePart);

    return snakePart;
  };

  // remove actual DOM element
  public remove = (): void => this.DOMElement.remove();
}

export default DOMSnakePart;
