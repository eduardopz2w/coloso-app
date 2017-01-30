import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../../../redux/middlewares/ColosoApiMiddleware';


export const fetchProBuilds = createAction('GAME_CURRENT/FETCH_BUILDS', (queryParams, pageNumber = 1, pageSize = 25) => ({
  queryParams,
  pageParams: {
    number: pageNumber,
    size: pageSize,
  },
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.PRO_BUILDS,
  },
}));

export default fetchProBuilds;
