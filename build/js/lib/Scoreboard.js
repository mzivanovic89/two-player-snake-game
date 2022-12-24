import { PLAYER_DATA } from '../config.js';
import { DOM_SCORE_PLAYER_1, DOM_SCORE_PLAYER_2 } from '../main.js';
var Scoreboard = (function () {
    function Scoreboard(playerId) {
        var _this = this;
        this.update = function (score) {
            var scoreString = score.toString();
            if (_this.DOMElement.innerHTML !== scoreString) {
                _this.DOMElement.innerHTML = scoreString;
            }
        };
        this.DOMElement = playerId === 1 ? DOM_SCORE_PLAYER_1 : DOM_SCORE_PLAYER_2;
        this.DOMElement.style.color = playerId === 1 ? PLAYER_DATA.PLAYER1.COLORS.body : PLAYER_DATA.PLAYER2.COLORS.body;
    }
    return Scoreboard;
}());
export default Scoreboard;
