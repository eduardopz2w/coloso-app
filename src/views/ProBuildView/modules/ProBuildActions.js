import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../../../redux/middlewares/ColosoApiMiddleware';

export const fetchProBuild = createAction('PRO_BUILD/FETCH', id => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.PRO_BUILD,
    params: {
      id,
    },
  },
}));

export default fetchProBuild;
