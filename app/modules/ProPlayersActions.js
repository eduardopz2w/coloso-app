import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../redux/middlewares/ColosoApiMiddleware';

export const fetchProPlayers = createAction('PRO_PLAYERS/FETCH', () => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.PRO_PLAYERS,
  },
}));

export default fetchProPlayers;
