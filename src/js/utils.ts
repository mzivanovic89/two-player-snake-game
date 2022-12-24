import { DIRECTION } from './types.js';

export const getOppositeDirection = (direction: DIRECTION): DIRECTION | null => {
  if (direction === DIRECTION.UP) return DIRECTION.DOWN;
  if (direction === DIRECTION.DOWN) return DIRECTION.UP;
  if (direction === DIRECTION.LEFT) return DIRECTION.RIGHT;
  if (direction === DIRECTION.RIGHT) return DIRECTION.LEFT;
  return null;
};
