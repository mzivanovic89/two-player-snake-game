import { PLAYER_DATA } from '../config.js';
import { DOM_SCORE_PLAYER_1, DOM_SCORE_PLAYER_2 } from '../main.js';

class Scoreboard {
  private DOMElement: HTMLElement;

  constructor(playerId: number) {
    // set dom element
    this.DOMElement = playerId === 1 ? DOM_SCORE_PLAYER_1 : DOM_SCORE_PLAYER_2;

    // set dom element color to match player color
    this.DOMElement.style.color = playerId === 1 ? PLAYER_DATA.PLAYER1.COLORS.body : PLAYER_DATA.PLAYER2.COLORS.body;
  }

  // update scoreboard content
  public update = (score: number): void => {
    const scoreString = score.toString();

    if (this.DOMElement.innerHTML !== scoreString) {
      this.DOMElement.innerHTML = scoreString;
    }
  };
}

export default Scoreboard;
