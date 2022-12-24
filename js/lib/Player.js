import { PLAYER_DATA, SESSION_STORAGE_SCORE_NAME } from '../config.js';
import { DIRECTION } from '../types.js';
import { getOppositeDirection } from '../utils.js';
import Scoreboard from './Scoreboard.js';
import Snake from './Snake.js';
var Player = (function () {
    function Player(id) {
        var _this = this;
        this.getHead = function () { return _this.snake.getHead(); };
        this.getScore = function () { return parseInt(sessionStorage.getItem("".concat(SESSION_STORAGE_SCORE_NAME).concat(_this.playerId)) || '0'); };
        this.setScore = function (score) {
            _this.score = score;
            sessionStorage.setItem("".concat(SESSION_STORAGE_SCORE_NAME).concat(_this.playerId), _this.score.toString());
            _this.scoreboard.update(_this.score);
        };
        this.initBody = function () {
            _this.snake.clearSnake();
            _this.direction = _this.playerId === 1 ? DIRECTION.UP : DIRECTION.DOWN;
            var coordinates = _this.playerId === 1 ? PLAYER_DATA.PLAYER1.INITIAL_BODY : PLAYER_DATA.PLAYER2.INITIAL_BODY;
            _this.snake = new Snake(coordinates, _this.snake.getHeadColor(), _this.snake.getBodyColor());
        };
        this.win = function () { return _this.setScore(_this.score + 1); };
        this.resetScore = function () { return _this.setScore(0); };
        this.move = function (shrink) {
            _this.snake.move(_this.direction);
            if (shrink) {
                _this.snake.removeTail();
            }
        };
        this.includes = function (bodyPart, selfCheck) { return _this.snake.includes(bodyPart, selfCheck); };
        this.handleInput = function (key) {
            var newDirection = _this.controls[key];
            if (!newDirection)
                return;
            if (newDirection === _this.direction)
                return;
            if (_this.direction === getOppositeDirection(newDirection))
                return;
            _this.direction = newDirection;
        };
        this.playerId = id;
        this.score = this.getScore();
        this.direction = id === 1 ? DIRECTION.UP : DIRECTION.DOWN;
        this.controls = id === 1 ? PLAYER_DATA.PLAYER1.CONTROLS : PLAYER_DATA.PLAYER2.CONTROLS;
        this.scoreboard = new Scoreboard(this.playerId);
        this.scoreboard.update(this.score);
        var coordinates = this.playerId === 1 ? PLAYER_DATA.PLAYER1.INITIAL_BODY : PLAYER_DATA.PLAYER2.INITIAL_BODY;
        var headColor = this.playerId === 1 ? PLAYER_DATA.PLAYER1.COLORS.head : PLAYER_DATA.PLAYER2.COLORS.head;
        var bodyColor = this.playerId === 1 ? PLAYER_DATA.PLAYER1.COLORS.body : PLAYER_DATA.PLAYER2.COLORS.body;
        this.snake = new Snake(coordinates, headColor, bodyColor);
    }
    return Player;
}());
export default Player;
