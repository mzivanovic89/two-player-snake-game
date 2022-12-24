import { PLAYGROUND } from '../config.js';
import { DOM_END_SCREEN, DOM_PLAYGROUND, DOM_RESET_SCORE_BUTTON, DOM_RESTART_BUTTON, DOM_SPEED_SLIDER } from '../main.js';
import Player from './Player.js';
import Speed from './Speed.js';
var Game = (function () {
    function Game() {
        var _this = this;
        this.isRunning = false;
        this.initPlayers = function () {
            var player1 = new Player(1);
            var player2 = new Player(2);
            _this.players = [player1, player2];
        };
        this.init = function () {
            if (DOM_PLAYGROUND) {
                DOM_PLAYGROUND.style.height = PLAYGROUND.HEIGHT + 'px';
                DOM_PLAYGROUND.style.width = PLAYGROUND.WIDTH + 'px';
            }
            _this.isRunning = true;
        };
        this.loop = function () {
            var isSnakeGrowing = _this.tick === _this.speed.getValue();
            _this.players.forEach(function (player) {
                player.move(isSnakeGrowing);
            });
            if (isSnakeGrowing) {
                _this.tick = 0;
            }
            else {
                _this.tick += 1;
            }
            _this.checkCollision();
        };
        this.start = function () {
            _this.intervalId = setInterval(_this.loop, _this.speed.getValueInMilliseconds());
        };
        this.stop = function () {
            clearInterval(_this.intervalId);
        };
        this.restart = function () {
            if (DOM_END_SCREEN) {
                DOM_END_SCREEN.style.display = 'none';
            }
            _this.players.forEach(function (player) { return player.initBody(); });
            _this.start();
        };
        this.handleResetScore = function () { return _this.players.forEach(function (player) { return player.resetScore(); }); };
        this.gameOver = function () {
            DOM_END_SCREEN.style.display = 'block';
            _this.stop();
            _this.isRunning = false;
        };
        this.handleKeyboard = function (e) {
            if (!_this.isRunning && (e.code === 'Enter' || e.code === 'Space')) {
                _this.restart();
            }
            _this.players.forEach(function (player) { return player.handleInput(e.code); });
        };
        this.addListeners = function () {
            document.addEventListener('keydown', _this.handleKeyboard);
            DOM_RESTART_BUTTON === null || DOM_RESTART_BUTTON === void 0 ? void 0 : DOM_RESTART_BUTTON.addEventListener('click', _this.restart);
            DOM_RESET_SCORE_BUTTON === null || DOM_RESET_SCORE_BUTTON === void 0 ? void 0 : DOM_RESET_SCORE_BUTTON.addEventListener('click', _this.handleResetScore);
            DOM_SPEED_SLIDER.addEventListener('input', _this.speed.handleSpeedSlider);
        };
        this.checkCollision = function () {
            var player1 = _this.players[0];
            var player2 = _this.players[1];
            var player1head = player1.getHead();
            var player2head = player2.getHead();
            var p1hit = player2.includes(player1head);
            var p2hit = player1.includes(player2head);
            if (p1hit && !p2hit) {
                player1.win();
            }
            if (p2hit && !p1hit) {
                player2.win();
            }
            if (p1hit && p2hit) {
                console.log('DRAW');
                player1.win();
                player2.win();
            }
            if (p1hit || p2hit) {
                _this.gameOver();
            }
        };
        this.intervalId = 0;
        this.tick = 0;
        this.players = [];
        this.speed = new Speed();
        this.initPlayers();
        this.addListeners();
        this.init();
    }
    return Game;
}());
export default Game;
