import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../../../redux/middlewares/ColosoApiMiddleware';

export const fetchMatch = createAction('MATCH/FETCH', matchUrid => ({
  matchUrid,
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.MATCH,
  },
}));

export default fetchMatch;
