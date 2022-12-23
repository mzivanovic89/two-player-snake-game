"use strict";
// UTIL
//import { SESSION_STORAGE_SPEED_NAME, SESSION_STORAGE_SCORE_NAME } from './config';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SESSION_STORAGE_SCORE_NAME = exports.SESSION_STORAGE_SPEED_NAME = exports.SPEED_OPTIONS = exports.PLAYER_SIZE = exports.SPEED_OF_GROWTH = exports.PLAYGROUND_WIDTH = exports.PLAYGROUND_HEIGHT = exports.SPEED = exports.INTERVAL = exports.getScore = exports.setScore = exports.getSpeed = exports.setSpeed = void 0;
var setSpeed = function (speed) {
    sessionStorage.setItem(exports.SESSION_STORAGE_SPEED_NAME, speed.toString());
};
exports.setSpeed = setSpeed;
var getSpeed = function () {
    return parseInt(sessionStorage.getItem(exports.SESSION_STORAGE_SPEED_NAME) || '0');
};
exports.getSpeed = getSpeed;
var setScore = function (playerId, score) {
    sessionStorage.setItem("".concat(exports.SESSION_STORAGE_SCORE_NAME).concat(playerId), score.toString());
};
exports.setScore = setScore;
var getScore = function (playerId) {
    return parseInt(sessionStorage.getItem("".concat(exports.SESSION_STORAGE_SCORE_NAME).concat(playerId)) || '0');
};
exports.getScore = getScore;
// CONFIG
exports.INTERVAL = 100; // refresh rate in miliseconds
exports.SPEED = (0, exports.getSpeed)() === 0 ? 6 : (0, exports.getSpeed)(); // initial speed is SPEED_OPTIONS[6] (50ms)
exports.PLAYGROUND_HEIGHT = 800;
exports.PLAYGROUND_WIDTH = 1000;
exports.SPEED_OF_GROWTH = 10; // higher number means slower growth - snake will increase in size every SPEED_OF_GROWTH frames
exports.PLAYER_SIZE = 10;
// IDs are speed slider values, values are milisecond values
exports.SPEED_OPTIONS = {
    1: 100,
    2: 90,
    3: 80,
    4: 70,
    5: 60,
    6: 50,
    7: 40,
    8: 30,
    9: 20,
    10: 10,
};
exports.SESSION_STORAGE_SPEED_NAME = 'speed';
exports.SESSION_STORAGE_SCORE_NAME = 'Player_';
var Player = /** @class */ (function () {
    function Player(id, headColor, bodyColor) {
        this.playerId = 0;
        this.headColor = '';
        this.bodyColor = '';
        this.playerId = id;
    }
    return Player;
}());
