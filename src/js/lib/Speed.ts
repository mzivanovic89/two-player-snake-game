import { INITIAL_SPEED, SESSION_STORAGE_SPEED_NAME, SPEED_OPTIONS } from '../config.js';
import { DOM_SPEED_DISPLAY, DOM_SPEED_SLIDER } from '../main.js';

class Speed {
  private displayDOMElement: HTMLElement;
  private sliderDOMElement: HTMLInputElement;
  private value: number;

  constructor() {
    this.displayDOMElement = DOM_SPEED_DISPLAY;
    this.sliderDOMElement = DOM_SPEED_SLIDER;
    this.value = this.getInitialSpeed();
    this.updateDOMElements();

    // initialize speed slider min/max values
    const speedKeys = Object.keys(SPEED_OPTIONS).map(Number);

    this.sliderDOMElement.min = Math.min(...speedKeys).toString();
    this.sliderDOMElement.max = Math.max(...speedKeys).toString();
  }

  private getInitialSpeed = (): number => {
    const speed = parseInt(sessionStorage.getItem(SESSION_STORAGE_SPEED_NAME) || '0');

    if (!this.speedWithinRange(speed)) {
      return INITIAL_SPEED;
    }

    return speed;
  };

  public getValue = (): number => this.value;

  public getValueInMilliseconds = (): number => SPEED_OPTIONS[this.value as keyof typeof SPEED_OPTIONS];

  public setSpeed = (speed: number): void => {
    if (!this.speedWithinRange(speed)) return;

    this.value = speed;

    // set sessionStorage
    if (sessionStorage.getItem(SESSION_STORAGE_SPEED_NAME) !== speed.toString()) {
      sessionStorage.setItem(SESSION_STORAGE_SPEED_NAME, speed.toString());
    }

    // update speed display and slider
    this.updateDOMElements();
  };

  private updateDOMElements = (): void => {
    this.displayDOMElement.innerText = this.value.toString();
    this.sliderDOMElement.value = this.value.toString();
  };

  public handleSpeedSlider = (e: Event): void => this.setSpeed(Number((e?.target as HTMLInputElement).value));

  private speedWithinRange = (speed: number): boolean => Object.keys(SPEED_OPTIONS).map(Number).includes(speed);
}

export default Speed;
