import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../../../redux/middlewares/ColosoApiMiddleware';

export const fetchGame = createAction('GAME/FETCH', id => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.GAME,
    params: {
      id,
    },
  },
}));

export default fetchGame;
