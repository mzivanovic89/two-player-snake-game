import DOMSnakePart from './DOMSnakePart.js';
import { PLAYER_SIZE, PLAYGROUND } from '../config.js';
import { DIRECTION } from '../types.js';
var Snake = (function () {
    function Snake(coordinates, headColor, bodyColor) {
        var _this = this;
        this.getHead = function () { return _this.head; };
        this.getHeadColor = function () { return _this.headColor; };
        this.getBodyColor = function () { return _this.bodyColor; };
        this.includes = function (bodyPart) { return _this.bodyParts.includes(bodyPart); };
        this.addHead = function (top, left) {
            _this.head.setHead(false);
            var newHead = new DOMSnakePart(top, left, true, _this.headColor, _this.bodyColor);
            _this.bodyParts.unshift(newHead);
        };
        this.removeTail = function () {
            var tail = _this.bodyParts.pop();
            tail === null || tail === void 0 ? void 0 : tail.remove();
        };
        this.move = function (direction) {
            var top, left;
            switch (direction) {
                case DIRECTION.UP:
                    if (_this.head.top - PLAYER_SIZE < 0) {
                        top = PLAYGROUND.HEIGHT - PLAYER_SIZE;
                        left = _this.head.left;
                    }
                    else {
                        top = _this.head.top - PLAYER_SIZE;
                        left = _this.head.left;
                    }
                    break;
                case DIRECTION.DOWN:
                    if (_this.head.top + PLAYER_SIZE > PLAYGROUND.HEIGHT - PLAYER_SIZE) {
                        top = 0;
                        left = _this.head.left;
                    }
                    else {
                        top = _this.head.top + PLAYER_SIZE;
                        left = _this.head.left;
                    }
                    break;
                case DIRECTION.LEFT:
                    if (_this.head.left - PLAYER_SIZE < 0) {
                        top = _this.head.top;
                        left = PLAYGROUND.WIDTH - PLAYER_SIZE;
                    }
                    else {
                        top = _this.head.top;
                        left = _this.head.left - PLAYER_SIZE;
                    }
                    break;
                case DIRECTION.RIGHT:
                    if (_this.head.left + PLAYER_SIZE > PLAYGROUND.WIDTH - PLAYER_SIZE) {
                        top = _this.head.top;
                        left = 0;
                    }
                    else {
                        top = _this.head.top;
                        left = _this.head.left + PLAYER_SIZE;
                    }
                    break;
            }
            _this.addHead(top, left);
        };
        this.headColor = headColor;
        this.bodyColor = bodyColor;
        this.bodyParts = coordinates.map(function (coordinate, index) { return new DOMSnakePart(coordinate.top, coordinate.left, index === 0, headColor, bodyColor); });
        this.head = this.bodyParts[0];
    }
    return Snake;
}());
export default Snake;
