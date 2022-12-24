import { PLAYER_SIZE } from '../config.js';
import { DOM_PLAYGROUND } from '../main.js';
var DOMSnakePart = (function () {
    function DOMSnakePart(top, left, isHead, headColor, bodyColor) {
        var _this = this;
        this.setHead = function (isHead) {
            _this.isHead = isHead;
            _this.DOMElement.style.backgroundColor = _this.isHead ? _this.headColor : _this.bodyColor;
        };
        this.create = function (top, left, isHead) {
            var snakePart = document.createElement('div');
            snakePart.style.position = 'absolute';
            snakePart.style.height = "".concat(PLAYER_SIZE, "px");
            snakePart.style.width = "".concat(PLAYER_SIZE, "px");
            snakePart.style.top = "".concat(top, "px");
            snakePart.style.left = "".concat(left, "px");
            snakePart.style.backgroundColor = isHead ? _this.headColor : _this.bodyColor;
            DOM_PLAYGROUND === null || DOM_PLAYGROUND === void 0 ? void 0 : DOM_PLAYGROUND.appendChild(snakePart);
            return snakePart;
        };
        this.remove = function () { return _this.DOMElement.remove(); };
        this.top = top;
        this.left = left;
        this.isHead = isHead;
        this.headColor = headColor;
        this.bodyColor = bodyColor;
        this.DOMElement = this.create(top, left, isHead);
    }
    return DOMSnakePart;
}());
export default DOMSnakePart;
