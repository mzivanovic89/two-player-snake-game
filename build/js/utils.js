import { DIRECTION } from './types.js';
export var getOppositeDirection = function (direction) {
    if (direction === DIRECTION.UP)
        return DIRECTION.DOWN;
    if (direction === DIRECTION.DOWN)
        return DIRECTION.UP;
    if (direction === DIRECTION.LEFT)
        return DIRECTION.RIGHT;
    if (direction === DIRECTION.RIGHT)
        return DIRECTION.LEFT;
    return null;
};
