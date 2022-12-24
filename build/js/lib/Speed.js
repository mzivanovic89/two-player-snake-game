import { INITIAL_SPEED, SESSION_STORAGE_SPEED_NAME, SPEED_OPTIONS } from '../config.js';
import { DOM_SPEED_DISPLAY, DOM_SPEED_SLIDER } from '../main.js';
var Speed = (function () {
    function Speed() {
        var _this = this;
        this.getInitialSpeed = function () {
            var speed = parseInt(sessionStorage.getItem(SESSION_STORAGE_SPEED_NAME) || '0');
            if (!_this.speedWithinRange(speed)) {
                return INITIAL_SPEED;
            }
            return speed;
        };
        this.getValue = function () { return _this.value; };
        this.getValueInMilliseconds = function () { return SPEED_OPTIONS[_this.value]; };
        this.setSpeed = function (speed) {
            if (!_this.speedWithinRange(speed))
                return;
            _this.value = speed;
            if (sessionStorage.getItem(SESSION_STORAGE_SPEED_NAME) !== speed.toString()) {
                sessionStorage.setItem(SESSION_STORAGE_SPEED_NAME, speed.toString());
            }
            _this.updateDOMElements();
        };
        this.updateDOMElements = function () {
            _this.displayDOMElement.innerText = _this.value.toString();
            _this.sliderDOMElement.value = _this.value.toString();
        };
        this.handleSpeedSlider = function (e) { return _this.setSpeed(Number((e === null || e === void 0 ? void 0 : e.target).value)); };
        this.speedWithinRange = function (speed) { return Object.keys(SPEED_OPTIONS).map(Number).includes(speed); };
        this.displayDOMElement = DOM_SPEED_DISPLAY;
        this.sliderDOMElement = DOM_SPEED_SLIDER;
        this.value = this.getInitialSpeed();
        this.updateDOMElements();
        var speedKeys = Object.keys(SPEED_OPTIONS).map(Number);
        this.sliderDOMElement.min = Math.min.apply(Math, speedKeys).toString();
        this.sliderDOMElement.max = Math.max.apply(Math, speedKeys).toString();
    }
    return Speed;
}());
export default Speed;
